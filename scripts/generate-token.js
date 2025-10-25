#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Obtener argumentos
const clientName = process.argv[2];
const daysValid = parseInt(process.argv[3]) || 30;

if (!clientName) {
  console.error('❌ Error: Debes proporcionar el nombre del cliente');
  console.log('\nUso:');
  console.log('  npm run token:generate "Nombre del Cliente" [días]');
  console.log('\nEjemplo:');
  console.log('  npm run token:generate "Acme Corp" 90');
  process.exit(1);
}

// Generar token único
const token = crypto.randomBytes(32).toString('hex');

// Calcular fecha de expiración
const createdAt = new Date();
const expiresAt = new Date(createdAt);
expiresAt.setDate(expiresAt.getDate() + daysValid);

// Leer archivo de tokens existente o crear uno nuevo
const tokensPath = path.join(process.cwd(), 'data', 'tokens.json');
let tokensData = { tokens: {} };

try {
  if (fs.existsSync(tokensPath)) {
    const fileContent = fs.readFileSync(tokensPath, 'utf-8');
    tokensData = JSON.parse(fileContent);
  }
} catch (error) {
  console.warn('⚠️  No se pudo leer el archivo de tokens existente, creando uno nuevo');
}

// Agregar nuevo token
tokensData.tokens[token] = {
  clientName,
  createdAt: createdAt.toISOString(),
  expiresAt: expiresAt.toISOString(),
  active: true,
};

// Crear directorio data si no existe
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Guardar archivo actualizado
fs.writeFileSync(tokensPath, JSON.stringify(tokensData, null, 2));

// Mostrar información
console.log('\n✅ Token generado exitosamente!\n');
console.log('📋 Información del Token:');
console.log(`   Cliente: ${clientName}`);
console.log(`   Válido por: ${daysValid} días`);
console.log(`   Expira: ${expiresAt.toLocaleDateString('es-ES')}`);
console.log('\n🔗 URL para el cliente:');
console.log(`   https://presentacionrd.glaringmaintenance.do/?t=${token}`);
console.log('\n📝 Token:');
console.log(`   ${token}`);
console.log('\n💡 Tip: Guarda esta URL y envíala al cliente de forma segura.');
console.log('');