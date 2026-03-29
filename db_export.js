#!/usr/bin/env node
/**
 * DB → JSON 중간 파일 생성 (Python 엑셀 도구가 읽음)
 * Node.js에서 직접 eval하면 JS 파싱 문제 없음
 */
const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Load all DBs via eval
eval(fs.readFileSync(path.join(dir, 'equipment_db.js'), 'utf8').replace(/const /g, 'var '));
eval(fs.readFileSync(path.join(dir, 'SPELL_DB.js'), 'utf8').replace(/const /g, 'var '));
eval(fs.readFileSync(path.join(dir, 'feat_db.js'), 'utf8').replace(/const /g, 'var '));
eval(fs.readFileSync(path.join(dir, 'class_features_db.js'), 'utf8'));

// cs_data.js — const → var 치환
eval(fs.readFileSync(path.join(dir, 'cs_data.js'), 'utf8').replace(/const /g, 'var ').replace(/let /g, 'var '));

// cs_ui.js — COMPANION_DB, BARDING_DB, FAMILIAR_ABILITIES만 추출
const uiSrc = fs.readFileSync(path.join(dir, 'cs_ui.js'), 'utf8');
const extractVar = (src, varName) => {
  const re = new RegExp(`(?:const|var|let)\\s+${varName}\\s*=\\s*\\[`, 'm');
  const m = src.match(re);
  if (!m) { console.error('  ⚠ extractVar: ' + varName + ' 못 찾음'); return `var ${varName} = [];`; }
  let start = m.index;
  let depth = 0, i = src.indexOf('[', start);
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) break; }
  }
  // include through the semicolon
  let end = i + 1;
  if (end < src.length && src[end] === ';') end++;
  return 'var ' + varName + ' = ' + src.substring(src.indexOf('[', start), i + 1) + ';';
};
eval(extractVar(uiSrc, 'BARDING_DB'));
eval(extractVar(uiSrc, 'COMPANION_DB'));
eval(extractVar(uiSrc, 'FAMILIAR_ABILITIES'));

const output = {
  // 기존
  SPELL_DB, FEAT_DB,
  WEAPON_DB, ARMOR_DB, SHIELD_DB, GEAR_DB,
  // cs_data.js
  CLASSES, SUBCLASS_DB, ANCESTRIES, BACKGROUNDS, HERITAGE_DB,
  CONDITIONS_DATA, SKILLS, ACTION_DB,
  // class_features_db.js
  DEITY_DB,
  CLASS_FEATURE_NAMES, SUBCLASS_FEATURE_NAMES,
  CLASS_AUTO_FEATS, SUBCLASS_AUTO_FEATS,
  CLASS_AUTO_SPELLS, SUBCLASS_AUTO_SPELLS,
  // cs_ui.js
  COMPANION_DB, BARDING_DB, FAMILIAR_ABILITIES,
};

fs.writeFileSync(path.join(dir, '_db_cache.json'), JSON.stringify(output, null, 0), 'utf8');
console.log('✓ _db_cache.json 생성 완료');
console.log('  SPELL_DB:', SPELL_DB.length);
console.log('  FEAT_DB:', FEAT_DB.length);
console.log('  WEAPON_DB:', WEAPON_DB.length);
console.log('  ARMOR_DB:', ARMOR_DB.length);
console.log('  SHIELD_DB:', SHIELD_DB.length);
console.log('  GEAR_DB:', GEAR_DB.length);
console.log('  CLASSES:', CLASSES.length);
console.log('  SUBCLASS_DB:', SUBCLASS_DB.length);
console.log('  ANCESTRIES:', ANCESTRIES.length);
console.log('  BACKGROUNDS:', BACKGROUNDS.length);
console.log('  HERITAGE_DB:', HERITAGE_DB.length);
console.log('  CONDITIONS_DATA:', CONDITIONS_DATA.length);
console.log('  SKILLS:', SKILLS.length);
console.log('  ACTION_DB:', ACTION_DB.length);
console.log('  DEITY_DB:', DEITY_DB.length);
console.log('  COMPANION_DB:', COMPANION_DB.length);
console.log('  BARDING_DB:', BARDING_DB.length);
console.log('  FAMILIAR_ABILITIES:', FAMILIAR_ABILITIES.length);
