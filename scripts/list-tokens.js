#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Leer archivo de tokens
const tokensPath = path.join(process.cwd(), 'data', 'tokens.json');

if (!fs.existsSync(tokensPath)) {
  console.log('⚠️  No hay tokens registrados aún.');
  console.log('Usa: npm run token:generate "Nombre del Cliente"');
  process.exit(0);
}

try {
  const tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
  const tokens = Object.entries(tokensData.tokens);

  if (tokens.length === 0) {
    console.log('⚠️  No hay tokens registrados.');
    process.exit(0);
  }

  console.log('\n📋 Lista de Tokens:\n');
  console.log('='.repeat(80));

  tokens.forEach(([token, info]) => {
    const isExpired = new Date(info.expiresAt) < new Date();
    const status = !info.active ? '🔴 DESHABILITADO' : isExpired ? '⚠️  EXPIRADO' : '✅ ACTIVO';

    console.log(`\n${status}`);
    console.log(`Cliente:  ${info.clientName}`);
    console.log(`Token:    ${token.substring(0, 16)}...`);
    console.log(`Creado:   ${new Date(info.createdAt).toLocaleDateString('es-ES')}`);
    console.log(`Expira:   ${new Date(info.expiresAt).toLocaleDateString('es-ES')}`);
    console.log(`URL:      https://tu-dominio.com/?t=${token}`);
    console.log('-'.repeat(80));
  });

  console.log(`\n📊 Total: ${tokens.length} token(s)\n`);

} catch (error) {
  console.error('❌ Error al leer el archivo de tokens:', error.message);
  process.exit(1);
}