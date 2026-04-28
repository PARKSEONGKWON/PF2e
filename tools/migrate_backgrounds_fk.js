// migrate_backgrounds_fk.js
// BACKGROUNDS의 skills(텍스트 CSV)/feat(한국어) → 외래키 정규화
//   skills → fixed_skills(SKILLS.id 배열) + choice_skill_groups + fixed_lores + deity_skill 마커
//   feat → feat_id (FEAT_DB.id)
// 일회성. dev/cs_data.js를 in-place 갱신.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DEV = path.resolve(__dirname, '..', 'dev');
const fpData = path.join(DEV, 'cs_data.js');
const fpFeat = path.join(DEV, 'feat_db.js');

// 로드
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(fpData, 'utf8').replace(/^const /gm, 'var '), ctx);
vm.runInContext(fs.readFileSync(fpFeat, 'utf8').replace(/^const /gm, 'var '), ctx);

const SKILL_KO = {};
ctx.SKILLS.forEach(s => { SKILL_KO[s.name] = s.id; });

// FEAT_DB 매칭 + alias
const FEAT_BY_KO = {};
ctx.FEAT_DB.forEach(f => { if (f && f.name_ko) FEAT_BY_KO[f.name_ko] = f.id; });

// 한국어 feat 이름 alias (BACKGROUNDS 데이터의 텍스트 오류 보정)
const FEAT_ALIAS = {
  '확인': 'assurance',         // BACKGROUNDS '확인' → FEAT_DB '확신' (PlayerCore 정본)
};

// FEAT_DB 미등재 재주 (PlayerCore에는 있으나 rebuild에서 누락) — 슬러그 부여 후 사용자 보고
const FEAT_PENDING = {
  '동물 훈련':   'train-animal',
  '무거운 짐꾼': 'hefty-hauler',
  '흥정 사냥꾼': 'bargain-hunter',
};

function resolveFeatId(featKo) {
  const ko = featKo.trim();
  if (FEAT_ALIAS[ko]) return FEAT_ALIAS[ko];
  if (FEAT_BY_KO[ko]) return FEAT_BY_KO[ko];
  if (FEAT_PENDING[ko]) return FEAT_PENDING[ko];
  return null;
}

function parseSkills(skillsText) {
  const result = {
    fixed_skills: [],
    choice_skill_groups: [],
    fixed_lores: [],
    deity_skill: false,
    deity_lore: false,
  };
  const parts = (skillsText || '').split(', ').map(s => s.trim()).filter(Boolean);
  parts.forEach(s => {
    // "신격 기술" 특수
    if (s === '신격 기술') { result.deity_skill = true; return; }
    if (s === '신격 지식') { result.deity_lore = true; return; }

    // "X 지식" 또는 "지식" 포함
    if (/지식$/.test(s) || s.includes('지식')) {
      // 예: "필사 지식", "지형 지식(동물이 사는 지형)"
      const lore = s.replace(/\s*지식.*$/, '').trim();
      result.fixed_lores.push(lore);
      return;
    }

    // "또는" / "/" / "중 선택"
    if (s.includes('또는') || s.includes('/') || s.includes('중 선택')) {
      const candidates = s.replace(/\s*중 선택/, '')
                          .split(/\s*(?:또는|\/)\s*/)
                          .map(c => c.trim())
                          .filter(Boolean);
      const ids = candidates.map(c => SKILL_KO[c]).filter(Boolean);
      if (ids.length === candidates.length) {
        result.choice_skill_groups.push(ids);
      } else {
        console.error(`✗ skill match miss: "${s}" → ${candidates.map(c => c+'='+(SKILL_KO[c]||'?')).join(', ')}`);
        process.exit(1);
      }
      return;
    }

    // 고정 단일
    const id = SKILL_KO[s];
    if (id) {
      result.fixed_skills.push(id);
    } else {
      console.error(`✗ skill match miss: "${s}"`);
      process.exit(1);
    }
  });
  return result;
}

// 로드된 BACKGROUNDS를 직접 변환 → JSON 출력
const out = ctx.BACKGROUNDS.map(b => {
  const parsed = parseSkills(b.skills);
  const featId = b.feat ? resolveFeatId(b.feat) : null;

  if (b.feat && !featId) {
    console.error(`✗ feat match miss: "${b.feat}" (${b.id})`);
    process.exit(1);
  }

  const newObj = {
    id: b.id,
    name: b.name,
    en: b.en,
    boosts: b.boosts || [],
  };
  if (b.boost_choices) newObj.boost_choices = b.boost_choices;
  if (b.free_boosts !== undefined) newObj.free_boosts = b.free_boosts;
  newObj.fixed_skills = parsed.fixed_skills;
  if (parsed.choice_skill_groups.length) newObj.choice_skill_groups = parsed.choice_skill_groups;
  if (parsed.fixed_lores.length) newObj.fixed_lores = parsed.fixed_lores;
  if (parsed.deity_skill) newObj.deity_skill = true;
  if (parsed.deity_lore) newObj.deity_lore = true;
  if (featId) newObj.feat_id = featId;
  if (b.desc) newObj.desc = b.desc;
  return newObj;
});

// 보고
console.log(`\n총 ${out.length}개 배경 정규화 완료`);
console.log('feat 매칭:');
const pending = out.filter(b => Object.values(FEAT_PENDING).includes(b.feat_id));
if (pending.length) {
  console.log(`  ※ FEAT_DB 미등재 (PlayerCore에는 있음, 슬러그만 부여):`);
  Object.entries(FEAT_PENDING).forEach(([ko,id]) => {
    const using = out.filter(b => b.feat_id === id).map(b => b.id);
    if (using.length) console.log(`    - ${ko}(${id}) → ${using.join(', ')}`);
  });
}

// cs_data.js의 BACKGROUNDS 블록 교체
const src = fs.readFileSync(fpData, 'utf8');
const start = src.indexOf('const BACKGROUNDS = [');
if (start < 0) { console.error('BACKGROUNDS 블록 없음'); process.exit(1); }
let depth = 0, end = -1;
for (let i = src.indexOf('[', start); i < src.length; i++) {
  if (src[i] === '[') depth++;
  else if (src[i] === ']') { depth--; if (depth === 0) { end = i + 1; break; } }
}
if (end < 0) { console.error('BACKGROUNDS 종료 위치 못 찾음'); process.exit(1); }

// 종료 ; 까지 포함
let endStmt = end;
while (endStmt < src.length && src[endStmt] !== ';') endStmt++;
endStmt++;

const json = JSON.stringify(out, null, 2);
const newBlock = 'const BACKGROUNDS = ' + json + ';';
const updated = src.slice(0, start) + newBlock + src.slice(endStmt);

fs.writeFileSync(fpData, updated, 'utf8');
console.log('\n✓ cs_data.js BACKGROUNDS 정규화 완료');
