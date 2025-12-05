const Favorite = require('../models/Favorite');

exports.addFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ ok: false, message: 'Faltan datos' });
    }

    const favoriteId = await Favorite.add(userId, productId);
    return res.json({ ok: true, message: 'Producto añadido a favoritos', favoriteId });
  } catch (error) {
    console.error('Error en addFavorite:', error);
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ ok: false, message: 'Faltan datos' });
    }

    const affectedRows = await Favorite.remove(userId, productId);
    
    if (affectedRows === 0) {
      return res.status(404).json({ ok: false, message: 'Favorito no encontrado' });
    }

    return res.json({ ok: true, message: 'Producto eliminado de favoritos' });
  } catch (error) {
    console.error('Error en removeFavorite:', error);
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const favorites = await Favorite.getUserFavorites(userId);
    return res.json({ ok: true, favorites });
  } catch (error) {
    console.error('Error en getUserFavorites:', error);
    return res.status(500).json({ ok: false, message: error.message });
  }
};
