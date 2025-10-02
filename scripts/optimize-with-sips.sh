#!/bin/bash

IMAGES_DIR="public/assets/images"
BACKUP_DIR="public/assets/images-backup"

echo "🖼️  Optimizando imágenes con sips..."
echo ""

# Crear backup si no existe
if [ ! -d "$BACKUP_DIR" ]; then
    echo "📦 Creando backup de imágenes originales..."
    cp -r "$IMAGES_DIR" "$BACKUP_DIR"
    echo "✅ Backup creado en: $BACKUP_DIR"
    echo ""
fi

# Obtener tamaño inicial
echo "📊 Tamaño ANTES de optimizar:"
du -sh "$IMAGES_DIR"
echo ""

# Contador
total=0
optimized=0

echo "🎨 Optimizando JPG/JPEG..."
for img in "$IMAGES_DIR"/*.{jpg,jpeg,JPG,JPEG} 2>/dev/null; do
    if [ -f "$img" ]; then
        total=$((total + 1))
        size_before=$(stat -f%z "$img")

        # Optimizar: reducir calidad a 85% y quitar metadata
        sips -s format jpeg -s formatOptions 85 "$img" --out "$img" > /dev/null 2>&1

        size_after=$(stat -f%z "$img")
        saved=$((size_before - size_after))

        if [ $saved -gt 0 ]; then
            optimized=$((optimized + 1))
            saved_mb=$(echo "scale=2; $saved / 1048576" | bc)
            echo "  ✓ $(basename "$img") - Ahorrado: ${saved_mb}MB"
        fi
    fi
done

echo ""
echo "🎨 Optimizando PNG..."
for img in "$IMAGES_DIR"/*.{png,PNG} 2>/dev/null; do
    if [ -f "$img" ]; then
        total=$((total + 1))
        size_before=$(stat -f%z "$img")

        # Quitar metadata de PNG
        sips -s format png "$img" --out "$img" > /dev/null 2>&1

        size_after=$(stat -f%z "$img")
        saved=$((size_before - size_after))

        if [ $saved -gt 0 ]; then
            optimized=$((optimized + 1))
            saved_mb=$(echo "scale=2; $saved / 1048576" | bc)
            echo "  ✓ $(basename "$img") - Ahorrado: ${saved_mb}MB"
        fi
    fi
done

echo ""
echo "📊 Tamaño DESPUÉS de optimizar:"
du -sh "$IMAGES_DIR"
echo ""

echo "✅ Optimización completada!"
echo "   Total de imágenes: $total"
echo "   Imágenes optimizadas: $optimized"
echo ""
echo "💡 Recomendaciones:"
echo "   - Next.js optimizará aún más las imágenes al servirlas"
echo "   - Considera usar WebP para mayor compresión"
echo "   - El backup está en: $BACKUP_DIR"
