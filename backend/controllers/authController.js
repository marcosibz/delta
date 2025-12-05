const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { correo, usuario, contrasena } = req.body;

    if (!correo || !usuario || !contrasena) {
      return res.status(400).json({ ok: false, message: 'Faltan datos' });
    }

    const existingUser = await User.findByEmail(correo);
    if (existingUser) {
      return res.status(400).json({ ok: false, message: 'El correo ya está registrado' });
    }

    const userId = await User.create(correo, usuario, contrasena);
    return res.json({ ok: true, message: 'Usuario creado', userId });
  } catch (error) {
    console.error('Error en register:', error);
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ ok: false, message: 'Faltan datos: correo y contraseña son requeridos' });
    }

    const user = await User.findByEmail(correo);
    if (!user) {
      return res.status(401).json({ ok: false, message: 'Credenciales inválidas' });
    }

    const isValid = await User.verifyPassword(contrasena, user.contrasena);
    if (!isValid) {
      return res.status(401).json({ ok: false, message: 'Credenciales inválidas' });
    }

    return res.json({ 
      ok: true, 
      user: { 
        id: user.id, 
        correo: user.correo, 
        usuario: user.usuario,
        esAdmin: user.es_admin === 1
      } 
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ ok: false, message: 'Error en la consulta' });
  }
};
