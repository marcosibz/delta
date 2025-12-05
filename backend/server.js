const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/productos', productRoutes);
app.use('/favoritos', favoriteRoutes);

// Mantener rutas legacy por compatibilidad
app.post('/usuarios', require('./controllers/authController').register);
app.post('/login', require('./controllers/authController').login);

// Ruta para actualizar usuario
app.put('/usuarios/:id', async (req, res) => {
  const db = require('./config/database');
  try {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    
    console.log('📝 Actualizando usuario:', id, { nombre, correo });
    
    let query = 'UPDATE usuarios SET ';
    const updates = [];
    const values = [];
    
    if (nombre !== undefined) {
      updates.push('usuario = ?');
      values.push(nombre);
    }
    if (correo !== undefined) {
      updates.push('correo = ?');
      values.push(correo);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ ok: false, message: 'No hay campos para actualizar' });
    }
    
    query += updates.join(', ') + ' WHERE id = ?';
    values.push(id);
    
    console.log('Query:', query);
    console.log('Values:', values);
    
    const [result] = await db.query(query, values);
    
    console.log('✅ Usuario actualizado:', result);
    
    res.json({ ok: true, message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error actualizando usuario:', error);
    res.status(500).json({ ok: false, message: 'Error al actualizar usuario', error: error.message });
  }
});

// Ruta para guardar compra
app.post('/compras', async (req, res) => {
  const db = require('./config/database');
  try {
    const { usuario_id, total, items } = req.body;
    
    console.log('🛒 Nueva compra:', { usuario_id, total, items });
    
    // Insertar la compra
    const [result] = await db.query(
      'INSERT INTO compras (usuario_id, total) VALUES (?, ?)',
      [usuario_id, total]
    );
    
    const compraId = result.insertId;
    
    // Insertar los detalles de la compra
    for (const item of items) {
      await db.query(
        'INSERT INTO compras_detalle (compra_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [compraId, item.producto_id, item.cantidad, item.precio_unitario]
      );
    }
    
    console.log('✅ Compra guardada:', compraId);
    
    res.json({ ok: true, message: 'Compra registrada correctamente', compraId });
  } catch (error) {
    console.error('❌ Error guardando compra:', error);
    res.status(500).json({ ok: false, message: 'Error al registrar compra' });
  }
});

// Ruta para obtener historial de compras de un usuario
app.get('/compras/:usuario_id', async (req, res) => {
  const db = require('./config/database');
  try {
    const { usuario_id } = req.params;
    
    const [compras] = await db.query(
      `SELECT c.id, c.total, c.fecha_compra,
        GROUP_CONCAT(
          JSON_OBJECT(
            'producto_id', cd.producto_id,
            'nombre', p.nombre,
            'cantidad', cd.cantidad,
            'precio_unitario', cd.precio_unitario
          )
        ) as items
      FROM compras c
      LEFT JOIN compras_detalle cd ON c.id = cd.compra_id
      LEFT JOIN productos p ON cd.producto_id = p.id
      WHERE c.usuario_id = ?
      GROUP BY c.id
      ORDER BY c.fecha_compra DESC`,
      [usuario_id]
    );
    
    // Parsear los items de JSON
    const comprasFormateadas = compras.map(compra => ({
      ...compra,
      items: compra.items ? JSON.parse(`[${compra.items}]`) : []
    }));
    
    res.json({ ok: true, compras: comprasFormateadas });
  } catch (error) {
    console.error('❌ Error obteniendo historial:', error);
    res.status(500).json({ ok: false, message: 'Error al obtener historial' });
  }
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ ok: false, message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor backend corriendo en puerto ${PORT}`);
});