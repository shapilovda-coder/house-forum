#!/usr/bin/env python3
"""
Утилиты для работы с Supabase
"""

import requests
import re

SUPABASE_URL = "https://zzellrqkamskeftyprkv.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6ZWxscnFrYW1za2VmdHlwcmt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MDMyOTIsImV4cCI6MjA4NzI3OTI5Mn0.vNrzaaOWG2cDBCDcrQISN_R2PgKb0XekNTQAndLhNy8"

def get_city_id(city_slug):
    """Получить ID города по slug"""
    url = f"{SUPABASE_URL}/rest/v1/cities?slug=eq.{city_slug}&select=id"
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    resp = requests.get(url, headers=headers)
    if resp.status_code == 200 and resp.json():
        return resp.json()[0]["id"]
    return None

def get_category_id(cat_slug):
    """Получить ID категории по slug"""
    url = f"{SUPABASE_URL}/rest/v1/categories?slug=eq.{cat_slug}&select=id"
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    resp = requests.get(url, headers=headers)
    if resp.status_code == 200 and resp.json():
        return resp.json()[0]["id"]
    return None

def create_slug(name):
    """Создать slug из названия"""
    slug = name.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug[:50]

def add_company(company_data):
    """
    Добавить компанию в базу
    
    Args:
        company_data: dict с полями slug, name, website, phone, city_id, ...
    
    Returns:
        company_id или None
    """
    url = f"{SUPABASE_URL}/rest/v1/companies"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    
    resp = requests.post(url, headers=headers, json=company_data)
    if resp.status_code in [200, 201]:
        return resp.json()[0]["id"]
    elif resp.status_code == 409:
        # Компания уже существует, получаем ID
        slug = company_data.get("slug")
        url_get = f"{SUPABASE_URL}/rest/v1/companies?slug=eq.{slug}&select=id"
        resp_get = requests.get(url_get, headers=headers)
        if resp_get.status_code == 200 and resp_get.json():
            return resp_get.json()[0]["id"]
    return None

def link_category(company_id, category_id):
    """
    Привязать компанию к категории
    
    Args:
        company_id: ID компании
        category_id: ID категории
    
    Returns:
        bool: успешно или нет
    """
    url = f"{SUPABASE_URL}/rest/v1/company_categories"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "company_id": company_id,
        "category_id": category_id
    }
    
    resp = requests.post(url, headers=headers, json=data)
    return resp.status_code in [200, 201, 409]  # 409 = already exists

def add_city(city_data):
    """
    Добавить город в базу
    
    Args:
        city_data: dict с полями slug, name, region
    
    Returns:
        bool: успешно или нет
    """
    url = f"{SUPABASE_URL}/rest/v1/cities"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    
    resp = requests.post(url, headers=headers, json=city_data)
    return resp.status_code in [200, 201, 409]

def get_companies_by_city(city_slug):
    """
    Получить все компании города
    
    Args:
        city_slug: slug города
    
    Returns:
        list of companies
    """
    city_id = get_city_id(city_slug)
    if not city_id:
        return []
    
    url = f"{SUPABASE_URL}/rest/v1/companies?city_id=eq.{city_id}&select=*"
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    resp = requests.get(url, headers=headers)
    if resp.status_code == 200:
        return resp.json()
    return []

if __name__ == "__main__":
    # Тест
    print("Testing utils...")
    city_id = get_city_id("sankt-peterburg")
    print(f"СПб ID: {city_id}")
    
    cat_id = get_category_id("vorota")
    print(f"Ворота ID: {cat_id}")
