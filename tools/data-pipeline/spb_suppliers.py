#!/usr/bin/env python3
"""
Сбор поставщиков в Санкт-Петербурге и ЛО по категориям
Цель: по 10 компаний на каждую категорию
"""

import json
import re
from urllib.parse import quote

# Категории
CATEGORIES = {
    'prozrachnye-rolstavni': 'прозрачные рольставни',
    'zashchitnye-rolstavni': 'защитные рольставни',
    'vorota': 'ворота',
    'bezramnoe-osteklenie': 'безрамное остекление',
    'myagkie-okna': 'мягкие окна',
    'rolletnye-shkafy': 'роллетные шкафы',
    'ofisnye-peregorodki': 'офисные перегородки'
}

# Поисковые запросы для СПб
QUERIES = [
    "{category} Санкт-Петербург",
    "{category} СПб", 
    "{category} Ленинградская область",
    "{category} Петербург установка",
    "{category} СПб цена"
]

# Шаблон результата
COMPANY_TEMPLATE = {
    "name": "",
    "slug": "",
    "website": "",
    "phone": "",
    "address": "",
    "city": "Санкт-Петербург",
    "region": "Ленинградская область",
    "category": "",
    "source": ""
}

print("=== Сбор поставщиков в СПб и ЛО ===")
print(f"Категорий: {len(CATEGORIES)}")
print(f"Цель: по 10 компаний на категорию")
print(f"Итого: ~{len(CATEGORIES) * 10} компаний")
print()

# Здесь будет логика парсинга
# Пока создаём структуру

results = {}
for cat_slug, cat_name in CATEGORIES.items():
    results[cat_slug] = {
        "category": cat_name,
        "target_count": 10,
        "companies": [],
        "queries": [q.format(category=cat_name) for q in QUERIES]
    }

# Сохраняем структуру
with open('/tmp/spb_parsing_plan.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("План сохранён в /tmp/spb_parsing_plan.json")
print("\nГотов к запуску парсинга!")
