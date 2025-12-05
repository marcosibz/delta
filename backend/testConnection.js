const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('\n🔍 Verificando conexión a MySQL...\n');
  
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
    });
    
    console.log('✅ Conexión a MySQL exitosa');
    
    // Verificar si existe la base de datos
    const [databases] = await connection.execute('SHOW DATABASES LIKE "deltadb"');
    
    if (databases.length === 0) {
      console.log('❌ La base de datos "deltadb" NO EXISTE');
      console.log('📋 Debes ejecutar el script SQL: sql/deltadb.sql');
      console.log('   1. Abre phpMyAdmin');
      console.log('   2. Click en "Importar"');
      console.log('   3. Selecciona el archivo deltadb.sql');
      console.log('   4. Click en "Continuar"\n');
    } else {
      console.log('✅ Base de datos "deltadb" existe');
      
      // Verificar tablas
      await connection.query('USE deltadb');
      const [tables] = await connection.execute('SHOW TABLES');
      
      console.log('📊 Tablas encontradas:', tables.length);
      tables.forEach(table => {
        console.log('   -', Object.values(table)[0]);
      });
      
      // Verificar usuarios
      const [users] = await connection.execute('SELECT COUNT(*) as total FROM usuarios');
      console.log('\n👥 Usuarios registrados:', users[0].total);
      
      // Verificar productos
      const [products] = await connection.execute('SELECT COUNT(*) as total FROM productos');
      console.log('📦 Productos en DB:', products[0].total);
    }
    
    await connection.end();
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  MySQL no está corriendo!');
      console.log('   Solución:');
      console.log('   1. Abre XAMPP o WAMP');
      console.log('   2. Inicia el servicio MySQL');
      console.log('   3. Vuelve a ejecutar este script\n');
    }
  }
}

testConnection();
