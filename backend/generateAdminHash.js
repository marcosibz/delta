const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'admin123';
  const hash = await bcrypt.hash(password, 10);
  console.log('\n=== HASH GENERADO PARA ADMINISTRADOR ===\n');
  console.log('Contraseña:', password);
  console.log('Hash:', hash);
  console.log('\nCopia este hash en el archivo SQL en la línea del INSERT de usuarios admin');
  console.log('\n========================================\n');
}

generateHash();
