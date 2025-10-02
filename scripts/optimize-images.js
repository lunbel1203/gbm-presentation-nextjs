const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imagesDir = path.join(__dirname, '../public/assets/images');
const backupDir = path.join(__dirname, '../public/assets/images-backup');

console.log('🖼️  Optimizando imágenes...\n');

// Crear backup
if (!fs.existsSync(backupDir)) {
  console.log('📦 Creando backup de imágenes originales...');
  execSync(`cp -r "${imagesDir}" "${backupDir}"`);
  console.log('✅ Backup creado en: public/assets/images-backup\n');
}

// Optimizar con ImageMagick (si está instalado)
try {
  console.log('🔍 Verificando ImageMagick...');
  execSync('which magick', { stdio: 'ignore' });
  console.log('✅ ImageMagick encontrado\n');

  console.log('🎨 Optimizando JPG/JPEG (calidad 85%)...');
  execSync(`find "${imagesDir}" -type f \\( -iname "*.jpg" -o -iname "*.jpeg" \\) -exec magick mogrify -strip -quality 85 -sampling-factor 4:2:0 {} \\;`);

  console.log('🎨 Optimizando PNG...');
  execSync(`find "${imagesDir}" -type f -iname "*.png" -exec magick mogrify -strip {} \\;`);

  console.log('✅ Optimización completada!\n');
} catch (error) {
  console.log('⚠️  ImageMagick no está instalado. Usando método alternativo...\n');
  console.log('Instala ImageMagick con: brew install imagemagick\n');
}

// Mostrar tamaños
console.log('📊 Tamaño actual:');
execSync(`du -sh "${imagesDir}"`, { stdio: 'inherit' });

console.log('\n📊 Imágenes más grandes:');
execSync(`du -h "${imagesDir}"/* | sort -rh | head -10`, { stdio: 'inherit' });

console.log('\n💡 Recomendaciones:');
console.log('- Considera convertir imágenes grandes a WebP');
console.log('- Next.js las optimizará automáticamente al servirlas');
console.log('- El backup está en: public/assets/images-backup');
