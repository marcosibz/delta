const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async create(correo, usuario, contrasena) {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const [result] = await db.execute(
      'INSERT INTO usuarios (correo, usuario, contrasena, es_admin) VALUES (?, ?, ?, ?)',
      [correo, usuario, hashedPassword, false]
    );
    return result.insertId;
  }

  static async findByEmail(correo) {
    const [rows] = await db.execute(
      'SELECT id, correo, usuario, contrasena, es_admin FROM usuarios WHERE correo = ?',
      [correo]
    );
    return rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
