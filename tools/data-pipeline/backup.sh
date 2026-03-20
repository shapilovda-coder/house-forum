# Автоматический бэкап перед правкой

backup_file() {
    local file=$1
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_dir=".backups/$(dirname $file)"
    local backup_name="$(basename $file).backup.$timestamp"
    
    mkdir -p "$backup_dir"
    cp "$file" "$backup_dir/$backup_name"
    
    echo "✅ Бэкап создан: $backup_dir/$backup_name"
}

# Использование:
# backup_file "app/[[...slug]]/HomePage.tsx"
