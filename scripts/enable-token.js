#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Obtener token como argumento
const tokenToEnable = process.argv[2];

if (!tokenToEnable) {
  console.error('❌ Error: Debes proporcionar el token a habilitar');
  console.log('\nUso:');
  console.log('  npm run token:enable <token>');
  console.log('\nEjemplo:');
  console.log('  npm run token:enable abc123def456...');
  process.exit(1);
}

// Leer archivo de tokens
const tokensPath = path.join(process.cwd(), 'data', 'tokens.json');

if (!fs.existsSync(tokensPath)) {
  console.error('❌ Error: No existe el archivo de tokens');
  process.exit(1);
}

try {
  const tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

  if (!tokensData.tokens[tokenToEnable]) {
    console.error('❌ Error: Token no encontrado');
    process.exit(1);
  }

  // Habilitar token
  tokensData.tokens[tokenToEnable].active = true;

  // Guardar cambios
  fs.writeFileSync(tokensPath, JSON.stringify(tokensData, null, 2));

  console.log('\n✅ Token habilitado exitosamente!');
  console.log(`   Cliente: ${tokensData.tokens[tokenToEnable].clientName}`);
  console.log(`   Token: ${tokenToEnable.substring(0, 16)}...`);
  console.log('');

} catch (error) {
  console.error('❌ Error al procesar el token:', error.message);
  process.exit(1);
}