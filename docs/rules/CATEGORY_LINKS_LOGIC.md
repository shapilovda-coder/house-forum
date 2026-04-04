# Логика связи компаний и категорий

## Текущая структура (через company_categories)

Таблица `company_categories` связывает компании с категориями:
- `company_id` → ID компании
- `category_id` → ID категории

## Проблема

**StekloRoll** сейчас привязан только к:
- ✅ Прозрачные рольставни
- ❌ Нет в: Защитные рольставни, Ворота, Безрамное остекление...

**Artalico** — проверить привязку

**Levin Group** — привязан только к Защитные рольставни

## Требуемая логика

### StekloRoll должен быть в:
1. Прозрачные рольставни
2. Защитные рольставни  
3. Ворота
4. Безрамное остекление
5. Мягкие окна
6. Роллетные шкафы

### Artalico должен быть в:
1. Прозрачные рольставни
2. Роллетные шкафы
3. ... (уточнить)

### Остальные компании
- Привязаны к тем категориям, которые реально делают
- Одна компания = несколько категорий (через company_categories)

## SQL для добавления связей

```sql
-- Добавить StekloRoll во все категории
INSERT INTO company_categories (company_id, category_id)
SELECT 
  (SELECT id FROM companies WHERE slug = 'stekloroll-ru'),
  id 
FROM categories 
WHERE slug IN ('zashchitnye-rolstavni', 'vorota', 'bezramnoe-osteklenie', 'myagkie-okna', 'rolletnye-shkafy');
```

## Проверка

```sql
-- Сколько категорий у StekloRoll?
SELECT COUNT(*) FROM company_categories 
WHERE company_id = (SELECT id FROM companies WHERE slug = 'stekloroll-ru');
```

---

**Заметка:** Нужно добавить StekloRoll и Artalico во все категории, чтобы они показывались первыми везде.
