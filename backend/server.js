const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       
  password: '',
  database: 'deltadb'
});


//metodo post para guardar usuarios
app.post('/usuarios', (req, res) => {
  const { correo, usuario, contraseña } = req.body;
  if (!correo || !usuario || !contraseña) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  // guardar usuario en la base de datos
  db.query(
    'INSERT INTO usuarios (correo, usuario, contraseña) VALUES (?, ?, ?)',
    [correo, usuario, contraseña],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Usuario guardado', id: result.insertId });
    }
  );
});

app.post('/login', (req, res) => {
  const { correo, contraseña } = req.body;
  db.query(
    'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?',
    [correo, contraseña],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length > 0) {
        res.json({ ok: true });
      } else {
        res.json({ ok: false });
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Servidor backend corriendo en puerto 3000');
});