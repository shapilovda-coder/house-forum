#!/usr/bin/env python3
"""
Загрузка поставщиков в Supabase
"""

import argparse
import json
import os
import sys

# Добавляем путь к скриптам
sys.path.insert(0, os.path.dirname(__file__))

from utils import get_city_id, get_category_id, add_company, link_category, create_slug

def upload_supplier(supplier, city_id, category_id):
    """
    Загрузить одного поставщика в Supabase
    
    Args:
        supplier: dict с данными
        city_id: ID города
        category_id: ID категории
    
    Returns:
        bool: успешно или нет
    """
    # Создаём slug
    base_slug = create_slug(supplier["name"])
    slug = f"{base_slug}-{supplier.get('city', 'city')}"
    
    # Данные компании
    company_data = {
        "slug": slug,
        "name": supplier["name"],
        "website": supplier.get("website", ""),
        "phone": supplier.get("phone", ""),
        "address": supplier.get("address", ""),
        "city_id": city_id,
        "status": "active",
        "is_verified": False,
        "rating": 4,
        "reviews_count": 0
    }
    
    # Добавляем компанию
    company_id = add_company(company_data)
    if not company_id:
        print(f"  ❌ Не удалось добавить: {supplier['name']}")
        return False
    
    # Привязываем к категории
    if link_category(company_id, category_id):
        print(f"  ✅ {supplier['name']}")
        return True
    else:
        print(f"  ⚠️ {supplier['name']} (не привязана категория)")
        return False

def upload_from_file(input_file, city_slug=None, category_slug=None):
    """
    Загрузить поставщиков из файла
    
    Args:
        input_file: путь к JSON файлу
        city_slug: slug города (опционально, берётся из данных)
        category_slug: slug категории (опционально, берётся из данных)
    """
    with open(input_file, "r", encoding="utf-8") as f:
        suppliers = json.load(f)
    
    if not suppliers:
        print("❌ Пустой список поставщиков")
        return
    
    # Определяем город и категорию
    first = suppliers[0]
    city = city_slug or first.get("city")
    category = category_slug or first.get("category")
    
    if not city or not category:
        print("❌ Не указан город или категория")
        return
    
    # Получаем ID
    city_id = get_city_id(city)
    category_id = get_category_id(category)
    
    if not city_id:
        print(f"❌ Город '{city}' не найден в базе")
        return
    
    if not category_id:
        print(f"❌ Категория '{category}' не найдена в базе")
        return
    
    print(f"📤 Загрузка в Supabase:")
    print(f"   Город: {city} (ID: {city_id})")
    print(f"   Категория: {category} (ID: {category_id})")
    print(f"   Поставщиков: {len(suppliers)}")
    print()
    
    added = 0
    for supplier in suppliers:
        # Пропускаем шаблоны
        if supplier.get("status") == "template" or not supplier.get("name"):
            continue
        
        if upload_supplier(supplier, city_id, category_id):
            added += 1
    
    print()
    print(f"📊 Итого: добавлено {added}/{len(suppliers)}")

def upload_from_directory(input_dir):
    """
    Загрузить все поставщиков из директории
    
    Args:
        input_dir: путь к директории с JSON файлами
    """
    total_added = 0
    total_files = 0
    
    for root, dirs, files in os.walk(input_dir):
        for file in files:
            if file.endswith(".json"):
                filepath = os.path.join(root, file)
                print(f"\n📁 {filepath}")
                
                # Определяем город и категорию из пути
                parts = filepath.split("/")
                city = None
                category = None
                
                for i, part in enumerate(parts):
                    if part == "suppliers" and i + 1 < len(parts):
                        city = parts[i + 1]
                        if i + 2 < len(parts):
                            category = parts[i + 2].replace(".json", "")
                        break
                
                try:
                    upload_from_file(filepath, city, category)
                    total_files += 1
                except Exception as e:
                    print(f"❌ Ошибка: {e}")
    
    print(f"\n📊 Обработано файлов: {total_files}")

def main():
    parser = argparse.ArgumentParser(description="Загрузка поставщиков в Supabase")
    parser.add_argument("--input", required=True, help="JSON файл или директория")
    parser.add_argument("--city", help="Slug города (если не в данных)")
    parser.add_argument("--category", help="Slug категории (если не в данных)")
    
    args = parser.parse_args()
    
    if os.path.isdir(args.input):
        upload_from_directory(args.input)
    else:
        upload_from_file(args.input, args.city, args.category)

if __name__ == "__main__":
    main()
