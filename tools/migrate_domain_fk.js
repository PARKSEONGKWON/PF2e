#!/usr/bin/env node
// DOMAIN_DB 한국어명 참조 → SPELL_DB.id 외래키 정규화
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DEV_DIR = path.join(ROOT, 'dev');
const DRY = process.argv.includes('--dry');

// DB 로드
const ctx = { window:{}, console:{ error(){}, log(){} } };
vm.createContext(ctx);
for (const f of ['cs_data.js','SPELL_DB.js','class_features_db.js']) {
  let src = fs.readFileSync(path.join(DEV_DIR, f), 'utf8').replace(/^(const|let)\s+(\w+)\s*=/gm, 'var $2 =');
  try { vm.runInContext(src, ctx, { filename: f }); } catch {}
}
const SPELL_DB = ctx.SPELL_DB;
const koToSpellId = {};
for (const sp of SPELL_DB) if (sp.name_ko) koToSpellId[sp.name_ko] = sp.id;

// 수동 override (PDF 점검으로 확정된 잔재 fix)
const OVERRIDES = {
  'protection.initial':  'protector-sacrifice',
  'protection.advanced': 'protector-sphere',  // 기존 'energy-absorption'은 위저드 학파 주문 (잔재)
};

const DOMAIN_DB = ctx.DOMAIN_DB;
console.log('=== 변환 결과 ===');
let migrated = 0, missing = 0, overridden = 0;
const newDomain = {};
for (const [domainId, info] of Object.entries(DOMAIN_DB)) {
  const out = { name: info.name };
  for (const fld of ['initial', 'advanced']) {
    const overrideKey = `${domainId}.${fld}`;
    if (OVERRIDES[overrideKey]) {
      out[fld] = OVERRIDES[overrideKey];
      console.log(`  [override] ${overrideKey}: '${info[fld]}' → '${OVERRIDES[overrideKey]}'`);
      overridden++;
      continue;
    }
    const koName = info[fld];
    if (!koName) continue;
    const spellId = koToSpellId[koName];
    if (spellId) {
      out[fld] = spellId;
      migrated++;
    } else {
      out[fld] = koName;
      console.error(`[warn] ${domainId}.${fld}: '${koName}' 매칭 안 됨`);
      missing++;
    }
  }
  newDomain[domainId] = out;
}
console.log(`\n자동 변환: ${migrated} | 수동 override: ${overridden} | 누락: ${missing}`);
console.log(`\n변환 완료: ${migrated}개, 매칭 실패(잔재): ${missing}개`);

// 부분 교체
const fp = path.join(DEV_DIR, 'class_features_db.js');
let src = fs.readFileSync(fp, 'utf8');

function findVarBlock(src, keyword, varName) {
  const re = new RegExp(`^${keyword}\\s+${varName}\\s*=\\s*[\\[\\{]`, 'm');
  const m = re.exec(src);
  if (!m) return null;
  let i = m.index;
  while (i < src.length && src[i] !== '[' && src[i] !== '{') i++;
  let depth = 0, inString = null, inLine = false, inBlock = false;
  while (i < src.length) {
    const c = src[i], nx = src[i+1];
    if (inLine) { if (c === '\n') inLine = false; i++; continue; }
    if (inBlock) { if (c === '*' && nx === '/') { inBlock = false; i += 2; continue; } i++; continue; }
    if (inString) {
      if (c === '\\') { i += 2; continue; }
      if (c === inString) inString = null;
      i++; continue;
    }
    if (c === '/' && nx === '/') { inLine = true; i += 2; continue; }
    if (c === '/' && nx === '*') { inBlock = true; i += 2; continue; }
    if (c === '"' || c === "'" || c === '`') { inString = c; i++; continue; }
    if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') {
      depth--;
      if (depth === 0) {
        let j = i + 1;
        while (j < src.length && /[ \t;]/.test(src[j])) j++;
        return { start: m.index, end: j };
      }
    }
    i++;
  }
  return null;
}

const block = findVarBlock(src, 'var', 'DOMAIN_DB');
if (!block) { console.error('DOMAIN_DB block not found'); process.exit(1); }
const newCode = `var DOMAIN_DB = ${JSON.stringify(newDomain, null, 2)};`;
const updated = src.slice(0, block.start) + newCode + src.slice(block.end);
if (!DRY) fs.writeFileSync(fp, updated);
console.log(`\n${DRY ? 'DRY-' : ''}WROTE class_features_db.js DOMAIN_DB`);
