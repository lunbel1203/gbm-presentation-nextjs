#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Obtener argumentos
const args = process.argv.slice(2);
const clientName = args[0];
const expiresInDays = args[1] ? parseInt(args[1]) : null;

if (!clientName) {
  console.error('❌ Error: Debes proporcionar el nombre del cliente');
  console.log('\nUso:');
  console.log('  node scripts/generate-token.js "Nombre del Cliente" [días de expiración]');
  console.log('\nEjemplos:');
  console.log('  node scripts/generate-token.js "Acme Corp"');
  console.log('  node scripts/generate-token.js "Acme Corp" 30');
  process.exit(1);
}

// Generar token único
const token = crypto.randomBytes(16).toString('hex');

// Leer archivo de tokens
const tokensPath = path.join(__dirname, '..', 'data', 'tokens.json');
let tokensData;

try {
  tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
} catch (error) {
  console.error('❌ Error leyendo archivo de tokens:', error.message);
  process.exit(1);
}

// Calcular fecha de expiración si se especificó
let expiresAt = null;
if (expiresInDays) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expiresInDays);
  expiresAt = expirationDate.toISOString();
}

// Agregar nuevo token
tokensData.tokens[token] = {
  client: clientName,
  active: true,
  createdAt: new Date().toISOString(),
  expiresAt: expiresAt,
  notes: ''
};

// Guardar archivo
try {
  fs.writeFileSync(tokensPath, JSON.stringify(tokensData, null, 2), 'utf-8');
  console.log('✅ Token generado exitosamente!\n');
  console.log('📋 Información del token:');
  console.log(`   Cliente: ${clientName}`);
  console.log(`   Token: ${token}`);
  console.log(`   Estado: Activo`);
  console.log(`   Creado: ${new Date().toLocaleString()}`);
  if (expiresAt) {
    console.log(`   Expira: ${new Date(expiresAt).toLocaleString()}`);
  } else {
    console.log(`   Expira: Nunca`);
  }
  console.log('\n🔗 URLs para el cliente:');
  console.log(`   USA: https://presentationusa.glaringmaintenance.com/?t=${token}`);
  console.log(`   RD:  https://presentationrd.glaringmaintenance.com/?t=${token}`);
  console.log('\n💡 Tip: Copia la URL correspondiente y envíala al cliente');
} catch (error) {
  console.error('❌ Error guardando token:', error.message);
  process.exit(1);
}
