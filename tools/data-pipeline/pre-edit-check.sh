#!/bin/bash
# Pre-edit check script
# Запускать перед редактированием файлов

echo "=== ПРОВЕРКА ПЕРЕД ИЗМЕНЕНИЕМ ==="
echo ""

FILE_TO_EDIT=$1

echo "Файл: $FILE_TO_EDIT"
echo ""

# Проверка для HomePage.tsx
if [[ "$FILE_TO_EDIT" == *"HomePage.tsx"* ]]; then
    echo "⚠️  Редактируется HomePage.tsx"
    echo ""
    echo "Проверки:"
    
    # Проверка баннера
    if grep -q "hero-banner.svg" "$FILE_TO_EDIT"; then
        echo "✅ Hero banner на месте"
    else
        echo "❌ Hero banner ОТСУТСТВУЕТ!"
        exit 1
    fi
    
    # Проверка плиток
    if grep -q "categories.*find.*prozrachnye" "$FILE_TO_EDIT"; then
        echo "✅ Плитки категорий есть"
    else
        echo "❌ Плитки категорий ОТСУТСТВУЮТ!"
        exit 1
    fi
    
    # Проверка сортировки
    if grep -q "stekloroll.*artalico" "$FILE_TO_EDIT"; then
        echo "✅ Сортировка StekloRoll/Artalico есть"
    else
        echo "❌ Сортировка ОТСУТСТВУЕТ!"
        exit 1
    fi
    
    echo ""
    echo "✅ Все проверки пройдены. Можно редактировать."
fi

echo ""
echo "Не забудь обновить PROJECT_CONTEXT.md после изменений!"
