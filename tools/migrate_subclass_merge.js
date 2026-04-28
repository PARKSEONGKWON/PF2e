#!/usr/bin/env node
// ═══════════════════════════════════════════════
//  SUBCLASS MERGE MIGRATION
//   SUBCLASS_AUTO_FEATS + SUBCLASS_AUTO_SPELLS + SUBCLASS_FEATURE_NAMES + SUBCLASS_PROF_TABLE
//   → SUBCLASS_DB의 각 행에 흡수
//
//   추가 컬럼:
//     desc            (summary에서 효과 줄 제거)
//     granted_skills  (SKILLS.id 배열)
//     granted_feats   (FEAT_DB.id 배열)
//     granted_spells  (객체 배열: {lv, type, rank?, spell_id})
//     features        (객체 배열: SUBCLASS_FEATURE_NAMES 그대로)
//     prof_changes    (SUBCLASS_PROF_TABLE 객체 그대로)
//
//   summary 파싱: "결사 기술:", "뮤즈 재주:", "드루이드 재주:", "결사 주문:", "뮤즈 주문:"
// ═══════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DEV_DIR = path.join(ROOT, 'dev');
const DRY = process.argv.includes('--dry');

// ── DB 로드 ──
function loadAllDBs() {
  const sandbox = { window:{}, console };
  vm.createContext(sandbox);
  for (const f of ['cs_data.js','class_features_db.js','feat_db.js','SPELL_DB.js']) {
    let src = fs.readFileSync(path.join(DEV_DIR, f), 'utf8')
      .replace(/^(const|let)\s+(\w+)\s*=/gm, 'var $2 =');
    try { vm.runInContext(src, sandbox, { filename: f }); }
    catch (e) { console.error(`[warn] ${f}: ${e.message}`); }
  }
  return sandbox;
}

// ── 매핑 헬퍼 ──
function findSkillId(koName, SKILLS) {
  if (!koName) return null;
  const t = koName.trim();
  const s = SKILLS.find(s => s.name === t || s.id === t);
  return s ? s.id : null;
}

function findFeatId(nameEn, classId, FEAT_DB) {
  if (!nameEn) return null;
  const matches = FEAT_DB.filter(f => f.name_en === nameEn);
  if (!matches.length) return null;
  if (matches.length === 1) return matches[0].id;
  const m = matches.find(f => f.category === classId);
  return (m || matches[0]).id;
}

function findSpellId(nameEn, SPELL_DB) {
  if (!nameEn) return null;
  const m = SPELL_DB.find(s => s.name_en === nameEn);
  return m ? m.id : null;
}

// ── summary 파싱 ──
//   효과 줄 추출 + 효과 줄 제거된 desc 반환
function parseSubclassSummary(summary) {
  if (!summary) return { desc: '', skills: [], featNames: [], spellNames: [] };
  // <br>은 줄 구분
  const segments = summary.split(/<br\s*\/?>/i).map(s => s.trim()).filter(Boolean);
  const skills = [];
  const featNames = [];
  const spellNames = [];
  const descSegments = [];

  for (const seg of segments) {
    const plain = seg.replace(/<[^>]+>/g, '').trim();
    if (!plain) continue;

    // 효과 줄 패턴 ("결사 기술:", "기술:", "뮤즈 재주:", "드루이드 재주:", "결사 주문:", "뮤즈 주문:")
    const effLine = plain.split('|').map(s => s.trim()).filter(Boolean);
    let isEffectLine = false;

    for (const part of effLine) {
      // 기술
      let m = part.match(/^(?:결사 기술|기술)\s*[：:]\s*(.+)$/);
      if (m) {
        isEffectLine = true;
        m[1].split(/[,、，]/).forEach(n => skills.push(n.trim()));
        continue;
      }
      // 재주 ("뮤즈 재주: 잔향 작곡(Lingering Composition)")
      m = part.match(/^(?:뮤즈 재주|드루이드 재주|결사 재주)\s*[：:]\s*(.+)$/);
      if (m) {
        isEffectLine = true;
        const enMatch = m[1].match(/\(([^)]+)\)/);
        if (enMatch) featNames.push(enMatch[1].trim());
        continue;
      }
      // 주문 ("결사 주문: 동물 치유(heal animal)")
      m = part.match(/^(?:뮤즈 주문|결사 주문|학파 주문|후원자 주문)\s*[：:]\s*(.+)$/);
      if (m) {
        isEffectLine = true;
        const enMatch = m[1].match(/\(([^)]+)\)/);
        if (enMatch) {
          // 영문명 첫 글자 대문자화 (heal animal → Heal Animal)
          const en = enMatch[1].trim().split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
          spellNames.push(en);
        }
        continue;
      }
    }

    if (!isEffectLine) descSegments.push(seg);  // 원본 HTML 보존
  }

  return {
    desc: descSegments.join('<br>').trim(),
    skills,
    featNames,
    spellNames,
  };
}

// ── 통합 ──
function mergeSubclasses(ctx) {
  const { SUBCLASS_DB, SUBCLASS_AUTO_FEATS, SUBCLASS_AUTO_SPELLS,
          SUBCLASS_FEATURE_NAMES, SUBCLASS_PROF_TABLE,
          SKILLS, FEAT_DB, SPELL_DB } = ctx;

  let warnSkills = 0, warnFeats = 0, warnSpells = 0;

  for (const sub of SUBCLASS_DB) {
    const id = sub.id;
    const classId = sub.class_id;

    // summary 파싱
    const parsed = parseSubclassSummary(sub.summary);

    // granted_skills (summary에서)
    const granted_skills = [];
    for (const ko of parsed.skills) {
      const sid = findSkillId(ko, SKILLS);
      if (sid) granted_skills.push(sid);
      else { console.error(`[warn skill] ${id}: '${ko}'`); warnSkills++; }
    }

    // granted_feats: SUBCLASS_AUTO_FEATS + summary 파싱 (중복 제거)
    const granted_feats = [];
    const seenFeatEn = new Set();
    for (const f of (SUBCLASS_AUTO_FEATS[id] || [])) {
      if (!f.name_en || seenFeatEn.has(f.name_en)) continue;
      seenFeatEn.add(f.name_en);
      const fid = findFeatId(f.name_en, classId, FEAT_DB);
      if (fid) granted_feats.push(fid);
      else { console.error(`[warn feat] ${id}: '${f.name_en}' not in FEAT_DB`); warnFeats++; }
    }
    for (const en of parsed.featNames) {
      if (seenFeatEn.has(en)) continue;
      seenFeatEn.add(en);
      const fid = findFeatId(en, classId, FEAT_DB);
      if (fid) granted_feats.push(fid);
      else { console.error(`[warn feat-summary] ${id}: '${en}' not in FEAT_DB`); warnFeats++; }
    }

    // granted_spells: SUBCLASS_AUTO_SPELLS + summary
    const granted_spells = [];
    const seenSpellEn = new Set();
    for (const sp of (SUBCLASS_AUTO_SPELLS[id] || [])) {
      if (!sp.name_en || seenSpellEn.has(sp.name_en)) continue;
      seenSpellEn.add(sp.name_en);
      const sid = findSpellId(sp.name_en, SPELL_DB);
      if (sid) {
        const entry = { lv: sp.lv, type: sp.type, spell_id: sid };
        if (sp.rank !== undefined) entry.rank = sp.rank;
        granted_spells.push(entry);
      } else {
        console.error(`[warn spell] ${id}: '${sp.name_en}' not in SPELL_DB`);
        warnSpells++;
      }
    }
    for (const en of parsed.spellNames) {
      if (seenSpellEn.has(en)) continue;
      seenSpellEn.add(en);
      const sid = findSpellId(en, SPELL_DB);
      if (sid) granted_spells.push({ lv: 1, type: 'focus', spell_id: sid });
      else { console.error(`[warn spell-summary] ${id}: '${en}' not in SPELL_DB`); warnSpells++; }
    }

    // features
    const features = (SUBCLASS_FEATURE_NAMES[id] || []).map(f => ({
      lv: f.lv,
      name_ko: f.name_ko,
      name_en: f.name_en,
      desc: f.desc || '',
    }));

    // prof_changes
    const prof_changes = SUBCLASS_PROF_TABLE[id] || {};

    // 새 SUBCLASS_DB row (id 첫 컬럼 유지 + desc + 효과 컬럼)
    sub.desc = parsed.desc;
    sub.granted_skills = granted_skills;
    sub.granted_feats = granted_feats;
    sub.granted_spells = granted_spells;
    sub.features = features;
    sub.prof_changes = prof_changes;
    delete sub.summary;
  }

  return { warnSkills, warnFeats, warnSpells };
}

// ── findVarBlock ──
function findVarBlock(src, keyword, varName) {
  const re = new RegExp(`^${keyword}\\s+${varName}\\s*=\\s*[\\[\\{]`, 'm');
  const m = re.exec(src);
  if (!m) return null;
  const startDecl = m.index;
  let i = startDecl;
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
        return { start: startDecl, end: j };
      }
    }
    i++;
  }
  return null;
}

// ── 변수 블록을 통째로 제거 (선언 위 주석/공백 포함 안 함, 본문만) ──
function removeVarBlock(src, keyword, varName) {
  const block = findVarBlock(src, keyword, varName);
  if (!block) return src;
  // 선언 직전 빈줄까지 함께 제거
  let start = block.start;
  // 선언 라인 시작으로 이동 (개행 직후)
  while (start > 0 && src[start-1] !== '\n') start--;
  let end = block.end;
  while (end < src.length && src[end] === '\n') end++;
  return src.slice(0, start) + src.slice(end);
}

// ── 메인 ──
function main() {
  console.log(`[migrate-subclass] ${DRY ? 'dry-run' : 'apply'} mode\n`);
  const ctx = loadAllDBs();

  console.log('=== SUBCLASS_DB 통합 ===');
  const stats = mergeSubclasses(ctx);
  console.log(`  warnings: skills=${stats.warnSkills} feats=${stats.warnFeats} spells=${stats.warnSpells}`);

  // 샘플 출력
  console.log('\n=== 샘플 (order-animal) ===');
  const sample = ctx.SUBCLASS_DB.find(s => s.id === 'order-animal');
  console.log(JSON.stringify(sample, null, 2));

  console.log('\n=== 샘플 (doctrine-cloistered) ===');
  const sample2 = ctx.SUBCLASS_DB.find(s => s.id === 'doctrine-cloistered');
  console.log(JSON.stringify(sample2, null, 2).slice(0, 800));

  // 저장: cs_data.js의 SUBCLASS_DB 교체 + class_features_db.js의 4개 변수 제거
  console.log(`\n=== ${DRY ? 'DRY ' : ''}write ===`);

  // cs_data.js
  const csDataPath = path.join(DEV_DIR, 'cs_data.js');
  let csData = fs.readFileSync(csDataPath, 'utf8');
  const block = findVarBlock(csData, 'const', 'SUBCLASS_DB');
  if (!block) { console.error('SUBCLASS_DB block not found'); process.exit(1); }
  const newCode = `const SUBCLASS_DB = ${JSON.stringify(ctx.SUBCLASS_DB, null, 2)};`;
  csData = csData.slice(0, block.start) + newCode + csData.slice(block.end);
  if (!DRY) fs.writeFileSync(csDataPath, csData);
  console.log(`  cs_data.js — SUBCLASS_DB replaced`);

  // class_features_db.js — 4개 변수 제거
  const cfDbPath = path.join(DEV_DIR, 'class_features_db.js');
  let cfDb = fs.readFileSync(cfDbPath, 'utf8');
  const removed = ['SUBCLASS_AUTO_FEATS','SUBCLASS_AUTO_SPELLS','SUBCLASS_FEATURE_NAMES','SUBCLASS_PROF_TABLE'];
  for (const v of removed) {
    cfDb = removeVarBlock(cfDb, 'var', v);
  }
  if (!DRY) fs.writeFileSync(cfDbPath, cfDb);
  console.log(`  class_features_db.js — 4 variables removed`);

  console.log(`\n[migrate-subclass] ${DRY ? 'dry-run complete' : 'done'}`);
}

main();
