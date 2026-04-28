#!/usr/bin/env node
// ═══════════════════════════════════════════════
//  ATTRIBUTES ENUM MIGRATION
//   CLASSES.keyAttr   → key_attrs        (단순 배열, 1개=고정 / 2+=OR 1택)
//   ANCESTRIES.boosts → boosts + boost_choices + free_boosts
//   ANCESTRIES.flaws  → flaws + flaw_choices + free_flaws
//   BACKGROUNDS.boosts(텍스트) → boosts + boost_choices + free_boosts
//
//  ATTRIBUTES enum: ['str','dex','con','int','wis','cha']
// ═══════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DEV_DIR = path.join(ROOT, 'dev');
const DRY = process.argv.includes('--dry');

const KO_TO_ENUM = { '근력':'str', '민첩':'dex', '건강':'con', '지능':'int', '지혜':'wis', '매력':'cha' };

// ── 키 추출 헬퍼 ──
function extractAttr(s) {
  if (!s) return null;
  // 영문 코드 우선
  const m = s.match(/\b(STR|DEX|CON|INT|WIS|CHA)\b/i);
  if (m) return m[1].toLowerCase();
  // 한글
  for (const [ko, en] of Object.entries(KO_TO_ENUM)) {
    if (s.includes(ko)) return en;
  }
  return null;
}

// ── CLASSES.keyAttr → key_attrs ──
function parseKeyAttr(text) {
  if (!text) return [];
  const m = text.match(/\b(STR|DEX|CON|INT|WIS|CHA)\b/gi);
  return m ? [...new Set(m.map(s => s.toLowerCase()))] : [];
}

// ── ANCESTRIES.boosts/flaws (배열) → 분리 ──
function parseAncestryAttrList(arr) {
  if (!Array.isArray(arr)) return { fixed: [], choices: [], free: 0 };
  const fixed = [];
  const choices = [];
  let free = 0;
  for (const item of arr) {
    if (typeof item !== 'string') continue;
    if (item.includes('자유')) { free++; continue; }
    if (item.includes('또는') || item.includes('/')) {
      const opts = item.split(/또는|\//).map(s => extractAttr(s.trim())).filter(Boolean);
      if (opts.length >= 2) { choices.push(opts); continue; }
    }
    const k = extractAttr(item);
    if (k) fixed.push(k);
  }
  return { fixed, choices, free };
}

// ── BACKGROUNDS.boosts (텍스트) → 분리 ──
function parseBackgroundBoosts(text) {
  if (!text) return { fixed: [], choices: [], free: 0 };
  const parts = text.split(',').map(s => s.trim()).filter(Boolean);
  const fixed = [];
  const choices = [];
  let free = 0;
  for (const p of parts) {
    if (p === '자유' || p.includes('자유')) { free++; continue; }
    if (p.includes('또는')) {
      const opts = p.split('또는').map(s => extractAttr(s.trim())).filter(Boolean);
      if (opts.length >= 2) { choices.push(opts); continue; }
    }
    const k = extractAttr(p);
    if (k) fixed.push(k);
  }
  return { fixed, choices, free };
}

// ── DB 로드 ──
function loadAllDBs() {
  const sandbox = { window:{}, console };
  vm.createContext(sandbox);
  let src = fs.readFileSync(path.join(DEV_DIR, 'cs_data.js'), 'utf8');
  // CLASSES, ANCESTRIES, BACKGROUNDS const → var
  for (const v of ['CLASSES','ANCESTRIES','BACKGROUNDS']) {
    src = src.replace(new RegExp(`^const\\s+${v}\\s*=`, 'm'), `var ${v} =`);
  }
  vm.runInContext(src, sandbox, { filename: 'cs_data.js' });
  return sandbox;
}

// ── findVarBlock (괄호 매칭) ──
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

// ── 메인 ──
function main() {
  console.log(`[migrate-attrs] ${DRY ? 'dry-run' : 'apply'} mode\n`);
  const ctx = loadAllDBs();

  // (1) CLASSES.keyAttr → key_attrs
  console.log('=== CLASSES ===');
  for (const cls of ctx.CLASSES) {
    const arr = parseKeyAttr(cls.keyAttr);
    cls.key_attrs = arr;
    delete cls.keyAttr;
    console.log(`  ${cls.id.padEnd(8)} key_attrs=${JSON.stringify(arr)}`);
  }

  // (2) ANCESTRIES.boosts/flaws → 분리
  console.log('\n=== ANCESTRIES ===');
  for (const anc of ctx.ANCESTRIES) {
    const b = parseAncestryAttrList(anc.boosts);
    const f = parseAncestryAttrList(anc.flaws);
    anc.boosts = b.fixed;
    anc.boost_choices = b.choices;
    anc.free_boosts = b.free;
    anc.flaws = f.fixed;
    anc.flaw_choices = f.choices;
    anc.free_flaws = f.free;
    console.log(`  ${anc.id.padEnd(10)} boosts=${JSON.stringify(b.fixed)} choices=${JSON.stringify(b.choices)} free=${b.free}  flaws=${JSON.stringify(f.fixed)} free_flaws=${f.free}`);
  }

  // (3) BACKGROUNDS.boosts (텍스트) → 분리
  console.log('\n=== BACKGROUNDS (sample 5 + warnings) ===');
  let bgOk = 0, bgWarn = 0;
  for (const bg of ctx.BACKGROUNDS) {
    const r = parseBackgroundBoosts(bg.boosts);
    bg.boosts = r.fixed;
    bg.boost_choices = r.choices;
    bg.free_boosts = r.free;
    if (r.fixed.length === 0 && r.choices.length === 0 && r.free === 0) {
      console.log(`  [WARN] ${bg.id}: empty result`);
      bgWarn++;
    } else { bgOk++; }
  }
  console.log(`  parsed: ${bgOk} OK, ${bgWarn} warnings`);
  for (const bg of ctx.BACKGROUNDS.slice(0, 5)) {
    console.log(`    ${bg.id.padEnd(20)} boosts=${JSON.stringify(bg.boosts)} choices=${JSON.stringify(bg.boost_choices)} free=${bg.free_boosts}`);
  }

  // ── 저장 ──
  const fp = path.join(DEV_DIR, 'cs_data.js');
  let src = fs.readFileSync(fp, 'utf8');
  const updates = [
    { var:'CLASSES',     data: ctx.CLASSES,     keyword:'const' },
    { var:'ANCESTRIES',  data: ctx.ANCESTRIES,  keyword:'const' },
    { var:'BACKGROUNDS', data: ctx.BACKGROUNDS, keyword:'const' },
  ];
  const blocks = updates.map(u => {
    const b = findVarBlock(src, u.keyword, u.var);
    return b ? { ...b, code: `${u.keyword} ${u.var} = ${JSON.stringify(u.data, null, 2)};`, var: u.var } : null;
  }).filter(Boolean);
  blocks.sort((a, b) => b.start - a.start);
  for (const b of blocks) src = src.slice(0, b.start) + b.code + src.slice(b.end);

  console.log(`\n=== ${DRY ? 'DRY ' : ''}write ===`);
  console.log(`  cs_data.js — ${blocks.length} blocks ${DRY ? 'would be replaced' : 'replaced'}`);
  if (!DRY) fs.writeFileSync(fp, src);

  console.log(`\n[migrate-attrs] ${DRY ? 'dry-run complete' : 'done'}`);
}

main();
