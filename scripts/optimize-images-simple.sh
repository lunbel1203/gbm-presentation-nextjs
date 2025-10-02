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

echo "🎨 Optimizando JPG/JPEG (calidad 85%)..."
cd "$IMAGES_DIR"
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read img; do
    echo "  Procesando: $(basename "$img")"
    sips -s format jpeg -s formatOptions 85 "$img" --out "$img" > /dev/null 2>&1
done

echo ""
echo "🎨 Optimizando PNG..."
find . -type f -iname "*.png" | while read img; do
    echo "  Procesando: $(basename "$img")"
    sips -s format png "$img" --out "$img" > /dev/null 2>&1
done

cd - > /dev/null

echo ""
echo "📊 Tamaño DESPUÉS de optimizar:"
du -sh "$IMAGES_DIR"
echo ""

echo "✅ Optimización completada!"
echo ""
echo "💡 El backup de las imágenes originales está en: $BACKUP_DIR"
