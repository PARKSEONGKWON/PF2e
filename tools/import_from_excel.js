#!/usr/bin/env node
// ═══════════════════════════════════════════════
//  IMPORT FROM EXCEL — xlsx → dev/ JS DB 부분 교체
//
//  Usage:
//    node tools/import_from_excel.js [input.xlsx] [--check]
//
//  --check: 실제 파일 쓰지 않고 round-trip 검증만 수행
//  Default input: /tmp/PF2e-publish/PF2e_DB.xlsx
// ═══════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { DB_DEFS } = require('./db_schema');

const ROOT = path.resolve(__dirname, '..');
const DEV_DIR = path.join(ROOT, 'dev');
const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const IN_PATH = args.find(a => !a.startsWith('--')) || path.join(ROOT, 'PF2e_DB.xlsx');

// ── 1. 셀 값 역직렬화 ──
//   undefined: 호출되지 않음 (defval 없으니 빈 셀은 row에 없음)
//   number/boolean: 그대로
//   string: 'null' → null, 'true'/'false' → boolean, JSON 패턴 → parse, 그 외 string 유지
function deserializeCell(v) {
  if (v === undefined) return undefined;
  if (typeof v === 'number' || typeof v === 'boolean') return v;
  if (typeof v !== 'string') return v;
  const s = v;
  if (s === '') return '';  // 빈 문자열 보존
  const t = s.trim();
  if (t === 'null') return null;
  if (t === 'true') return true;
  if (t === 'false') return false;
  if (/^[\[\{]/.test(t) || /^"/.test(t)) {
    try { return JSON.parse(t); } catch { return s; }
  }
  return s;
}

// ── 2. 시트 → 객체 복원 ──
//   defval 없이 sheet_to_json: 빈 셀은 row에 키 없음 → 원본 객체에 키 없음 (의미 보존)
//
//   v525~: 행 1=한국어 설명, 행 2=영문 헤더, 행 3+=데이터.
//   구버전 호환: 행 2의 셀이 영문/snake_case로 보이면 v525 형식, 그렇지 않으면 v524 이전 형식(행 1=헤더).
function detectHeaderRow(sheet) {
  const ref = sheet['!ref'];
  if (!ref) return 0;
  const range = XLSX.utils.decode_range(ref);
  // 행 2 (인덱스 1)의 첫 비어있지 않은 셀 검사
  for (let C = range.s.c; C <= range.e.c; C++) {
    const cell = sheet[XLSX.utils.encode_cell({ r: 1, c: C })];
    if (!cell || cell.v === undefined || cell.v === null || cell.v === '') continue;
    const v = String(cell.v);
    // 영문/언더스코어/숫자만 → 헤더 (v525 형식: 행 2가 헤더)
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(v)) return 1;
    return 0;
  }
  return 0;
}

function sheetToArray(sheet) {
  // v525~: 행 1=한국어 설명, 행 2=헤더, 행 3+=데이터 → range:1로 행 2를 헤더로 인식
  // 구버전(헤더가 행 1) 호환: 행 2의 첫 셀이 비어있거나 알려진 헤더 키와 다르면 range:0 폴백
  const rows = XLSX.utils.sheet_to_json(sheet, { raw: true, range: detectHeaderRow(sheet) });
  // 'value' 단일 컬럼만 있으면 원시값 배열 (LANGUAGES, CONDITIONS 등)
  const allValueOnly = rows.length > 0 && rows.every(r => {
    const ks = Object.keys(r);
    return ks.length <= 1 && (ks.length === 0 || ks[0] === 'value');
  });
  if (allValueOnly) {
    return rows.map(r => deserializeCell(r.value));
  }
  return rows.map(row => {
    const obj = {};
    for (const [k, v] of Object.entries(row)) {
      const dv = deserializeCell(v);
      if (dv !== undefined) obj[k] = dv;
    }
    return obj;
  });
}

function sheetToKvJson(sheet) {
  const rows = XLSX.utils.sheet_to_json(sheet, { raw: true, range: detectHeaderRow(sheet) });
  const obj = {};
  for (const row of rows) {
    const k = row.key;
    if (k === undefined || k === '') continue;
    const v = deserializeCell(row.value_json);
    obj[String(k)] = v;
  }
  return obj;
}

// ── 3. JS 직렬화 ──
//   JSON.stringify의 출력은 valid JS. 키는 모두 따옴표 인용됨.
//   가독성: indent 2.
function serializeJs(value) {
  return JSON.stringify(value, null, 2);
}

// ── 4. 원본 파일에서 변수 블록 위치 찾기 ──
//   시작: 정규식
//   끝: 매칭 괄호 + ;
//   문자열/주석 안의 괄호는 무시
function findVarBlock(src, keyword, varName) {
  const re = new RegExp(`^${keyword}\\s+${varName}\\s*=\\s*[\\[\\{]`, 'm');
  const m = re.exec(src);
  if (!m) return null;
  const startDecl = m.index;
  // 첫 [ 또는 { 위치
  let i = startDecl;
  while (i < src.length && src[i] !== '[' && src[i] !== '{') i++;
  if (i >= src.length) return null;
  const openCh = src[i];
  const closeCh = openCh === '[' ? ']' : '}';
  let depth = 0;
  let inString = null;
  let inLineComment = false;
  let inBlockComment = false;
  while (i < src.length) {
    const c = src[i];
    const nx = src[i + 1];
    if (inLineComment) {
      if (c === '\n') inLineComment = false;
      i++; continue;
    }
    if (inBlockComment) {
      if (c === '*' && nx === '/') { inBlockComment = false; i += 2; continue; }
      i++; continue;
    }
    if (inString) {
      if (c === '\\') { i += 2; continue; }
      if (c === inString) inString = null;
      i++; continue;
    }
    if (c === '/' && nx === '/') { inLineComment = true; i += 2; continue; }
    if (c === '/' && nx === '*') { inBlockComment = true; i += 2; continue; }
    if (c === '"' || c === "'" || c === '`') { inString = c; i++; continue; }
    if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') {
      depth--;
      if (depth === 0) {
        // 닫힘 — ; 까지 포함
        let j = i + 1;
        while (j < src.length && /[ \t;]/.test(src[j])) j++;
        return { start: startDecl, end: j };
      }
    }
    i++;
  }
  return null;
}

// ── 5. 메인 ──
function main() {
  console.log(`[import] reading ${IN_PATH}...`);
  if (!fs.existsSync(IN_PATH)) {
    console.error(`[error] file not found: ${IN_PATH}`);
    process.exit(1);
  }
  const wb = XLSX.readFile(IN_PATH);

  // 파일별로 그룹화
  const filesToUpdate = {};
  let warnings = 0;

  for (const def of DB_DEFS) {
    const sheet = wb.Sheets[def.sheet];
    if (!sheet) {
      console.error(`[skip] sheet '${def.sheet}' not found`);
      warnings++;
      continue;
    }
    let data;
    if (def.shape === 'array') data = sheetToArray(sheet);
    else if (def.shape === 'kv-json') data = sheetToKvJson(sheet);
    else continue;

    if (!filesToUpdate[def.file]) filesToUpdate[def.file] = [];
    filesToUpdate[def.file].push({ def, data });
  }

  // 파일별로 부분 교체
  let totalReplaced = 0;
  for (const [file, entries] of Object.entries(filesToUpdate)) {
    const fp = path.join(DEV_DIR, file);
    let src = fs.readFileSync(fp, 'utf8');

    // 끝쪽부터 거꾸로 교체해야 인덱스가 안 깨짐
    const blocks = [];
    for (const { def, data } of entries) {
      const block = findVarBlock(src, def.keyword, def.var);
      if (!block) {
        console.error(`[skip] ${def.var} block not found in ${file}`);
        warnings++;
        continue;
      }
      const newCode = `${def.keyword} ${def.var} = ${serializeJs(data)};`;
      blocks.push({ ...block, newCode, varName: def.var });
    }
    blocks.sort((a, b) => b.start - a.start);
    let count = 0;
    for (const b of blocks) {
      src = src.slice(0, b.start) + b.newCode + src.slice(b.end);
      count++;
    }
    if (!checkOnly) {
      fs.writeFileSync(fp, src);
      console.log(`  ${file.padEnd(24)} ${String(count).padStart(2)} blocks updated`);
    } else {
      console.log(`  ${file.padEnd(24)} ${String(count).padStart(2)} blocks would update (dry)`);
    }
    totalReplaced += count;
  }

  console.log(`\n[import] ${totalReplaced} blocks ${checkOnly ? 'would be replaced' : 'replaced'}, ${warnings} warnings`);
  if (warnings > 0) process.exit(2);
}

main();
