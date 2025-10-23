#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Obtener argumentos
const args = process.argv.slice(2);
const token = args[0];

if (!token) {
  console.error('❌ Error: Debes proporcionar el token a habilitar');
  console.log('\nUso:');
  console.log('  node scripts/enable-token.js <token>');
  console.log('\nEjemplo:');
  console.log('  node scripts/enable-token.js abc123xyz');
  console.log('\n💡 Tip: Usa "node scripts/list-tokens.js" para ver todos los tokens');
  process.exit(1);
}

// Leer archivo de tokens
const tokensPath = path.join(__dirname, '..', 'data', 'tokens.json');
let tokensData;

try {
  tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
} catch (error) {
  console.error('❌ Error leyendo archivo de tokens:', error.message);
  process.exit(1);
}

// Verificar si el token existe
if (!tokensData.tokens[token]) {
  console.error(`❌ Error: El token "${token}" no existe`);
  console.log('\n💡 Tip: Usa "node scripts/list-tokens.js" para ver todos los tokens');
  process.exit(1);
}

// Habilitar token
tokensData.tokens[token].active = true;

// Guardar archivo
try {
  fs.writeFileSync(tokensPath, JSON.stringify(tokensData, null, 2), 'utf-8');
  console.log('✅ Token habilitado exitosamente!\n');
  console.log('📋 Información del token:');
  console.log(`   Cliente: ${tokensData.tokens[token].client}`);
  console.log(`   Token: ${token}`);
  console.log(`   Estado: ✅ Activo`);
  console.log('\n✅ El cliente ahora puede acceder a la presentación con este token');
} catch (error) {
  console.error('❌ Error guardando cambios:', error.message);
  process.exit(1);
}
