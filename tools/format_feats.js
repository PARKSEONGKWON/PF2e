#!/usr/bin/env node
/**
 * format_feats.js
 * PlayerCore.html의 재주(Feat) 블록에 <em>특성</em> 줄을 삽입하는 스크립트
 *
 * 대상: — 특기 N [TRAIT] 패턴이 있는 <h3 class="sub"> 태그
 * 제외: 기술 행동 섹션 (5600~6145줄, 이미 변환됨)
 */

const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, '..', 'PlayerCore.html');
const lines = fs.readFileSync(INPUT, 'utf-8').split('\n');

// 기술 행동 섹션 제외 범위 (0-indexed)
const EXCLUDE_START = 5599; // line 5600
const EXCLUDE_END = 6144;   // line 6145

// 재주 헤더 패턴: — 특기 N [TRAIT] (optional extra traits)
// 예: — 특기 1 [드워프]
// 예: — 특기 17 [드워프] 비일반
// 예: — 특기 5 [노움] 집중 환영 근원 시각
const FEAT_HEADER_RE = /^<h3 class="sub".*— 특기 \d+ \[([^\]]+)\](.*?)<\/h3>$/;

// 메타데이터 줄 패턴 (h3 바로 다음에 올 수 있는 것들)
const META_KEYS = ['전제조건', '요구사항', '빈도', '발동', '유발 조건'];
const META_RE = new RegExp(`^<p><strong>(${META_KEYS.join('|')}):<\\/strong>`);

// 이미 <em> 특성 줄이 있는지 확인
const ALREADY_HAS_EM_RE = /^<p><em>[^<]+<\/em>/;

let converted = 0;
let skipped = 0;
const examples = [];
const output = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // 제외 범위 체크
  if (i >= EXCLUDE_START && i <= EXCLUDE_END) {
    output.push(line);
    continue;
  }

  const match = line.match(FEAT_HEADER_RE);
  if (!match) {
    output.push(line);
    continue;
  }

  // 특성 추출
  const bracketTrait = match[1].trim(); // [드워프] 안의 내용
  const extraTraits = match[2].trim();  // ] 뒤의 추가 특성들

  // 특성 목록 조합: 추가 특성을 앞에, 대괄호 특성을 뒤에
  let traitList = [];
  if (extraTraits) {
    // 공백으로 구분된 개별 특성들
    traitList = extraTraits.split(/\s+/);
  }
  traitList.push(bracketTrait);
  const traitStr = traitList.join(', ');

  // 다음 줄 확인 (빈 줄이 아닌 첫 번째 줄)
  const nextIdx = i + 1;
  if (nextIdx >= lines.length) {
    output.push(line);
    continue;
  }

  const nextLine = lines[nextIdx];

  // 이미 <em> 특성 줄이 있으면 건드리지 않음
  if (ALREADY_HAS_EM_RE.test(nextLine)) {
    output.push(line);
    skipped++;
    continue;
  }

  // 다음 줄이 메타데이터인지 확인
  const metaMatch = nextLine.match(META_RE);

  const lineNum = i + 1;
  const beforeH3 = line;
  const beforeNext = nextLine;

  output.push(line); // h3는 그대로 출력

  if (metaMatch) {
    // 메타데이터가 있으면: <p><strong>전제조건:</strong>... → <p><em>특성</em><br>\n<strong>전제조건:</strong>...
    const newNextLine = nextLine.replace(/^<p>/, `<p><em>${traitStr}</em><br>\n`);
    output.push(newNextLine);
    i++; // 다음 줄은 이미 처리했으므로 건너뜀

    if (examples.length < 3) {
      examples.push({
        lineNum,
        type: `메타데이터 합침 (${metaMatch[1]})`,
        before: [beforeH3, beforeNext],
        after: [beforeH3, newNextLine]
      });
    }
  } else {
    // 메타데이터가 없으면: 별도 <p><em>특성</em></p> 삽입
    const emLine = `<p><em>${traitStr}</em></p>`;
    output.push(emLine);

    if (examples.length < 3) {
      examples.push({
        lineNum,
        type: '별도 줄 삽입',
        before: [beforeH3, beforeNext],
        after: [beforeH3, emLine, beforeNext]
      });
    }
  }

  converted++;
}

// 파일 쓰기
fs.writeFileSync(INPUT, output.join('\n'), 'utf-8');

// 결과 보고
console.log('=== 재주 형식 변환 완료 ===');
console.log(`변환된 재주 수: ${converted}`);
console.log(`건너뛴 재주 수 (이미 변환됨): ${skipped}`);
console.log(`총 줄 수: ${lines.length} → ${output.length}`);
console.log('');

for (const ex of examples) {
  console.log(`--- 예시: ${ex.lineNum}줄 (${ex.type}) ---`);
  console.log('변환 전:');
  ex.before.forEach(l => console.log('  ' + l));
  console.log('변환 후:');
  ex.after.forEach(l => console.log('  ' + l));
  console.log('');
}
