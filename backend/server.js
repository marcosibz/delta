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



app.post('/usuarios', (req, res) => {
  console.log('/usuarios body ->', req.body); // <--- ver qué llega
  const { correo, usuario, contrasena } = req.body;

  if (!correo || !usuario || !contrasena) {
    return res.status(400).json({ ok: false, message: 'Faltan datos' });
  }

  db.query(
    'INSERT INTO usuarios (correo, usuario, contrasena) VALUES (?, ?, ?)',
    [correo, usuario, contrasena],
    (err, result) => {
      if (err) {
        console.error('INSERT error:', err);
        return res.status(500).json({ ok: false, message: err.message });
      }
      return res.json({ ok: true, message: 'Usuario creado' });
    }
  );
});
// ...existing code...

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