const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'delta_db'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  }
  console.log('Conectado a la base de datos delta_db');
});

// Endpoint de registro
app.post('/usuarios', (req, res) => {
  console.log('POST /usuarios - body:', req.body);
  
  const { correo, usuario, contrasena } = req.body;

  // Validación de datos
  if (!correo || !usuario || !contrasena) {
    return res.status(400).json({ 
      ok: false, 
      error: 'Faltan datos requeridos' 
    });
  }

  // Verificar si el correo ya existe
  db.query(
    'SELECT id FROM usuarios WHERE correo = ?',
    [correo],
    (err, results) => {
      if (err) {
        console.error('Error al verificar correo:', err);
        return res.status(500).json({ 
          ok: false, 
          error: 'Error en el servidor' 
        });
      }

      if (results.length > 0) {
        return res.status(400).json({ 
          ok: false, 
          error: 'El correo ya está registrado' 
        });
      }

      // Insertar nuevo usuario
      db.query(
        'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)',
        [usuario, correo, contrasena],
        (err, result) => {
          if (err) {
            console.error('Error al insertar usuario:', err);
            return res.status(500).json({ 
              ok: false, 
              error: 'Error al crear usuario' 
            });
          }
          
          console.log('Usuario creado con ID:', result.insertId);
          return res.json({ 
            ok: true, 
            message: 'Usuario registrado correctamente',
            usuario: {
              id: result.insertId,
              nombre: usuario,
              correo: correo
            }
          });
        }
      );
    }
  );
});

// Endpoint de login
app.post('/login', (req, res) => {
  console.log('POST /login - body:', req.body);
  
  const { correo, contrasena } = req.body;

  // Validación de datos
  if (!correo || !contrasena) {
    return res.status(400).json({ 
      ok: false, 
      message: 'Faltan datos requeridos' 
    });
  }

  // Buscar usuario
  db.query(
    'SELECT id, nombre, correo, foto FROM usuarios WHERE correo = ? AND contrasena = ?',
    [correo, contrasena],
    (err, results) => {
      if (err) {
        console.error('Error en login:', err);
        return res.status(500).json({ 
          ok: false, 
          message: 'Error en el servidor' 
        });
      }

      if (results.length > 0) {
        const user = results[0];
        console.log('Login exitoso para:', user.correo);
        return res.json({ 
          ok: true,
          message: 'Login exitoso',
          usuario: user.nombre,
          correo: user.correo,
          foto: user.foto
        });
      } else {
        console.log('Credenciales incorrectas para:', correo);
        return res.status(401).json({ 
          ok: false, 
          message: 'Datos incorrectos' 
        });
      }
    }
  );
});

// Endpoint de prueba
app.get('/test', (req, res) => {
  res.json({ ok: true, message: 'Servidor funcionando correctamente' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});