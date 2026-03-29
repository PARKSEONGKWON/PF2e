#!/usr/bin/env python3
"""
PF2e DB 관리 도구
- export: JS DB → Excel (.xlsx)
- import: Excel (.xlsx) → JS DB

사용법:
  python3 db_tools.py export          # DB → Excel 내보내기
  python3 db_tools.py import          # Excel → DB 가져오기
  python3 db_tools.py import --dry    # 미리보기 (파일 변경 없음)
"""

import sys, os, json, re, subprocess
from pathlib import Path

try:
    import openpyxl
    from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
except ImportError:
    print("openpyxl 필요: pip3 install openpyxl")
    sys.exit(1)

SCRIPT_DIR = Path(__file__).parent
EXCEL_FILE = SCRIPT_DIR / "PF2e_DB.xlsx"
JSON_CACHE = SCRIPT_DIR / "_db_cache.json"

# ═══════════════════════════════════════
#  JS ↔ JSON 변환
# ═══════════════════════════════════════

def load_dbs_via_node():
    """Node.js로 JS DB 파일을 eval해서 JSON 캐시 생성"""
    result = subprocess.run(['node', str(SCRIPT_DIR / 'db_export.js')],
                          capture_output=True, text=True, cwd=str(SCRIPT_DIR))
    if result.returncode != 0:
        print(f"❌ Node.js 실행 실패:\n{result.stderr}")
        sys.exit(1)
    print(result.stdout.strip())
    return json.loads(JSON_CACHE.read_text(encoding='utf-8'))


def array_to_js(var_name, data, fields, declaration='const'):
    """배열 데이터를 JS 코드로 변환"""
    lines = []
    for item in data:
        parts = []
        for f in fields:
            val = item.get(f)
            if val is None:
                parts.append(f"{f}:null")
            elif isinstance(val, bool):
                parts.append(f"{f}:{'true' if val else 'false'}")
            elif isinstance(val, (int, float)):
                if val == int(val):
                    parts.append(f"{f}:{int(val)}")
                else:
                    parts.append(f"{f}:{val}")
            elif isinstance(val, list):
                inner = ','.join(f"'{v}'" for v in val)
                parts.append(f"{f}:[{inner}]")
            else:
                escaped = str(val).replace("\\", "\\\\").replace("'", "\\'")
                parts.append(f"{f}:'{escaped}'")
        lines.append('  {' + ', '.join(parts) + '},')
    return f"{declaration} {var_name} = [\n" + '\n'.join(lines) + "\n];"


# ═══════════════════════════════════════
#  EXPORT: JS → Excel
# ═══════════════════════════════════════

HEADER_FILL = PatternFill(start_color="1a2332", end_color="1a2332", fill_type="solid")
HEADER_FONT = Font(color="e67e22", bold=True, size=11)
CELL_FONT = Font(color="333333", size=10)

def write_sheet(wb, sheet_name, data, fields):
    ws = wb.create_sheet(sheet_name)
    for col, f in enumerate(fields, 1):
        cell = ws.cell(row=1, column=col, value=f)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = Alignment(horizontal='center')
    for row_idx, item in enumerate(data, 2):
        for col, f in enumerate(fields, 1):
            val = item.get(f)
            if isinstance(val, list):
                val = ', '.join(str(v) for v in val)
            elif isinstance(val, bool):
                val = 'TRUE' if val else 'FALSE'
            ws.cell(row=row_idx, column=col, value=val).font = CELL_FONT
    # Auto-width
    for col in range(1, len(fields)+1):
        letter = openpyxl.utils.get_column_letter(col)
        max_len = 0
        for r in range(1, min(len(data)+2, 100)):
            cell_val = str(ws.cell(row=r, column=col).value or '')
            max_len = max(max_len, min(len(cell_val), 50))
        ws.column_dimensions[letter].width = max_len + 4
    ws.freeze_panes = 'A2'
    ws.auto_filter.ref = ws.dimensions
    print(f"  ✓ {sheet_name}: {len(data)}개 항목")


def do_export():
    print("═══ DB → Excel 내보내기 ═══\n")
    dbs = load_dbs_via_node()
    wb = openpyxl.Workbook()
    wb.remove(wb.active)

    write_sheet(wb, '주문_SPELL', dbs['SPELL_DB'],
        ['name_ko','name_en','rank','is_cantrip','is_focus','traditions','actions','traits','summary','desc'])
    write_sheet(wb, '재주_FEAT', dbs['FEAT_DB'],
        ['name_ko','name_en','feat_level','prerequisites','traits','category','summary','desc'])
    write_sheet(wb, '무기_WEAPON', dbs['WEAPON_DB'],
        ['name_ko','name_en','category','price','damage','bulk','hands','range','reload','group','traits'])
    write_sheet(wb, '갑옷_ARMOR', dbs['ARMOR_DB'],
        ['name_ko','name_en','category','price','ac_bonus','dex_cap','check_penalty','speed_penalty','strength','bulk','group','traits'])
    write_sheet(wb, '방패_SHIELD', dbs['SHIELD_DB'],
        ['name_ko','name_en','price','ac_bonus','speed_penalty','bulk','hardness','hp','bt'])
    write_sheet(wb, '장비_GEAR', dbs['GEAR_DB'],
        ['name_ko','name_en','price','bulk'])

    wb.save(EXCEL_FILE)
    print(f"\n✅ 저장: {EXCEL_FILE}")
    print(f"   수정 후 → python3 db_tools.py import")


# ═══════════════════════════════════════
#  IMPORT: Excel → JS
# ═══════════════════════════════════════

def read_sheet(wb, sheet_name):
    if sheet_name not in wb.sheetnames:
        print(f"  ⚠ 시트 '{sheet_name}' 없음")
        return None
    ws = wb[sheet_name]
    rows = list(ws.iter_rows(values_only=True))
    if len(rows) < 2: return []
    headers = [str(h).strip() for h in rows[0]]
    data = []
    for row in rows[1:]:
        if all(v is None for v in row): continue
        item = {}
        for i, h in enumerate(headers):
            val = row[i] if i < len(row) else None
            if val == 'TRUE': val = True
            elif val == 'FALSE': val = False
            elif h in ('traits', 'traditions'):
                val = [v.strip() for v in str(val).split(',') if v.strip()] if val else []
            elif h in ('rank','feat_level','ac_bonus','check_penalty','speed_penalty',
                       'strength','hands','range','reload','hardness','hp','bt'):
                if val is not None and str(val).strip() not in ('', '—', '-', 'None'):
                    try: val = int(float(val))
                    except: pass
                else: val = None
            elif h == 'dex_cap':
                if val is not None and str(val).strip() not in ('', '—', 'None'):
                    try: val = int(float(val))
                    except: val = None
                else: val = None
            elif h in ('is_cantrip', 'is_focus'):
                val = bool(val) if val else False
            elif h == 'bulk':
                sv = str(val).strip() if val else ''
                if sv in ('L','l'): val = 'L'
                elif sv in ('—','-','','None'): val = '—'
                else:
                    try: val = int(float(sv))
                    except: pass
            elif val is None:
                val = ''
            item[h] = val
        data.append(item)
    print(f"  ✓ {sheet_name}: {len(data)}개")
    return data


def do_import(dry_run=False):
    print("═══ Excel → DB 가져오기 ═══\n")
    if not EXCEL_FILE.exists():
        print(f"❌ {EXCEL_FILE} 없음. export 먼저 실행하세요.")
        sys.exit(1)
    wb = openpyxl.load_workbook(EXCEL_FILE)

    # SPELL_DB
    spells = read_sheet(wb, '주문_SPELL')
    if spells is not None:
        js = "// Pathfinder 2e Player Core — 주문 데이터베이스\n// Excel → db_tools.py import\n\n"
        js += array_to_js('SPELL_DB', spells,
            ['name_ko','name_en','rank','is_cantrip','is_focus','traditions','actions','traits','summary','desc'])
        if not dry_run: (SCRIPT_DIR/'SPELL_DB.js').write_text(js, encoding='utf-8')
        print(f"    → SPELL_DB.js {'(미리보기)' if dry_run else '✓'}")

    # FEAT_DB
    feats = read_sheet(wb, '재주_FEAT')
    if feats is not None:
        js = "// Pathfinder 2e Player Core — Feat Database\n// Excel → db_tools.py import\n\n"
        js += array_to_js('FEAT_DB', feats,
            ['name_ko','name_en','feat_level','prerequisites','traits','category','summary','desc'], 'const')
        if not dry_run: (SCRIPT_DIR/'feat_db.js').write_text(js, encoding='utf-8')
        print(f"    → feat_db.js {'(미리보기)' if dry_run else '✓'}")

    # Equipment
    weapons = read_sheet(wb, '무기_WEAPON')
    armors = read_sheet(wb, '갑옷_ARMOR')
    shields = read_sheet(wb, '방패_SHIELD')
    gears = read_sheet(wb, '장비_GEAR')
    js = "// Pathfinder 2e Player Core — Equipment Database\n// Excel → db_tools.py import\n\n"
    if armors is not None:
        js += array_to_js('ARMOR_DB', armors,
            ['name_ko','name_en','category','price','ac_bonus','dex_cap','check_penalty','speed_penalty','strength','bulk','group','traits']) + "\n\n"
    if shields is not None:
        js += array_to_js('SHIELD_DB', shields,
            ['name_ko','name_en','price','ac_bonus','speed_penalty','bulk','hardness','hp','bt']) + "\n\n"
    if weapons is not None:
        js += array_to_js('WEAPON_DB', weapons,
            ['name_ko','name_en','category','price','damage','bulk','hands','range','reload','group','traits']) + "\n\n"
    if gears is not None:
        js += array_to_js('GEAR_DB', gears, ['name_ko','name_en','price','bulk']) + "\n"
    if not dry_run: (SCRIPT_DIR/'equipment_db.js').write_text(js, encoding='utf-8')
    print(f"    → equipment_db.js {'(미리보기)' if dry_run else '✓'}")

    if dry_run:
        print(f"\n🔍 미리보기 — 파일 변경 없음")
    else:
        print(f"\n✅ DB 업데이트 완료! git push로 배포하세요.")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(0)
    cmd = sys.argv[1]
    if cmd == 'export': do_export()
    elif cmd == 'import': do_import('--dry' in sys.argv)
    else: print(f"사용법: python3 db_tools.py export | import [--dry]")
