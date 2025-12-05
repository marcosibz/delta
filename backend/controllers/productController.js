const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    return res.json({ ok: true, products });
  } catch (error) {
    console.error('Error en getAllProducts:', error);
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.getById(id);
    
    if (!product) {
      return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
    }
    
    return res.json({ ok: true, product });
  } catch (error) {
    console.error('Error en getProductById:', error);
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { nombre, precio, imagen, categoria, stock, descripcion } = req.body;

    if (!nombre || !precio || !imagen) {
      return res.status(400).json({ ok: false, message: 'Faltan datos obligatorios' });
    }

    const productId = await Product.create(
      nombre, 
      precio, 
      imagen, 
      categoria || 'General', 
      stock || 0, 
      descripcion || ''
    );

    return res.json({ ok: true, message: 'Producto creado', productId });
  } catch (error) {
    console.error('Error en createProduct:', error);
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, imagen, categoria, stock, descripcion } = req.body;

    const affectedRows = await Product.update(id, nombre, precio, imagen, categoria, stock, descripcion);

    if (affectedRows === 0) {
      return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
    }

    return res.json({ ok: true, message: 'Producto actualizado' });
  } catch (error) {
    console.error('Error en updateProduct:', error);
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await Product.delete(id);

    if (affectedRows === 0) {
      return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
    }

    return res.json({ ok: true, message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error en deleteProduct:', error);
    return res.status(500).json({ ok: false, message: error.message });
  }
};
