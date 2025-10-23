#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Leer archivo de tokens
const tokensPath = path.join(__dirname, '..', 'data', 'tokens.json');
let tokensData;

try {
  tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
} catch (error) {
  console.error('❌ Error leyendo archivo de tokens:', error.message);
  process.exit(1);
}

// Leer URL base del archivo .env.production
let baseUrl = 'https://tu-dominio.com';
try {
  const envPath = path.join(__dirname, '..', '.env.production');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const urlMatch = envContent.match(/NEXT_PUBLIC_APP_URL=(.+)/);
  if (urlMatch && urlMatch[1]) {
    baseUrl = urlMatch[1].trim();
  }
} catch (error) {
  // Si no se puede leer el .env, usar URL por defecto
}

const tokens = Object.entries(tokensData.tokens);

if (tokens.length === 0) {
  console.log('📭 No hay tokens registrados');
  process.exit(0);
}

console.log(`📊 Tokens registrados (${tokens.length} total):\n`);
console.log('═'.repeat(100));

tokens.forEach(([token, info], index) => {
  const status = info.active ? '✅ Activo' : '❌ Inactivo';
  const expires = info.expiresAt
    ? `📅 ${new Date(info.expiresAt).toLocaleDateString()}`
    : '♾️  Sin expiración';

  // Verificar si está expirado
  let expired = '';
  if (info.expiresAt && new Date(info.expiresAt) < new Date()) {
    expired = ' (⚠️  EXPIRADO)';
  }

  // Construir URL completa
  const clientUrl = `${baseUrl}/?t=${token}`;

  console.log(`\n${index + 1}. ${info.client}`);
  console.log(`   Token: ${token}`);
  console.log(`   Estado: ${status}${expired}`);
  console.log(`   Expira: ${expires}`);
  console.log(`   Creado: ${new Date(info.createdAt).toLocaleString()}`);
  console.log(`   🔗 URL: ${clientUrl}`);
  if (info.notes) {
    console.log(`   Notas: ${info.notes}`);
  }
  console.log('   ─'.repeat(50));
});

console.log('\n═'.repeat(100));
console.log(`\n💡 Tip: Copia la URL y envíala al cliente por email`);
