#!/bin/bash

echo "🔧 Optimización agresiva de imágenes grandes..."
echo ""

cd public/assets/images

# Lista de imágenes muy grandes para redimensionar
LARGE_IMAGES=(
    "bg-values.jpg"
    "bg-mission.jpg"
    "bg-vision.jpg"
    "bg-building.jpg"
    "experience.jpg"
    "our-people-02.jpg"
    "qualityassurance-03.jpg"
    "bg-massachusetts.jpg"
    "bg-republica-dominicana.jpg"
    "glaring-clean-02.jpg"
    "refer-program.jpg"
    "bg-cross.jpg"
)

echo "📏 Redimensionando imágenes a máximo 2500px de ancho..."
for img in "${LARGE_IMAGES[@]}"; do
    if [ -f "$img" ]; then
        echo "  Procesando: $img"
        # Redimensionar a max 2500px de ancho manteniendo aspect ratio
        sips -Z 2500 "$img" > /dev/null 2>&1
        # Optimizar calidad al 75%
        sips -s format jpeg -s formatOptions 75 "$img" --out "$img" > /dev/null 2>&1
    fi
done

echo ""
echo "🎨 Re-optimizando todas las JPG al 75% de calidad..."
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read img; do
    sips -s format jpeg -s formatOptions 75 "$img" --out "$img" > /dev/null 2>&1
done

cd - > /dev/null

echo ""
echo "📊 Tamaño actual:"
du -sh public/assets/images
echo ""

echo "✅ Optimización completada!"
echo ""
echo "💡 Imágenes optimizadas:"
echo "   - Reducidas a máximo 2500px de ancho"
echo "   - Calidad JPG al 75%"
