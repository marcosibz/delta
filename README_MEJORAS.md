# DELTASTYLE Store - Aplicación React Native

## 🎉 Nuevas Funcionalidades Implementadas

### ✅ Backend Profesional
- **Arquitectura MVC**: Separación en Modelos, Controladores y Rutas
- **Seguridad con bcrypt**: Contraseñas hasheadas
- **API REST organizada**: Endpoints claros y estructurados
- **Base de datos MySQL**: Tablas de usuarios, productos y favoritos

### ✅ Autenticación Persistente
- **AsyncStorage**: La sesión se mantiene aunque cierres la app
- **Login automático**: Al abrir la app, si hay sesión guardada, ingresa automáticamente

### ✅ Sistema de Favoritos
- **Corazón en productos**: Toca el corazón para agregar/quitar de favoritos
- **Menú desplegable**: Botón de corazón junto a la lupa muestra tus favoritos
- **Sincronización**: Los favoritos se guardan en la base de datos y en caché local

### ✅ Panel de Administración
- **CRUD de productos**: Crear, editar y eliminar productos
- **Solo para administradores**: Aparece un botón especial en el perfil
- **Sincronización automática**: Los cambios se reflejan inmediatamente en la app

### ✅ Carga Dinámica de Productos
- Los productos se cargan desde la base de datos
- Se actualizan automáticamente cuando el admin hace cambios

---

## 📋 Instrucciones de Instalación

### 1. Configurar la Base de Datos

1. Abre **phpMyAdmin** o tu cliente MySQL
2. Ejecuta el script SQL completo:
   ```bash
   source C:\Users\SOY DE RIVER\OneDrive\Escritorio\delta\sql\deltadb.sql
   ```

Esto creará:
- Base de datos `deltadb`
- Tabla `usuarios` con campo `es_admin`
- Tabla `productos` con 6 productos iniciales
- Tabla `favoritos`
- Usuario administrador: `admin@deltastyle.com` / `admin123`

### 2. Iniciar el Backend

```bash
cd backend
npm install
node server.js
```

Deberías ver: `✅ Servidor backend corriendo en puerto 3000`

### 3. Iniciar la Aplicación

```bash
npm install
npx expo start
```

---

## 🔐 Usuarios de Prueba

### Usuario Administrador
- **Email**: `admin@deltastyle.com`
- **Contraseña**: `admin123`
- **Permisos**: Acceso al panel de administración

### Usuario Normal
Regístrate desde la app para crear un usuario normal

---

## 🎯 Cómo Usar las Nuevas Funciones

### Favoritos
1. En la pantalla de inicio, toca el **corazón** en cualquier producto
2. Para ver tus favoritos, toca el **corazón rojo** junto a la lupa
3. En el menú de favoritos puedes añadir al carrito o quitar de favoritos

### Panel de Administración (Solo Admin)
1. Inicia sesión con la cuenta de administrador
2. Ve a **Mi Perfil**
3. Verás un botón azul **"Panel de Administración"** o la pestaña **"Admin"**
4. Ahí puedes:
   - ➕ Agregar nuevos productos
   - ✏️ Editar productos existentes
   - 🗑️ Eliminar productos

**Nota**: Las imágenes deben estar en la carpeta `image/` y solo debes poner el nombre del archivo (ej: `Polo.jpg`)

### Persistencia de Sesión
- Tu sesión se guarda automáticamente
- Al cerrar y abrir la app, seguirás logueado
- Para cerrar sesión ve a **Mi Perfil** → **Cerrar sesión**

---

## 🗂️ Estructura del Proyecto

```
delta/
├── backend/
│   ├── config/
│   │   └── database.js          # Configuración MySQL
│   ├── models/
│   │   ├── User.js              # Modelo de usuarios
│   │   ├── Product.js           # Modelo de productos
│   │   └── Favorite.js          # Modelo de favoritos
│   ├── controllers/
│   │   ├── authController.js    # Login y registro
│   │   ├── productController.js # CRUD de productos
│   │   └── favoriteController.js # Gestión de favoritos
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── favoriteRoutes.js
│   ├── server.js                # Servidor principal
│   └── package.json
│
├── componentes/
│   ├── UserContext.js           # ✨ Contexto de usuario con AsyncStorage
│   ├── FavoritesContext.js      # ✨ Nuevo: Gestión de favoritos
│   ├── CartContext.js           # 🔄 Actualizado: Carga productos del backend
│   ├── LoginScreen.js           # 🔄 Actualizado: Guarda ID y rol de admin
│   ├── HomeScreen.js            # 🔄 Actualizado: Botón de favoritos y corazones
│   ├── FavoritesScreen.js       # ✨ Nuevo: Pantalla de favoritos
│   ├── AdminScreen.js           # ✨ Nuevo: Panel de administración
│   └── ProfileScreen.js         # 🔄 Actualizado: Botón de admin
│
├── sql/
│   └── deltadb.sql              # 🔄 Actualizado con nuevas tablas
│
└── App.js                       # 🔄 Actualizado con FavoritesProvider

✨ = Nuevo
🔄 = Actualizado
```

---

## 🚀 API Endpoints

### Autenticación
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión

### Productos
- `GET /productos` - Obtener todos los productos
- `GET /productos/:id` - Obtener producto por ID
- `POST /productos` - Crear producto (solo admin)
- `PUT /productos/:id` - Actualizar producto (solo admin)
- `DELETE /productos/:id` - Eliminar producto (solo admin)

### Favoritos
- `POST /favoritos/add` - Agregar a favoritos
- `POST /favoritos/remove` - Quitar de favoritos
- `GET /favoritos/user/:userId` - Obtener favoritos del usuario

---

## 🐛 Troubleshooting

### El backend no se conecta a MySQL
- Verifica que XAMPP o WAMP estén corriendo
- Revisa las credenciales en `backend/config/database.js`

### Las imágenes no se cargan
- Asegúrate que las imágenes estén en la carpeta `image/`
- Los nombres deben coincidir exactamente (incluyendo mayúsculas)

### No aparece el panel de administración
- Verifica que estés logueado con la cuenta admin
- Cierra sesión y vuelve a iniciar con `admin@deltastyle.com`

### Los productos no se cargan
- Verifica que el backend esté corriendo
- Revisa que la URL `BASE_URL` en los archivos coincida con tu IP local

---

## 📝 Notas Técnicas

- **bcrypt**: Las contraseñas están hasheadas con 10 salt rounds
- **AsyncStorage**: Guarda la sesión en `@user_session`
- **Favoritos**: Se sincronizan entre servidor y caché local
- **Productos**: Las imágenes se mapean localmente por nombre de archivo

---

## 🎨 Mejoras Futuras Sugeridas

- Upload real de imágenes (Multer en backend + ImagePicker en frontend)
- Sistema de categorías con filtros
- Búsqueda de productos
- Historial de órdenes/compras
- Notificaciones push
- Modo offline más robusto
- Validación de stock antes de añadir al carrito

---

**¡Disfruta tu tienda DELTASTYLE mejorada! 🎉**
