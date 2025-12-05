const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  console.log('\n🔧 Configurando base de datos...\n');
  
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'deltadb',
      multipleStatements: true
    });
    
    console.log('✅ Conectado a MySQL');
    
    // Leer el archivo SQL
    const sqlPath = path.join(__dirname, '..', 'sql', 'update_db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Ejecutar el SQL
    await connection.query(sql);
    
    console.log('✅ Tablas creadas/actualizadas correctamente');
    
    // Verificar
    const [products] = await connection.execute('SELECT COUNT(*) as total FROM productos');
    console.log(`✅ Productos: ${products[0].total}`);
    
    const [users] = await connection.execute('SELECT COUNT(*) as total FROM usuarios WHERE es_admin = 1');
    console.log(`✅ Administradores: ${users[0].total}`);
    
    await connection.end();
    
    console.log('\n✨ Base de datos configurada exitosamente!');
    console.log('\n📝 Credenciales de administrador:');
    console.log('   Email: admin@deltastyle.com');
    console.log('   Contraseña: admin123\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
