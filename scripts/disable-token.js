#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Obtener token como argumento
const tokenToDisable = process.argv[2];

if (!tokenToDisable) {
  console.error('❌ Error: Debes proporcionar el token a deshabilitar');
  console.log('\nUso:');
  console.log('  npm run token:disable <token>');
  console.log('\nEjemplo:');
  console.log('  npm run token:disable abc123def456...');
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

  if (!tokensData.tokens[tokenToDisable]) {
    console.error('❌ Error: Token no encontrado');
    process.exit(1);
  }

  // Deshabilitar token
  tokensData.tokens[tokenToDisable].active = false;

  // Guardar cambios
  fs.writeFileSync(tokensPath, JSON.stringify(tokensData, null, 2));

  console.log('\n✅ Token deshabilitado exitosamente!');
  console.log(`   Cliente: ${tokensData.tokens[tokenToDisable].clientName}`);
  console.log(`   Token: ${tokenToDisable.substring(0, 16)}...`);
  console.log('');

} catch (error) {
  console.error('❌ Error al procesar el token:', error.message);
  process.exit(1);
}