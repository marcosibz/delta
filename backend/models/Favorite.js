const db = require('../config/database');

class Favorite {
  static async add(userId, productId) {
    try {
      const [result] = await db.execute(
        'INSERT INTO favoritos (usuario_id, producto_id) VALUES (?, ?)',
        [userId, productId]
      );
      return result.insertId;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('El producto ya está en favoritos');
      }
      throw error;
    }
  }

  static async remove(userId, productId) {
    const [result] = await db.execute(
      'DELETE FROM favoritos WHERE usuario_id = ? AND producto_id = ?',
      [userId, productId]
    );
    return result.affectedRows;
  }

  static async getUserFavorites(userId) {
    const [rows] = await db.execute(`
      SELECT p.id, p.nombre, p.precio, p.imagen, p.categoria 
      FROM favoritos f
      JOIN productos p ON f.producto_id = p.id
      WHERE f.usuario_id = ? AND p.activo = 1
    `, [userId]);
    return rows;
  }

  static async isFavorite(userId, productId) {
    const [rows] = await db.execute(
      'SELECT id FROM favoritos WHERE usuario_id = ? AND producto_id = ?',
      [userId, productId]
    );
    return rows.length > 0;
  }
}

module.exports = Favorite;
