#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Obtener token como argumento
const tokenToDelete = process.argv[2];

if (!tokenToDelete) {
  console.error('❌ Error: Debes proporcionar el token a eliminar');
  console.log('\nUso:');
  console.log('  npm run token:delete <token>');
  console.log('\nEjemplo:');
  console.log('  npm run token:delete abc123def456...');
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

  if (!tokensData.tokens[tokenToDelete]) {
    console.error('❌ Error: Token no encontrado');
    process.exit(1);
  }

  const clientName = tokensData.tokens[tokenToDelete].clientName;

  // Eliminar token
  delete tokensData.tokens[tokenToDelete];

  // Guardar cambios
  fs.writeFileSync(tokensPath, JSON.stringify(tokensData, null, 2));

  console.log('\n✅ Token eliminado exitosamente!');
  console.log(`   Cliente: ${clientName}`);
  console.log(`   Token: ${tokenToDelete.substring(0, 16)}...`);
  console.log('');

} catch (error) {
  console.error('❌ Error al procesar el token:', error.message);
  process.exit(1);
}