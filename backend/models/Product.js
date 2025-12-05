const db = require('../config/database');

class Product {
  static async getAll() {
    const [rows] = await db.execute(
      'SELECT id, nombre, precio, imagen, categoria, stock FROM productos WHERE activo = 1'
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.execute(
      'SELECT id, nombre, precio, imagen, categoria, stock, descripcion FROM productos WHERE id = ? AND activo = 1',
      [id]
    );
    return rows[0];
  }

  static async create(nombre, precio, imagen, categoria, stock, descripcion) {
    const [result] = await db.execute(
      'INSERT INTO productos (nombre, precio, imagen, categoria, stock, descripcion, activo) VALUES (?, ?, ?, ?, ?, ?, 1)',
      [nombre, precio, imagen, categoria, stock, descripcion]
    );
    return result.insertId;
  }

  static async update(id, nombre, precio, imagen, categoria, stock, descripcion) {
    const [result] = await db.execute(
      'UPDATE productos SET nombre = ?, precio = ?, imagen = ?, categoria = ?, stock = ?, descripcion = ? WHERE id = ?',
      [nombre, precio, imagen, categoria, stock, descripcion, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.execute(
      'UPDATE productos SET activo = 0 WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = Product;
