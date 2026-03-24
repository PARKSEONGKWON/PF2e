// Pathfinder 2e Player Core — Chapter 7 Spell Database
// 출처: PlayerCore.html 7장 주문 (lines 7098–9346)
// Generated from Korean translation data

const SPELL_DB = [

  // ─── CANTRIPS (25) ───────────────────────────────────────────────

  { name_ko: "부식 폭발", name_en: "Acid Splash", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["공격","산성"],
    summary: "산성 파편을 발사합니다. 주문 공격 굴림. 명중 시 1d6 산성 피해+1 지속 산성 피해." },

  { name_ko: "전령", name_en: "Message", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","divine","occult"], actions: "자유행동", traits: ["청각","언어","정신"],
    summary: "120피트 내 대상에게 속삭임으로 짧은 메시지를 전달하고 대상이 답장을 보낼 수 있습니다." },

  { name_ko: "불꽃 손가락", name_en: "Produce Flame", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["공격","화염"],
    summary: "손바닥에서 불꽃을 발사합니다. 주문 공격 굴림. 명중 시 1d4 화염 피해." },

  { name_ko: "이동 방해", name_en: "Tanglefoot", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["공격","식물"],
    summary: "끈적한 덩굴로 적을 붙잡습니다. 공격 굴림. 대성공: 이동 불가 1라운드. 성공: 이동 속도 10피트 감소." },

  { name_ko: "마법 감지", name_en: "Detect Magic", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: ["탐지","마법"],
    summary: "30피트 발산 내 마법 기운을 감지합니다. 마법 원천을 알 수 있습니다." },

  { name_ko: "빛", name_en: "Light", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: ["빛"],
    summary: "접촉한 물체에서 20피트 범위의 밝은 빛(+20피트 희미한 빛). 지속: 10분." },

  { name_ko: "손재주", name_en: "Mage Hand", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["조작"],
    summary: "마법의 손으로 1벌크 이하 물체를 이동시킵니다. 사거리 30피트." },

  { name_ko: "안정화", name_en: "Stabilize", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["divine","primal"], actions: "2액션", traits: ["치유","활력"],
    summary: "빈사 중인 생물을 안정화시킵니다. 대상이 4번째 빈사 수치 체크에 실패하는 대신 안정화됩니다." },

  { name_ko: "독 뿌리기", name_en: "Spout", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["조작","물"],
    summary: "물을 뿜어 적을 압박합니다. 반사 내성. 실패 시 1d6 둔기 피해+밀려남." },

  { name_ko: "냉기 광선", name_en: "Ray of Frost", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["공격","냉기"],
    summary: "냉기 광선 발사. 주문 공격 굴림. 명중 시 1d4 냉기 피해. 치명 시 이동 속도 -10피트." },

  { name_ko: "전기 충격", name_en: "Electric Arc", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["전기"],
    summary: "최대 2 대상에게 전기 충격. 반사 내성. 실패 시 1d4+시전 능력치 수정치 전기 피해." },

  { name_ko: "독의 뿌리기", name_en: "Void Warp", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["divine","occult"], actions: "2액션", traits: ["공허"],
    summary: "공허 에너지 공격. 인내 내성. 실패 시 1d6+시전 능력치 공허 피해." },

  { name_ko: "에너지 분출", name_en: "Vitality Lash", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["divine","primal"], actions: "2액션", traits: ["활력"],
    summary: "활력 에너지 공격. 언데드에 특히 효과적. 인내 내성. 실패 시 1d4+능력치 활력 피해." },

  { name_ko: "신비 부하", name_en: "Telekinetic Projectile", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["공격"],
    summary: "주변 물체를 투사체로 날립니다. 주문 공격 굴림. 명중 시 1d6+능력치 피해(물체 재질에 따라)." },

  { name_ko: "독 스프레이", name_en: "Caustic Blast", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["산성"],
    summary: "15피트 원뿔에 산성 스프레이. 반사 내성. 실패 시 1d4+능력치 산성 피해." },

  { name_ko: "마법사의 손", name_en: "Prestidigitation", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: [],
    summary: "간단한 마법 묘기. 깨끗하게/더럽히기, 불 켜기/끄기, 소형 물체 떠올리기 등 비전투 효과." },

  { name_ko: "열리기/닫히기", name_en: "Lock/Unlock", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","divine","occult"], actions: "2액션", traits: ["조작"],
    summary: "잠금 장치를 마법으로 열거나 닫습니다. 잠긴 자물쇠를 열거나 연 자물쇠를 닫습니다." },

  { name_ko: "독서 마법", name_en: "Read Aura", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "1액션", traits: ["탐지","조작"],
    summary: "생물이나 물체의 마법적 기운을 읽습니다. 마법 전통과 학파를 알 수 있습니다." },

  { name_ko: "마법 저항", name_en: "Resistance", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: [],
    summary: "접촉한 생물에게 특정 피해 유형에 대한 저항 부여. 저항 1(선택 유형)." },

  { name_ko: "사격 마법", name_en: "Scatter Scree", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["대지"],
    summary: "15피트 원뿔에 작은 돌을 뿌립니다. 반사 내성. 실패 시 1d4+능력치 관통 피해." },

  { name_ko: "수면 마법", name_en: "Slumber Poison", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","occult","primal"], actions: "2액션", traits: ["독"],
    summary: "접촉한 물체에 수면 독을 바릅니다. 다음에 접촉하는 생물이 인내 내성에 실패하면 수면." },

  { name_ko: "약화 소리", name_en: "Shatter", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","occult","primal"], actions: "2액션", traits: ["음파"],
    summary: "음파 에너지로 물체나 생물 공격. 주문 공격 굴림. 명중 시 1d6 음파 피해." },

  { name_ko: "물체 소환", name_en: "Summon Instrumentality", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: [],
    summary: "작은 비마법적 물체를 손에 소환합니다. 10분 지속 후 사라집니다." },

  { name_ko: "텔레키네시스 다트", name_en: "Telekinetic Hand", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["조작"],
    summary: "정신력으로 물체를 조작합니다. 마법사의 손보다 강력하며 더 무거운 물체 이동 가능." },

  { name_ko: "공허 왜곡", name_en: "Void Warp", rank: 1, is_cantrip: true, is_focus: false,
    traditions: ["divine","occult"], actions: "2액션", traits: ["공허"],
    summary: "공허 에너지를 왜곡하여 생물을 약화. 인내 내성. 실패 시 공허 피해+약화 1." },

  // ─── REGULAR SPELLS ──────────────────────────────────────────────

  { name_ko: "산성 집게", name_en: "Acid Grip", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["공격","산성","조작"],
    summary: "산성 마법 손으로 적을 붙잡습니다. 공격 굴림. 명중 시 2d8 산성 피해+조이기 시도." },

  { name_ko: "마법 갑옷", name_en: "Mage Armor", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: [],
    summary: "마법의 힘으로 몸을 감쌉니다. AC+4 방어 보너스. 지속: 다음 일일 준비까지." },

  { name_ko: "마법 화살", name_en: "Magic Missile", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "1~3액션", traits: ["힘"],
    summary: "빗나가지 않는 1d4+1 힘 피해 투사체. 행동당 1발(강화 시 발수 증가)." },

  { name_ko: "변장", name_en: "Disguise Self", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["시각","환영"],
    summary: "외모를 변경합니다. 키 등은 변경 불가. 지속: 1시간. 감지 판정으로 불신 가능." },

  { name_ko: "방패", name_en: "Shield", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult"], actions: "1액션", traits: ["힘"],
    summary: "마법 방패를 만들어 AC+1. 방패 막기로 피해 최대 5 감소(방패 내구도 손상)." },

  { name_ko: "채색 분무", name_en: "Color Spray", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["시각","환영"],
    summary: "다채로운 빛으로 적을 혼란에 빠뜨립니다. 의지 내성. 실패 시 눈멈+혼란." },

  { name_ko: "충격 포탄", name_en: "Shockwave", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["대지"],
    summary: "지면에 충격파를 발생시킵니다. 15피트 원뿔. 반사 내성. 실패 시 넘어뜨려짐+피해." },

  { name_ko: "독", name_en: "Poison", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["독","조작"],
    summary: "접촉으로 독을 주입합니다. 인내 내성. 실패 시 1d4 지속 독 피해." },

  { name_ko: "성성이 마법", name_en: "Charm", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: ["감정","정신"],
    summary: "적을 매혹합니다. 의지 내성. 실패 시 대상이 당신에게 우호적으로 변합니다." },

  { name_ko: "악성 언어", name_en: "Bane", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult"], actions: "2액션", traits: ["정신"],
    summary: "5피트 발산 내 적에게 공격 굴림에 -1 상태 페널티. 지속: 1분. 유지 가능." },

  { name_ko: "강복", name_en: "Bless", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult"], actions: "2액션", traits: ["정신"],
    summary: "5피트 발산 내 아군에게 공격 굴림에 +1 상태 보너스. 지속: 1분. 유지 가능." },

  { name_ko: "공포", name_en: "Fear", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: ["감정","공포","정신"],
    summary: "적을 두려움에 떨게 합니다. 의지 내성. 실패 시 공포(frightened) 2." },

  { name_ko: "이해의 주문", name_en: "Comprehend Language", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult"], actions: "2액션", traits: [],
    summary: "접촉한 생물이 모든 언어를 이해합니다(말하지는 못함). 지속: 1시간." },

  { name_ko: "잠", name_en: "Sleep", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["정신"],
    summary: "적을 잠들게 합니다. 의지 내성. 실패 시 잠 상태." },

  { name_ko: "음식 생성", name_en: "Create Food", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","primal"], actions: "2액션", traits: ["조작"],
    summary: "3명이 하루 먹을 음식을 만들어냅니다. 1시간 내 소비하지 않으면 부패." },

  { name_ko: "어둠", name_en: "Darkness", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "3액션", traits: ["어둠"],
    summary: "20피트 반경 초자연 어둠. 빛 주문 상쇄. 지속: 1분." },

  { name_ko: "거미 오르기", name_en: "Spider Climb", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: [],
    summary: "접촉한 생물이 수직 표면과 천장을 기어오릅니다. 등반 속도 = 보폭 속도. 지속: 10분." },

  { name_ko: "물 걷기", name_en: "Water Walk", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: [],
    summary: "접촉한 생물이 물 위를 걷습니다. 지속: 1시간." },

  { name_ko: "독 중화", name_en: "Neutralize Poison", rank: 3, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","primal"], actions: "2액션", traits: ["치유"],
    summary: "접촉한 생물의 독 하나를 상쇄합니다. 주문 등급 이하의 독." },

  { name_ko: "이동 마법", name_en: "Haste", rank: 3, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult","primal"], actions: "2액션", traits: ["조작"],
    summary: "접촉한 생물이 가속(quickened) 상태. 추가 행동으로 보폭/타격/주문 시전 가능. 지속: 1분." },

  { name_ko: "느려짐", name_en: "Slow", rank: 3, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult","primal"], actions: "2액션", traits: [],
    summary: "최대 6 대상을 느려짐(slowed) 1로 만듭니다. 의지 내성. 지속: 1분." },

  { name_ko: "예지", name_en: "Augury", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult"], actions: "2액션", traits: ["예언"],
    summary: "특정 행동의 결과에 대한 예언. 좋음/나쁨/어느쪽이나/불분명 중 하나를 알 수 있습니다." },

  { name_ko: "차원문", name_en: "Dimension Door", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["순간이동"],
    summary: "120피트 내 시야에 보이는 위치로 순간이동합니다." },

  { name_ko: "다형 변신", name_en: "Polymorph", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult","primal"], actions: "2액션", traits: ["조작","변이"],
    summary: "대상을 작은 무해한 동물로 변신시킵니다. 의지 내성. 실패 시 변신. 지속: 1분." },

  { name_ko: "화염구", name_en: "Fireball", rank: 3, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["화염"],
    summary: "500피트 사거리, 20피트 폭발. 반사 내성. 실패 시 6d6 화염 피해." },

  { name_ko: "번개 화살", name_en: "Lightning Bolt", rank: 3, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["전기"],
    summary: "120피트 직선 번개. 반사 내성. 실패 시 4d12 전기 피해." },

  { name_ko: "신비 갑옷", name_en: "Mystic Armor", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: [],
    summary: "마법 갑옷으로 몸을 감쌉니다. AC 및 내성에 보너스. 지속: 다음 일일 준비까지." },

  { name_ko: "악몽", name_en: "Nightmare", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult"], actions: "2액션", traits: ["환영","정신"],
    summary: "대상에게 고통스러운 악몽을 보냅니다. 숙면 방해. 다음 날 피로." },

  { name_ko: "문자 무기", name_en: "Runic Weapon", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: [],
    summary: "무기에 룬을 새겨 강화합니다. 무기 공격 굴림에 +1 상황 보너스. 지속: 1분." },

  { name_ko: "안전 통행", name_en: "Safe Passage", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","primal"], actions: "3액션", traits: ["조작"],
    summary: "경로를 따라 이동할 때 자연 위험(암석 등)을 무시합니다. 지속: 1시간." },

  { name_ko: "언데드 소환", name_en: "Summon Undead", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult"], actions: "3액션", traits: ["조작"],
    summary: "언데드 생물을 소환합니다. 주문 등급 -1 이하 레벨 언데드. 지속: 유지(최대 1분)." },

  { name_ko: "텔레파시", name_en: "Telepathy", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult"], actions: "2액션", traits: ["언어","정신"],
    summary: "의사소통을 텔레파시로 합니다. 100피트 내 모든 생물과 정신 대화. 지속: 10분." },

  { name_ko: "변이", name_en: "Transmogrify", rank: 8, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["조작","변이"],
    summary: "생물의 형태를 영구적으로 변경합니다. 동의 또는 무력화된 생물 대상." },

  { name_ko: "소망", name_en: "Wish", rank: 10, is_cantrip: false, is_focus: false,
    traditions: ["arcane"], actions: "3액션", traits: [],
    summary: "강력한 마법으로 소원을 이룹니다. 8등급 이하 주문 복제 또는 GM 재량의 다른 효과." },

  // ─── SUPPLEMENTARY REGULAR SPELLS ───────────────────────────────

  { name_ko: "공중 형태", name_en: "Aerial Form", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["조작","변이"],
    summary: "날아다니는 생물로 변신합니다. 대형 크기, 비행 속도 60피트. 지속: 1분." },

  { name_ko: "야수 형태", name_en: "Animal Form", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["primal"], actions: "2액션", traits: ["조작","변이"],
    summary: "동물 전투 형태로 변신합니다. 곰/고양이/원숭이/뱀/달팽이 등. 지속: 1분." },

  { name_ko: "내파", name_en: "Implosion", rank: 9, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["조작"],
    summary: "생물을 내부에서 붕괴시킵니다. 기본 인내. 대실패: 즉사. 실패: 75 피해." },

  { name_ko: "허상", name_en: "Illusory Object", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["시각","환영"],
    summary: "가짜 물체를 만듭니다. 지속: 10분. 감지 판정으로 불신 가능." },

  { name_ko: "허상 위장", name_en: "Illusory Disguise", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["시각","환영"],
    summary: "외모를 환영으로 위장합니다. 지속: 1시간. 감지 판정으로 불신 가능." },

  { name_ko: "투명화", name_en: "Invisibility", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["시각","환영"],
    summary: "접촉한 생물이 투명해집니다. 공격 시 종료. 지속: 10분." },

  { name_ko: "마법 무기", name_en: "Magic Weapon", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult"], actions: "2액션", traits: [],
    summary: "무기를 마법 무기로 만듭니다. 타격에 +1 상황 보너스. 지속: 1분." },

  { name_ko: "치료", name_en: "Heal", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["divine","primal"], actions: "1~3액션", traits: ["치유","활력"],
    summary: "생물을 치유합니다. 1행동: 접촉 1d8. 2행동: 30피트 1d8+능력치. 3행동: 발산 1d8." },

  { name_ko: "해침", name_en: "Harm", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["divine"], actions: "1~3액션", traits: ["공허"],
    summary: "공허 에너지로 해칩니다. 1행동: 접촉 1d8. 2행동: 30피트 1d8+능력치. 3행동: 발산 1d8." },

  { name_ko: "정화", name_en: "Purify Food and Drink", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["divine","primal"], actions: "2액션", traits: [],
    summary: "음식과 음료의 독과 오염을 제거합니다. 1입방 피트의 음식/음료 정화." },

  { name_ko: "고통 정화", name_en: "Remove Affliction", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult","primal"], actions: "2액션", traits: ["치유"],
    summary: "접촉한 생물의 저주/독/질병 하나를 상쇄합니다. 주문 등급으로 상쇄 시도." },

  { name_ko: "저주 해제", name_en: "Remove Curse", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult"], actions: "2액션", traits: ["치유"],
    summary: "접촉한 생물의 저주 하나를 상쇄합니다." },

  { name_ko: "부활", name_en: "Raise Dead", rank: 6, is_cantrip: false, is_focus: false,
    traditions: ["divine"], actions: "2액션", traits: ["치유"],
    summary: "죽은 지 3일 이내의 생물을 되살립니다. 대상이 배수(drained) 2 상태로 부활." },

  { name_ko: "치유의 빛", name_en: "Radiant Burst", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["divine"], actions: "2액션", traits: ["신성","빛","활력"],
    summary: "활력 에너지 폭발. 30피트 발산. 언데드에 반사 내성. 실패 시 4d10 활력 피해." },

  { name_ko: "분산", name_en: "Dispel Magic", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: [],
    summary: "마법 효과 하나를 상쇄합니다. 주문 등급으로 상쇄 체크." },

  { name_ko: "진짜 보기", name_en: "True Seeing", rank: 7, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: ["계시"],
    summary: "환영과 변신을 꿰뚫어 봅니다. 투명 생물을 볼 수 있습니다. 지속: 10분." },

  { name_ko: "텔레포트", name_en: "Teleport", rank: 6, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "3액션", traits: ["순간이동"],
    summary: "최대 5명을 같은 차원 내 알려진 위치로 순간이동. 100마일당 1% 빗나감." },

  { name_ko: "자연 동맹", name_en: "Nature's Enmity", rank: 5, is_cantrip: false, is_focus: false,
    traditions: ["primal"], actions: "2액션", traits: [],
    summary: "자연이 대상을 적으로 여깁니다. 동물/식물 등이 대상을 공격합니다. 지속: 1분." },

  { name_ko: "용기의 화살", name_en: "Dragon's Breath", rank: 3, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["변이"],
    summary: "용처럼 한 원소 피해를 뿜습니다. 30피트 원뿔 or 60피트 직선. 반사 내성. 6d6 피해." },

  { name_ko: "방호 구체", name_en: "Globe of Invulnerability", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: [],
    summary: "10피트 반경 구체. 3등급 이하 주문이 통과 불가. 지속: 1라운드(유지)." },

  { name_ko: "심문", name_en: "Command", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult"], actions: "2액션", traits: ["언어","정신"],
    summary: "한 단어 명령을 내립니다. 의지 내성. 실패 시 1라운드 동안 명령 수행." },

  { name_ko: "정신 지배", name_en: "Dominate", rank: 6, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["언어","정신"],
    summary: "생물을 완전히 지배합니다. 의지 내성. 실패 시 지배(controlled). 지속: 1일." },

  { name_ko: "부유", name_en: "Fly", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult","primal"], actions: "2액션", traits: ["조작"],
    summary: "접촉한 생물이 비행 속도 = 이동 속도를 얻습니다. 지속: 5분." },

  { name_ko: "소형화", name_en: "Shrink", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult","primal"], actions: "2액션", traits: ["조작","변이"],
    summary: "생물이나 물체를 작게 만듭니다. 1카테고리 감소. 지속: 5분." },

  { name_ko: "거대화", name_en: "Enlarge", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult","primal"], actions: "2액션", traits: ["조작","변이"],
    summary: "생물을 크게 만듭니다. 1카테고리 증가. 공격/피해에 보너스. 지속: 5분." },

  { name_ko: "유령 손", name_en: "Ghost Touch", rank: 3, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult"], actions: "2액션", traits: [],
    summary: "무기가 비물질 존재에게도 피해를 입힐 수 있게 됩니다. 지속: 1분." },

  { name_ko: "동물 소환", name_en: "Summon Animal", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "3액션", traits: ["조작"],
    summary: "동물을 소환합니다. 주문 등급 -1 이하 레벨 동물. 지속: 유지(최대 1분)." },

  { name_ko: "정령 소환", name_en: "Summon Elemental", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "3액션", traits: ["조작"],
    summary: "정령을 소환합니다. 주문 등급 -1 이하 레벨 정령. 지속: 유지(최대 1분)." },

  { name_ko: "자연 소환", name_en: "Summon Plant or Fungus", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["primal"], actions: "3액션", traits: ["조작"],
    summary: "식물 또는 균류 생물을 소환합니다. 지속: 유지(최대 1분)." },

  { name_ko: "환영 지형", name_en: "Illusory Terrain", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult","primal"], actions: "3액션", traits: ["시각","환영"],
    summary: "최대 50피트 정육면체의 지형 외관을 변경합니다. 지속: 1시간." },

  { name_ko: "그림자 마법", name_en: "Shadow Illusion", rank: 5, is_cantrip: false, is_focus: false,
    traditions: ["occult"], actions: "3액션", traits: ["환영","시각"],
    summary: "강력한 그림자 환영. 감지 판정으로 불신 시 실제 피해의 일부만." },

  { name_ko: "비행 속도", name_en: "Wind Walk", rank: 8, is_cantrip: false, is_focus: false,
    traditions: ["primal"], actions: "2액션", traits: ["조작","공기","변이"],
    summary: "최대 5 생물이 구름으로 변하여 비행 속도 +100피트. 지속: 1시간." },

  { name_ko: "석화", name_en: "Petrify", rank: 6, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "2액션", traits: ["조작","변이"],
    summary: "생물을 돌로 변화시킵니다. 인내 내성. 실패 시 석화(petrified)." },

  { name_ko: "파멸", name_en: "Wail of the Banshee", rank: 9, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult"], actions: "2액션", traits: ["청각","공포","정신","죽음"],
    summary: "밴쉬의 비명. 반응 없는 생물 즉사 위협. 인내 내성. 실패 시 죽음 확인 재시도." },

  { name_ko: "영혼 폭발", name_en: "Spirit Blast", rank: 6, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult"], actions: "2액션", traits: ["공격"],
    summary: "30피트 파동 정신 에너지. 주문 공격. 명중 시 영혼에 6d6+능력치 피해(저항 무시)." },

  { name_ko: "영혼 연결", name_en: "Spirit Link", rank: 1, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult","primal"], actions: "2액션", traits: ["치유"],
    summary: "아군과 영혼 연결. 아군이 피해를 받으면 일부가 당신에게 전이. 지속: 1분." },

  { name_ko: "영적 무장", name_en: "Spiritual Armament", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult"], actions: "2액션", traits: ["조작"],
    summary: "영적 무기를 만들어 자율 공격. 매 턴 추가 공격. 지속: 유지(최대 1분)." },

  { name_ko: "영적 무기", name_en: "Spiritual Weapon", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult"], actions: "2액션", traits: ["조작"],
    summary: "마법 무기가 허공에 나타나 공격합니다. 주문 공격 굴림. 지속: 유지(최대 1분)." },

  { name_ko: "영적 진사", name_en: "Spiritual Guardian", rank: 5, is_cantrip: false, is_focus: false,
    traditions: ["divine"], actions: "2액션", traits: ["조작"],
    summary: "신의 수호자가 나타나 아군을 보호합니다. 공격 차단 가능. 지속: 유지(최대 1분)." },

  { name_ko: "지진", name_en: "Earthquake", rank: 8, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","primal"], actions: "3액션", traits: ["대지"],
    summary: "60피트 반경 지진. 지형 붕괴, 넘어뜨려짐, 균열 등. 지속: 1라운드." },

  { name_ko: "시간 정지", name_en: "Time Stop", rank: 10, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "3액션", traits: [],
    summary: "시간을 1d4+1 라운드 동안 정지시킵니다. 이 시간 동안 자유롭게 행동 가능." },

  { name_ko: "기상 제어", name_en: "Control Weather", rank: 8, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","primal"], actions: "3액션", traits: [],
    summary: "2마일 반경 날씨를 변경합니다. 효과는 4d12시간 지속." },

  { name_ko: "차원 이동", name_en: "Plane Shift", rank: 7, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "3액션", traits: ["순간이동"],
    summary: "다른 차원으로 이동합니다. 최대 8명 동반. 정확도에 주사위 굴림." },

  { name_ko: "질병 치료", name_en: "Remove Disease", rank: 3, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult","primal"], actions: "2액션", traits: ["치유"],
    summary: "접촉한 생물의 질병 하나를 상쇄합니다." },

  { name_ko: "회복", name_en: "Restoration", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult","primal"], actions: "2액션", traits: ["치유"],
    summary: "피로/독/저주 등의 상태를 줄여줍니다. 배수(drained)나 약화(enfeebled) 1 감소." },

  { name_ko: "집단 치유", name_en: "Mass Heal", rank: 10, is_cantrip: false, is_focus: false,
    traditions: ["divine"], actions: "3액션", traits: ["치유","활력"],
    summary: "30피트 발산 생물 모두. 10d10 활력 치유(아군) 또는 피해(언데드). 반사 내성." },

  { name_ko: "사령 변신", name_en: "Lich Form", rank: 9, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult"], actions: "2액션", traits: ["조작","변이"],
    summary: "일시적으로 리치의 형태를 취합니다. 많은 면역 및 이동 속도 획득." },

  { name_ko: "그림자 보행", name_en: "Shadow Walk", rank: 5, is_cantrip: false, is_focus: false,
    traditions: ["occult"], actions: "3액션", traits: ["암흑","순간이동"],
    summary: "그림자 차원을 통해 이동합니다. 9명 이동, 1마일당 1분. 빠른 여행 가능." },

  { name_ko: "강철 바람", name_en: "Steel Wind Strike", rank: 5, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "3액션", traits: ["조작"],
    summary: "최대 5 대상에게 빠른 연속 타격. 주문 공격 굴림. 4d8+능력치 참격 피해." },

  { name_ko: "돌 벽", name_en: "Wall of Stone", rank: 5, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "3액션", traits: ["대지","조작"],
    summary: "석조 벽을 만듭니다. 20피트 길이, 20피트 높이, 1피트 두께. 이후 영구." },

  { name_ko: "화염 벽", name_en: "Wall of Fire", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "3액션", traits: ["화염","조작"],
    summary: "화염 벽을 만듭니다. 통과 시 4d6 화염 피해. 지속: 유지(최대 1분)." },

  { name_ko: "산성 비", name_en: "Acid Rain", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "3액션", traits: ["산성","환경"],
    summary: "20피트 폭발에 산성 비. 4d8 산성 피해(반사). 1라운드 지속 피해. 지속: 유지." },

  { name_ko: "얼음 폭풍", name_en: "Blizzard", rank: 5, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "3액션", traits: ["냉기","환경"],
    summary: "50피트 폭발 눈보라. 2d8 냉기+은폐+험지. 지속: 1분." },

  { name_ko: "연기 구름", name_en: "Obscuring Mist", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","primal"], actions: "3액션", traits: ["수증기"],
    summary: "20피트 폭발 안개. 은폐 제공. 지속: 1분." },

  { name_ko: "마법 침묵", name_en: "Silence", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["divine","occult","primal"], actions: "2액션", traits: ["음파"],
    summary: "10피트 폭발 침묵 구역. 청각 효과와 음파 피해 차단. 지속: 1분." },

  { name_ko: "비행 선박", name_en: "Aerial Vessel", rank: 5, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "3액션", traits: ["조작","공기"],
    summary: "공중 선박을 만듭니다. 10명 탑승. 비행 속도 40피트. 지속: 1시간." },

  { name_ko: "홀로 이동", name_en: "Blink", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["순간이동"],
    summary: "반에테르 상태로 존재합니다. 매 턴 시작 시 50%확률로 에테르로 전이. 지속: 1분." },

  { name_ko: "속박", name_en: "Bind", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: ["조작"],
    summary: "생물을 마법 속박으로 잡습니다. 인내 내성. 실패 시 억제(restrained). 지속: 1분." },

  { name_ko: "그림자 손길", name_en: "Shadow Touch", rank: 4, is_cantrip: false, is_focus: false,
    traditions: ["occult"], actions: "2액션", traits: ["어둠","조작"],
    summary: "접촉 공격. 명중 시 4d6 공허 피해+은폐 상태(1라운드)." },

  { name_ko: "연회 환영", name_en: "Feast of Ashes", rank: 2, is_cantrip: false, is_focus: false,
    traditions: ["arcane","divine","occult","primal"], actions: "2액션", traits: ["저주","조작"],
    summary: "저주를 걸어 먹어도 포만감을 느끼지 못합니다. 영구 지속. 상쇄 가능." },

  { name_ko: "영원의 손길", name_en: "Mariner's Curse", rank: 5, is_cantrip: false, is_focus: false,
    traditions: ["arcane","occult"], actions: "2액션", traits: ["저주","조작"],
    summary: "영원히 안개 속을 떠도는 저주. 피로 누적 등 영구 효과." },

  // ─── BARD FOCUS SPELLS (작곡/Compositions) ─────────────────────

  // ─── 작곡 캔트립 (집중점 소비 없음, is_focus: true, is_cantrip: true)

  { name_ko: "용기의 찬가", name_en: "Courageous Anthem", rank: 1, is_cantrip: true, is_focus: true,
    traditions: ["occult"], actions: "1액션", traits: ["청각","바드","캔트립","작곡","감정","정신"],
    summary: "발산 내 아군이 공격 굴림, 피해 굴림, 공포 내성에 +1 상태 보너스." },

  { name_ko: "죽음의 디르지", name_en: "Dirge of Doom", rank: 3, is_cantrip: true, is_focus: true,
    traditions: ["occult"], actions: "1액션", traits: ["청각","바드","캔트립","작곡","감정","공포","정신"],
    summary: "30피트 발산 내 적이 공포(frightened) 1이 됩니다. 면역 무시." },

  { name_ko: "집결의 찬가", name_en: "Rallying Anthem", rank: 2, is_cantrip: true, is_focus: true,
    traditions: ["occult"], actions: "1액션", traits: ["청각","바드","캔트립","작곡","감정","정신"],
    summary: "발산 내 아군이 AC와 내성 굴림에 +1 상태 보너스." },

  { name_ko: "알레그로", name_en: "Allegro", rank: 7, is_cantrip: true, is_focus: true,
    traditions: ["occult"], actions: "1액션", traits: ["청각","바드","캔트립","작곡"],
    summary: "아군 1명이 이동 속도에 +10피트 상태 보너스." },

  { name_ko: "행군의 노래", name_en: "Song of Marching", rank: 3, is_cantrip: true, is_focus: true,
    traditions: ["occult"], actions: "1액션", traits: ["청각","바드","캔트립","작곡"],
    summary: "탐험 중 아군의 여행 이동 속도에 +10피트 상태 보너스. 피로 지연." },

  { name_ko: "힘의 노래", name_en: "Song of Strength", rank: 3, is_cantrip: true, is_focus: true,
    traditions: ["occult"], actions: "1액션", traits: ["청각","바드","캔트립","작곡","감정","정신"],
    summary: "발산 내 아군이 운동 판정과 피해 굴림에 +1 상태 보너스." },

  { name_ko: "삼박자", name_en: "Triple Time", rank: 3, is_cantrip: true, is_focus: true,
    traditions: ["occult"], actions: "1액션", traits: ["청각","바드","캔트립","작곡"],
    summary: "발산 내 아군이 이동 속도에 +10피트 상태 보너스." },

  { name_ko: "고양의 서곡", name_en: "Uplifting Overture", rank: 1, is_cantrip: true, is_focus: true,
    traditions: ["occult"], actions: "1액션", traits: ["청각","바드","캔트립","작곡","감정","정신"],
    summary: "아군 1명이 다음 의지 내성 굴림에 +1 상태 보너스." },

  // ─── 집중 주문(집중점 소비, is_focus: true, is_cantrip: false)

  { name_ko: "작곡 연장", name_en: "Lingering Composition", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["occult"], actions: "자유행동", traits: ["바드","집중"],
    summary: "작곡 캔트립 직전 유발. 공연 판정으로 지속 시간을 3~4라운드로 연장." },

  { name_ko: "대항 공연", name_en: "Counter Performance", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["occult"], actions: "반응", traits: ["바드","작곡","집중","행운","정신"],
    summary: "아군의 청각/시각 효과 내성 시 공연 판정으로 보호. 높은 결과 사용." },

  { name_ko: "치명적 아리아", name_en: "Fatal Aria", rank: 10, is_cantrip: false, is_focus: true,
    traditions: ["occult"], actions: "1액션", traits: ["바드","작곡","집중","죽음","감정","정신"],
    summary: "완벽한 음악으로 16레벨 이하 즉사 위협. 17레벨: HP 50 이하면 즉사." },

  { name_ko: "포르티시모 작곡", name_en: "Fortissimo Composition", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["occult"], actions: "자유행동", traits: ["바드","집중","주문형성"],
    summary: "거장 뮤즈. 용기/집결/힘의 찬가 보너스를 공연 판정에 따라 +2~+3으로 증가." },

  { name_ko: "대가의 에튀드", name_en: "Loremaster's Etude", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["occult"], actions: "자유행동", traits: ["바드","집중","행운","조작"],
    summary: "수수께끼 뮤즈. 지식 회상 판정을 두 번 굴려 높은 것을 사용." },

  { name_ko: "우로보로스의 송가", name_en: "Ode to Ouroboros", rank: 5, is_cantrip: false, is_focus: true,
    traditions: ["occult"], actions: "반응", traits: ["바드","작곡","집중"],
    summary: "생물의 빈사 수치가 사망 수치에 도달할 때 유발. 빈사 수치를 사망 수치보다 1 낮게 유지." },

  { name_ko: "유혹의 피리", name_en: "Pied Piping", rank: 10, is_cantrip: false, is_focus: true,
    traditions: ["occult"], actions: "2액션", traits: ["바드","작곡","집중","무력화","정신","음파"],
    summary: "청취자를 황홀하게 만들어 따라오게 합니다. 의지 내성. 실패 시 매혹+이동." },

  { name_ko: "진정의 발라드", name_en: "Soothing Ballad", rank: 7, is_cantrip: false, is_focus: true,
    traditions: ["occult"], actions: "2액션", traits: ["바드","작곡","집중","감정","치유","조작","정신"],
    summary: "최대 10 아군을 치유. 공포/마비 상쇄 또는 7d8 HP 회복 중 선택." },

  { name_ko: "자유로운 심장의 교향곡", name_en: "Symphony of the Unfettered Heart", rank: 5, is_cantrip: false, is_focus: true,
    traditions: ["occult"], actions: "2액션", traits: ["바드","작곡","집중"],
    summary: "공연 판정으로 조이기/마비/억제 등 이동 방해 상태 하나를 상쇄." },

  // ─── CLERIC FOCUS SPELLS (영역 주문/Domain Spells) ──────────────

  { name_ko: "밀어내는 돌풍", name_en: "Pushing Gust", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["공기","클레릭","집중","조작"],
    summary: "강력한 돌풍으로 대상을 밀어냅니다. 인내 실패 시 10피트 밀려남." },

  { name_ko: "공기로 분산", name_en: "Disperse into Air", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "반응", traits: ["공기","클레릭","집중","조작","변이"],
    summary: "피해를 받을 때 반응으로 공기로 변해 피해 면역+60피트 비행 이동." },

  { name_ko: "군중 속의 얼굴", name_en: "Face in the Crowd", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","조작","시각"],
    summary: "군중 속에서 눈에 띄지 않게 됩니다. 기만/은신에 +2 상태 보너스. 지속: 1분." },

  { name_ko: "문명의 맥박", name_en: "Pulse of Civilization", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","조작"],
    summary: "60피트 발산 내 험지가 정상 지형이 되고 아군 이동 속도 +10피트. 유지." },

  { name_ko: "자신감의 장막", name_en: "Veil of Confidence", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","감정","정신"],
    summary: "피해 굴림에 +1 보너스. 성공을 대성공으로(1회), 적의 성공을 실패로(1회). 지속: 1분." },

  { name_ko: "망상적 자만", name_en: "Delusional Pride", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","감정","정신"],
    summary: "과도한 자신감으로 방어를 낮추게 합니다. 의지 실패 시 AC/내성 보너스를 적용하지 않음." },

  { name_ko: "창의적 물감", name_en: "Creative Splash", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","조작"],
    summary: "마법 물감 뿌려 눈부심. 1d6 피해+실패 시 눈부심 1라운드." },

  { name_ko: "예술적 장식", name_en: "Artistic Flourish", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","조작"],
    summary: "물체에 마법 예술 장식 추가. 사회 판정에 +2 상황 보너스. 지속: 10분." },

  { name_ko: "어둠의 시야", name_en: "Darkened Sight", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["어둠","클레릭","집중"],
    summary: "대상의 시야를 어둡게. 인내 실패 시 눈부심. 대실패 시 눈멈." },

  { name_ko: "파괴의 울부짖음", name_en: "Cry of Destruction", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","조작","음파"],
    summary: "15피트 원뿔 파괴적 음파. 기본 인내. 1d8 음파 피해." },

  { name_ko: "파괴적 기운", name_en: "Destructive Aura", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중"],
    summary: "15피트 발산 내 아군의 타격에 추가 1d6 피해. 지속: 1분." },

  { name_ko: "대지 공사", name_en: "Earthworks", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["대지","클레릭","집중","조작"],
    summary: "대지를 솟구치게 하거나 함몰. 10피트 정육면체를 험지로 만들거나 험지를 해제." },

  { name_ko: "국지 지진", name_en: "Localized Quake", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["대지","클레릭","집중","조작"],
    summary: "15피트 발산 국지 지진. 반사 실패 시 넘어짐+4d6 둔기 피해." },

  { name_ko: "가족 회복", name_en: "Community Restoration", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","치유","조작"],
    summary: "최대 4 동의 생물 각각의 상태 하나를 상쇄합니다." },

  { name_ko: "화염 광선", name_en: "Fire Ray", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","화염","조작"],
    summary: "주문 공격 굴림. 2d6 화염 피해. 치명 시 1d4 지속 화염 피해." },

  { name_ko: "화염 장벽", name_en: "Flame Barrier", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "반응", traits: ["클레릭","집중"],
    summary: "아군이 받을 화염 피해를 최대 15 감소. 유발: 아군이 화염 피해 받을 때." },

  { name_ko: "자유의 말씀", name_en: "Word of Freedom", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중"],
    summary: "대상을 조이기/이동불가/마비/억제 중 하나에서 해방. 다음 턴까지 +4 상태 보너스." },

  { name_ko: "방종의 풍요", name_en: "Overstuff", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","조작"],
    summary: "과식 유발. 인내 실패 시 구역질(sickened) 1. 대실패 시 구역질 2." },

  { name_ko: "축제의 뿔피리", name_en: "Cornucopia", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","조작","식물"],
    summary: "10피트 폭발. 영역 내 아군이 1d4+4 HP 회복+하루 영양분 섭취." },

  { name_ko: "지식의 회상", name_en: "Scholarly Recollection", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "반응", traits: ["클레릭","집중","행운"],
    summary: "아군의 지식 회상 판정을 두 번 굴려 높은 것 사용. 유발: 지식 회상 판정 시도 전." },

  { name_ko: "행운의 한 조각", name_en: "Bit of Luck", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","행운"],
    summary: "대상의 다음 판정에서 d20을 두 번 굴려 높은 것 사용. 지속: 1라운드." },

  { name_ko: "행운의 기회", name_en: "Lucky Break", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "반응", traits: ["클레릭","집중","행운"],
    summary: "내성 실패 시 유발. 실패한 내성 굴림을 다시 굴립니다." },

  { name_ko: "야심 점화", name_en: "Ignite Ambition", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "반응", traits: ["클레릭","집중","감정","정신","은밀"],
    summary: "정신 효과로 설득 시도 유발. 대상 야심 강화하여 설득 방어에 -1 상태 페널티." },

  { name_ko: "경쟁심", name_en: "Competitive Edge", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","감정","정신"],
    summary: "공격/기술 판정에 +1 상태 보너스. 근처 적 대성공 시 +3으로 증가. 유지." },

  { name_ko: "고통 음미", name_en: "Savor the Sting", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","정신"],
    summary: "접촉. 1d4 정신 피해. 의지 실패 시 당신이 같은 양의 임시 HP를 얻음." },

  { name_ko: "보복의 고통", name_en: "Retributive Pain", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "반응", traits: ["클레릭","집중","정신"],
    summary: "아군이 피해받을 때 유발. 적에게 4d6 정신 피해(인내 절반). 대실패 시 느려짐 1." },

  { name_ko: "열정의 유혹", name_en: "Captivating Adoration", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","감정","조작","정신","시각"],
    summary: "15피트 발산. 들어오는 적이 의지 실패 시 매혹(fascinated). 지속: 1분." },

  { name_ko: "보호의 수호", name_en: "Protective Wards", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중"],
    summary: "15피트 발산 내 아군이 내성 굴림에 +1 상태 보너스. 유지." },

  { name_ko: "비밀 수호", name_en: "Safeguard Secret", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","정신"],
    summary: "최대 4 생물이 지정 비밀 거짓말에 +4 상태 보너스. 정신 탐사도 보호. 지속: 1시간." },

  { name_ko: "달빛", name_en: "Moonbeam", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","공격","집중","화염","빛","조작"],
    summary: "집중 달빛 광선. 주문 공격. 1d6 화염 피해. 변이 대상 상쇄 시도." },

  { name_ko: "달의 접촉", name_en: "Touch of the Moon", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","빛","조작"],
    summary: "달의 에너지 부여. 암시야 획득 또는 상위 암시야. 빛 발산 선택 가능. 지속: 1분." },

  { name_ko: "진실의 말씀", name_en: "Word of Truth", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중"],
    summary: "지속 시간 동안 거짓말 불가. 기만 감지 판정에 +4 상태 보너스. 지속: 1라운드." },

  { name_ko: "민첩한 발", name_en: "Agile Feet", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","조작"],
    summary: "이동 속도 +5피트+험지 무시. 이동 행동 하나를 시전과 함께 가능. 턴 종료까지." },

  { name_ko: "운동 돌진", name_en: "Athletic Rush", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","조작"],
    summary: "이동 속도 +10피트+운동 판정에 +2 상태 보너스. 이동 행동 하나 가능. 지속: 1라운드." },

  { name_ko: "피의 수호", name_en: "Blood Ward", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","조작"],
    summary: "접촉. 대상이 언데드에 대해 AC와 내성에 +1 상태 보너스. 지속: 1분." },

  { name_ko: "눈부신 섬광", name_en: "Dazzling Flash", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","빛","조작","시각"],
    summary: "15피트 원뿔 눈부신 빛. 인내 실패 시 눈멈 1라운드+눈부심 1분." },

  { name_ko: "정령의 배신", name_en: "Elemental Betrayal", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중"],
    summary: "30피트 발산 내 적이 정령 특질 효과에 추가 2 피해. 유지." },

  { name_ko: "투석", name_en: "Hurtling Stone", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["대지","클레릭","집중","조작"],
    summary: "60피트 사거리 돌 발사. 주문 공격 굴림. 1d6 둔기 피해." },

  { name_ko: "완벽한 정신", name_en: "Perfected Mind", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중"],
    summary: "현재 정신 효과 하나에 대해 새로운 의지 내성 시도. 결과가 나쁘면 변화 없음." },

  { name_ko: "운명 읽기", name_en: "Read Fate", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","예언"],
    summary: "대상의 가까운 미래에 대한 예감. 이번 조우에서 판정 하나에 d4 추가(1회)." },

  { name_ko: "몸 뒤섞기", name_en: "Scramble Body", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","조작","공허"],
    summary: "공허 에너지로 몸 뒤섞기. 1d4 공허 피해. 인내 실패 시 서투름(clumsy) 1." },

  { name_ko: "달래는 말", name_en: "Soothing Words", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","감정","정신"],
    summary: "대상의 공포 수치 1 감소. 정신 효과 다음 내성에 +1 상태 보너스. 지속: 1라운드." },

  { name_ko: "돌발 전환", name_en: "Sudden Shift", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "반응", traits: ["클레릭","집중","조작"],
    summary: "근접 공격 빗나가면 유발. 한 걸음(Step)+은폐(concealed) 상태. 다음 턴까지." },

  { name_ko: "달콤한 꿈", name_en: "Sweet Dream", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "3액션", traits: ["클레릭","집중","정신"],
    summary: "잠든 동의 생물 보호. 악몽/정신 방해 면역+1d8 HP 회복. 지속: 10분." },

  { name_ko: "조류 파도", name_en: "Tidal Surge", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","조작","물"],
    summary: "물의 파도로 밀어냄. 인내 실패 시 5피트. 대실패 시 10피트+넘어짐." },

  { name_ko: "복종의 접촉", name_en: "Touch of Obedience", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","조작","정신"],
    summary: "의지력 침식. 성공: 멍청함 1(다음 턴). 실패: 멍청함 2. 대실패: 멍청함 2(1분)." },

  { name_ko: "언데드의 접촉", name_en: "Touch of Undeath", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","조작","공허"],
    summary: "접촉. 1d6 공허 피해. 인내 실패 시 약화(enfeebled) 1." },

  { name_ko: "무기 강화", name_en: "Weapon Surge", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","조작"],
    summary: "무기에 신성한 에너지 부여. 다음 타격에 추가 1d6 피해. 지속: 1라운드." },

  { name_ko: "속삭이는 고요", name_en: "Whispering Quiet", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","조작","음파"],
    summary: "15피트 폭발 침묵 구역. 5피트 이상 떨어진 생물은 내부 목소리 못 들음. 지속: 1분." },

  { name_ko: "폭포", name_en: "Downpour", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","조작","물"],
    summary: "30피트 폭발 폭우. 은폐 제공+비마법 화염 소화+화염 주문 피해 절반. 지속: 1분." },

  { name_ko: "에너지 흡수", name_en: "Energy Absorption", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "반응", traits: ["클레릭","집중"],
    summary: "에너지 피해 최대 30 감소. 감소량을 다음 공격의 추가 피해로 사용 가능." },

  { name_ko: "언데드 근절", name_en: "Eradicate Undeath", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","활력"],
    summary: "30피트 원뿔 활력 파동. 언데드에만 4d12 활력 피해(기본 인내)." },

  { name_ko: "진실의 일별", name_en: "Glimpse the Truth", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","예언","탐지"],
    summary: "30피트 발산. 환영 불신 시도(+2 보너스)+변신 생물의 진짜 형태 파악. 지속: 1라운드." },

  { name_ko: "악성 자양분", name_en: "Malignant Sustenance", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","공허"],
    summary: "언데드 하나에 빠른 치유(fast healing) 5 부여. 지속: 1분." },

  { name_ko: "신비의 등대", name_en: "Mystic Beacon", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","조작"],
    summary: "대상의 다음 피해/치유 주문을 1등급 높은 것처럼 적용. 주문 시전 후 종료." },

  { name_ko: "완벽한 몸", name_en: "Perfected Body", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "반응", traits: ["클레릭","집중"],
    summary: "변형/독 등 특정 효과 내성 대실패를 실패로, 실패를 성공으로 변경." },

  { name_ko: "귀금속", name_en: "Precious Metals", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","조작"],
    summary: "금속 무기를 냉철(cold iron) 또는 은(silver)으로 변환. 지속: 1분." },

  { name_ko: "죽음의 거부", name_en: "Rebuke Death", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","치유","활력"],
    summary: "0 HP인 대상에 4d6 HP 회복. 사거리: 20피트." },

  { name_ko: "변형", name_en: "Shifting Form", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","변형"],
    summary: "등반 속도/수영 속도/암시야/도달 +5피트 중 하나 선택. 지속: 1분." },

  { name_ko: "공포의 나선", name_en: "Spiral of Horrors", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","감정","공포","환영","정신"],
    summary: "의지 실패 시 공포 2+4d6 정신 피해. 유지 시 재피해(2d6). 지속: 유지." },

  { name_ko: "경과 관찰", name_en: "Take Its Course", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "2액션", traits: ["클레릭","집중","조작"],
    summary: "질병/독 진행을 서두르게 합니다. 즉시 다음 내성 시도. +2 또는 -2 선택 가능." },

  { name_ko: "활력의 빛", name_en: "Vital Luminance", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "1액션", traits: ["클레릭","집중","빛","조작","활력"],
    summary: "30피트 밝은 빛. 저장소 누적(매 턴 +4). 언데드 공격 시 저장소 절반 활력 피해. 지속: 1분." },

  { name_ko: "전투 열정", name_en: "Zeal for Battle", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["divine"], actions: "반응", traits: ["클레릭","집중","감정","정신"],
    summary: "선제력 굴림 유발. 10피트 발산 내 아군 선제력에 +2 보너스. 최고 선제력 아군이 가속." },

  // ─── DRUID FOCUS SPELLS (결사 주문/Order Spells) ─────────────────

  { name_ko: "야생 변신", name_en: "Wild Shape", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "2액션", traits: ["드루이드","집중","조작","변이"],
    summary: "변이 전투 형태로 변신합니다. 해충 형태(1시간) 또는 알고 있는 변이 형태. 지속: 1분." },

  { name_ko: "야생의 말", name_en: "Wilding Word", rank: 1, is_cantrip: true, is_focus: true,
    traditions: ["primal"], actions: "1액션", traits: ["드루이드","캔트립"],
    summary: "동물/식물에게 기본적인 의도(위험/안전/먹이 등)를 전달. 사거리: 30피트." },

  { name_ko: "폭풍 군주", name_en: "Tempest Surge", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "2액션", traits: ["공기","드루이드","전기","집중","조작"],
    summary: "번개 공격. 1d12 전기 피해. 반사 실패 시 서투름(clumsy) 2(1라운드)." },

  { name_ko: "선의 씨앗", name_en: "Goodberry", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "2액션", traits: ["드루이드","집중","치유","조작","식물","활력"],
    summary: "열매에 치유 에너지 부여. 먹으면 1d6+4 HP 회복+하루 영양분. 지속: 10분." },

  { name_ko: "가시 꿰뚫기", name_en: "Impaling Briars", rank: 8, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "2액션", traits: ["드루이드","집중","조작","식물"],
    summary: "100피트 발산 가시 나무. 험지. 유지 시 영역 내 적에 10d6 관통 피해(기본 반사)." },

  { name_ko: "달의 광란", name_en: "Moon Frenzy", rank: 5, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "2액션", traits: ["드루이드","집중","변형","식물"],
    summary: "변이 전투 형태 중 대상에 +2 공격 보너스+추가 피해 5+임시 HP 10. 지속: 1분." },

  { name_ko: "야생 해방", name_en: "Untamed Form", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "1액션", traits: ["드루이드","집중","변형"],
    summary: "비무장 공격에 +1 상태 보너스+마법 특질 부여. 지속: 1라운드." },

  { name_ko: "생명 충전", name_en: "Life Boost", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "1액션", traits: ["드루이드","집중","치유","활력"],
    summary: "대상에 임시 HP = 주문 등급×2 부여. 지속: 1분." },

  { name_ko: "활기찬 가시", name_en: "Vibrant Thorns", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "1액션", traits: ["드루이드","집중","변형","식물"],
    summary: "몸에 가시 성장. 비무장 타격에 1d6 관통 피해 추가. 조이기 시도 적에 가시 피해. 지속: 1분." },

  // ─── RANGER FOCUS SPELLS ─────────────────────────────────────────

  { name_ko: "중력의 무기", name_en: "Gravity Weapon", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "1액션", traits: ["집중","레인저"],
    summary: "이 턴 첫 번째 명중 타격에 추가 1d6 피해. 지속: 1라운드." },

  { name_ko: "마법 독", name_en: "Magic Hide", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "1액션", traits: ["집중","레인저"],
    summary: "동물 동료의 가죽을 마법으로 강화. AC에 +2 상태 보너스. 지속: 1분." },

  { name_ko: "흔적 없는 이동", name_en: "Vanishing Tracks", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "1액션", traits: ["집중","레인저"],
    summary: "아군의 발자국/흔적 제거. 추적 DC +4 증가. 지속: 1시간." },

  { name_ko: "방해 없는 보폭", name_en: "Unimpeded Stride", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "1액션", traits: ["집중","레인저"],
    summary: "비마법적 험지 무시. 극심 험지를 일반 험지로 취급. 지속: 1분." },

  { name_ko: "적 파악", name_en: "Know the Enemy", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["primal"], actions: "자유행동", traits: ["집중","레인저"],
    summary: "선제력 굴림 유발. 지식 회상 시도. 성공 시 약점/저항/면역 중 하나 파악." },

  // ─── WITCH FOCUS SPELLS ──────────────────────────────────────────

  { name_ko: "사악한 눈", name_en: "Evil Eye", rank: 1, is_cantrip: true, is_focus: true,
    traditions: [], actions: "1액션", traits: ["캔트립","집중","위치","저주","감정","공포","정신"],
    summary: "저주의 눈으로 응시. 의지 실패 시 공포(frightened) 1. 대실패 시 공포 2. 면역 무시." },

  { name_ko: "비밀 간파", name_en: "Discern Secrets", rank: 1, is_cantrip: true, is_focus: true,
    traditions: [], actions: "1액션", traits: ["캔트립","집중","위치","예언","정신"],
    summary: "아군 1명이 다음 감지/사회/기만 판정에 +1 상태 보너스. 지속: 1라운드." },

  { name_ko: "달라붙는 얼음", name_en: "Clinging Ice", rank: 1, is_cantrip: true, is_focus: true,
    traditions: [], actions: "1액션", traits: ["캔트립","냉기","집중","위치"],
    summary: "서리가 달라붙음. 1d4 냉기 피해(반사). 실패 시 이동 속도 -5피트(1라운드)." },

  { name_ko: "운명 조정", name_en: "Nudge Fate", rank: 1, is_cantrip: true, is_focus: true,
    traditions: [], actions: "1액션", traits: ["캔트립","집중","위치","예언"],
    summary: "대상의 다음 공격/기술/내성 굴림에 +1 상태 보너스. 지속: 1라운드." },

  { name_ko: "밤의 장막", name_en: "Shroud of Night", rank: 1, is_cantrip: true, is_focus: true,
    traditions: [], actions: "1액션", traits: ["캔트립","어둠","집중","위치"],
    summary: "시야 방해. 의지 실패 시 눈부심(dazzled)(1라운드). 대실패 시 눈부심(1분)." },

  { name_ko: "심장 격려", name_en: "Stoke the Heart", rank: 1, is_cantrip: true, is_focus: true,
    traditions: [], actions: "1액션", traits: ["캔트립","집중","감정","위치"],
    summary: "아군 1명이 피해 굴림에 +2 상태 보너스. 지속: 1라운드." },

  { name_ko: "킥킥", name_en: "Cackle", rank: 1, is_cantrip: false, is_focus: true,
    traditions: [], actions: "자유행동", traits: ["위치","집중"],
    summary: "악랄한 웃음으로 유지 중인 주문을 자유 행동으로 유지합니다. 1개 주문." },

  { name_ko: "사역마 위상", name_en: "Phase Familiar", rank: 1, is_cantrip: false, is_focus: true,
    traditions: [], actions: "반응", traits: ["위치","집중"],
    summary: "사역마가 피해를 받으려 할 때 유발. 에테르로 이동하여 피해 완전 무시." },

  { name_ko: "복수의 바늘", name_en: "Needle of Vengeance", rank: 1, is_cantrip: false, is_focus: true,
    traditions: [], actions: "반응", traits: ["위치","집중","정신"],
    summary: "적이 아군에 피해를 줄 때 유발. 대상의 다음 공격 시도 시 2d6 정신 피해." },

  // ─── WIZARD FOCUS SPELLS ─────────────────────────────────────────

  { name_ko: "환영의 벽집", name_en: "House of Imaginary Walls", rank: 5, is_cantrip: true, is_focus: true,
    traditions: ["arcane"], actions: "1액션", traits: ["캔트립","집중","환영","조작","시각","위자드"],
    summary: "10피트×10피트 가상의 벽. 불신하지 않은 생물은 통과 불가. 지속: 1라운드." },

  { name_ko: "힘의 손", name_en: "Hand of the Apprentice", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["arcane"], actions: "1액션", traits: ["집중","위자드"],
    summary: "근접 무기를 500피트 사거리로 발사. 주문 공격 굴림. 무기 피해+지능 수정치." },

  { name_ko: "힘의 화살", name_en: "Force Bolt", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["arcane"], actions: "1액션", traits: ["힘","집중","위자드"],
    summary: "자동 명중. 1d4+1 힘 피해. 30피트 사거리." },

  { name_ko: "학제간 주문", name_en: "Interdisciplinary Incantation", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["arcane"], actions: "2액션", traits: ["집중","위자드"],
    summary: "다른 전통의 1-3등급 주문 하나를 비전 주문으로 시전." },

  { name_ko: "소환 강화", name_en: "Fortify Summoning", rank: 1, is_cantrip: false, is_focus: true,
    traditions: ["arcane"], actions: "1액션", traits: ["집중","위자드"],
    summary: "이 턴 소환 주문의 소환 생물이 10 임시 HP+공격에 +1 상태 보너스. 지속: 1라운드." },

  { name_ko: "감시의 룬", name_en: "Rune of Observation", rank: 4, is_cantrip: false, is_focus: true,
    traditions: ["arcane"], actions: "2액션", traits: ["집중","위자드","탐지","조작"],
    summary: "표면에 감시 룬. 30피트 이내의 모든 것을 당신의 감각으로 인지. 지속: 다음 일일 준비까지." },

];
