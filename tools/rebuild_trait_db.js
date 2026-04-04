#!/usr/bin/env node
/**
 * PlayerCore.html 용어집 테이블에서 TRAIT_DB 항목을 자동 생성.
 * 무기 특성은 cs_data.js에서 수동 관리 (여기서 생성하지 않음).
 *
 * 사용법: node tools/rebuild_trait_db.js
 * → 용어집 파싱 결과를 stdout에 JS object 형태로 출력
 * → cs_data.js의 TRAIT_DB에 수동 병합하거나 자동 교체
 */

const fs = require('fs');
const html = fs.readFileSync('PlayerCore.html', 'utf8');

// 용어집 테이블 파싱
const rows = [...html.matchAll(/<tr><td><strong>(.*?)<\/strong><\/td><td>(.*?)<\/td><td>(.*?)<\/td><\/tr>/g)];

const traits = {};
rows.forEach(m => {
  const ko = m[1].trim();
  const en = m[2].trim();
  const def = m[3].replace(/<[^>]*>/g, '').trim();

  // (trait) 표기가 있거나, 상태(condition) 항목이거나, 특성으로 사용되는 용어
  // 모든 항목을 TRAIT_DB에 포함 (벌룬 팝업에 사용)
  traits[ko] = { en, def };
});

console.log('// ═══════════════════════════════════════════════');
console.log('//  TRAIT_DB 용어집 항목 (PlayerCore.html 자동 파싱)');
console.log('//  ' + Object.keys(traits).length + '개 항목');
console.log('// ═══════════════════════════════════════════════');
console.log('');

// JS object 형태로 출력
for (const [ko, {en, def}] of Object.entries(traits)) {
  const escaped = def.replace(/'/g, "\\'");
  console.log(`  '${ko}':'${escaped}',`);
}

console.error(`파싱 완료: ${Object.keys(traits).length}개 항목`);
