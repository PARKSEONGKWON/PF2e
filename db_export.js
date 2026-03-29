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

const output = {
  SPELL_DB, FEAT_DB,
  WEAPON_DB, ARMOR_DB, SHIELD_DB, GEAR_DB
};

fs.writeFileSync(path.join(dir, '_db_cache.json'), JSON.stringify(output, null, 0), 'utf8');
console.log('✓ _db_cache.json 생성 완료');
console.log('  SPELL_DB:', SPELL_DB.length);
console.log('  FEAT_DB:', FEAT_DB.length);
console.log('  WEAPON_DB:', WEAPON_DB.length);
console.log('  ARMOR_DB:', ARMOR_DB.length);
console.log('  SHIELD_DB:', SHIELD_DB.length);
console.log('  GEAR_DB:', GEAR_DB.length);
