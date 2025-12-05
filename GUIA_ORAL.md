# 🎯 GUÍA PARA EL ORAL - DELTASTYLE APP

## 📱 ¿QUÉ ES LA APP?

**DELTASTYLE** es una aplicación móvil de e-commerce (tienda online) desarrollada con **React Native** y **Expo**. Permite a los usuarios comprar ropa, gestionar favoritos, y tiene un panel de administración para gestionar productos.

---

## 🏗️ ARQUITECTURA GENERAL

### Frontend (React Native)
```
- Interfaz móvil con React Native
- Navegación con React Navigation (tabs + stack)
- Estado global con React Context API
- Almacenamiento local con AsyncStorage
```

### Backend (Node.js + Express)
```
- API REST con Express
- Base de datos MySQL
- Arquitectura MVC (Modelo-Vista-Controlador)
- Autenticación con bcrypt
```

---

## 📂 ESTRUCTURA DE CARPETAS

### 📁 Raíz del Proyecto
```
delta/
├── App.js                 # Punto de entrada de la app
├── index.js              # Registro de la app con Expo
├── MainTabs.js           # [No usado actualmente]
├── package.json          # Dependencias del frontend
├── componentes/          # Pantallas y contextos
├── image/                # Imágenes de productos
├── backend/              # Servidor Node.js
└── sql/                  # Scripts de base de datos
```

### 📁 /componentes (Frontend)
```
componentes/
├── LoginScreen.js        # Pantalla de inicio de sesión
├── RegistroScreen.js     # Pantalla de registro
├── HomeScreen.js         # Pantalla principal (catálogo)
├── CartScreen.js         # Carrito de compras
├── ProfileScreen.js      # Perfil del usuario
├── SettingsScreen.js     # Ajustes de la app
├── AdminScreen.js        # Panel de administración
├── FavoritesScreen.js    # Modal de favoritos
├── UserContext.js        # Contexto de autenticación
├── CartContext.js        # Contexto del carrito
└── FavoritesContext.js   # Contexto de favoritos
```

### 📁 /backend (Backend)
```
backend/
├── server.js             # Servidor principal
├── package.json          # Dependencias del backend
├── config/
│   └── database.js       # Configuración de MySQL
├── models/
│   ├── User.js          # Modelo de usuarios
│   ├── Product.js       # Modelo de productos
│   └── Favorite.js      # Modelo de favoritos
├── controllers/
│   ├── authController.js      # Lógica de login/registro
│   ├── productController.js   # Lógica de productos
│   └── favoriteController.js  # Lógica de favoritos
└── routes/
    ├── authRoutes.js          # Rutas de autenticación
    ├── productRoutes.js       # Rutas de productos
    └── favoriteRoutes.js      # Rutas de favoritos
```

---

## 🎨 COMPONENTES PRINCIPALES

### 1️⃣ App.js - **Punto de Entrada**
**¿Qué hace?**
- Configura los providers (contextos globales)
- Decide si mostrar Login o la app según el estado de autenticación
- Gestiona el tema claro/oscuro

**Orden de Providers:**
```javascript
UserProvider       // Autenticación
  └── FavoritesProvider   // Favoritos
      └── CartProvider    // Carrito
          └── AppContent  // App
```

**Flujo:**
1. Si `isAuthenticated = false` → Muestra **Login/Registro**
2. Si `isAuthenticated = true` → Muestra **MainTabs**

---

### 2️⃣ LoginScreen.js - **Inicio de Sesión**
**¿Qué hace?**
- Formulario de login (email + contraseña)
- Llama al backend: `POST /auth/login`
- Si es exitoso, guarda el usuario en **UserContext**
- Guarda sesión en **AsyncStorage**

**Credenciales de Admin:**
- Email: `admin@deltastyle.com`
- Password: `admin123`

**Código clave:**
```javascript
const response = await fetch(`${BASE_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ correo, contrasena })
});
```

---

### 3️⃣ RegistroScreen.js - **Registro de Usuario**
**¿Qué hace?**
- Formulario de registro (nombre, email, contraseña)
- Llama al backend: `POST /auth/register`
- El backend hashea la contraseña con **bcrypt**
- Inicia sesión automáticamente después del registro

**Validaciones:**
- Email válido con @
- Contraseña mínimo 6 caracteres
- Nombre no vacío

---

### 4️⃣ HomeScreen.js - **Catálogo de Productos**
**¿Qué hace?**
- Muestra todos los productos en una lista
- Botón de corazón (❤️) para agregar/quitar favoritos
- Botón "Añadir" para agregar al carrito
- Botón en el header para ver favoritos (modal)

**Carga de productos:**
```javascript
// CartContext hace fetch al backend
GET /productos
// Mapea las imágenes locales
imageMap['Polo.jpg'] → require('../image/Polo.jpg')
```

**Funciones clave:**
- `addToCart(product)` - Agregar al carrito
- `toggleFavorite(product)` - Marcar como favorito

---

### 5️⃣ CartScreen.js - **Carrito de Compras**
**¿Qué hace?**
- Muestra productos agregados al carrito
- Permite cambiar cantidad (+/-)
- Calcular subtotal automáticamente
- Botón "Comprar ahora" para finalizar compra
- Botón "Vaciar carrito"

**Funciones principales:**
```javascript
updateItemQuantity(id, change)  // +1 o -1
removeFromCart(id)               // Eliminar producto
completePurchase()               // Finalizar compra
```

**Flujo de compra:**
1. Usuario presiona "Comprar ahora"
2. Alert de confirmación
3. Se guarda en `purchaseHistory`
4. Se vacía el carrito

---

### 6️⃣ ProfileScreen.js - **Perfil del Usuario**
**¿Qué hace?**
- Muestra info del usuario (nombre, email, foto)
- Sección "Mi cuenta": editar nombre, email, contraseña
- Sección "Mis compras": ver carrito e historial
- Sección "Configuración": ajustes y tema
- Botón "Cerrar sesión"

**Diferencias Admin vs Usuario Normal:**
```
ADMIN:
- ✅ Puede cambiar foto
- ❌ NO puede editar nombre
- ❌ NO puede editar email
- ❌ NO puede cambiar contraseña
- ❌ NO puede eliminar cuenta
- ✅ Botón "Panel de Administración"

USUARIO NORMAL:
- ✅ Puede editar TODO
- ❌ NO tiene botón de admin
```

**Modales:**
- Modal para cambiar nombre
- Modal para editar email
- Modal para cambiar contraseña

---

### 7️⃣ AdminScreen.js - **Panel de Administración**
**¿Qué hace?**
- CRUD completo de productos (Create, Read, Update, Delete)
- Solo visible si `user.esAdmin = true`
- Formulario para agregar/editar productos

**Campos del producto:**
- Nombre
- Precio
- Imagen (nombre del archivo)
- Categoría
- Stock
- Descripción

**Operaciones:**
```javascript
POST /productos        // Crear producto
PUT /productos/:id     // Actualizar producto
DELETE /productos/:id  // Eliminar producto (soft delete)
```

---

### 8️⃣ FavoritesScreen.js - **Modal de Favoritos**
**¿Qué hace?**
- Muestra productos marcados como favoritos
- Permite agregar al carrito desde favoritos
- Permite quitar de favoritos

**Carga:**
```javascript
GET /favoritos/user/:userId
// Retorna productos con JOIN a tabla productos
```

---

## 🔄 CONTEXTOS (Estado Global)

### UserContext.js
**Gestiona:** Autenticación y datos del usuario

**Estado:**
```javascript
{
  isAuthenticated: false,    // ¿Está logueado?
  isLoading: true,           // ¿Cargando sesión?
  user: {
    id: null,
    nombre: '',
    correo: '',
    foto: null,
    esAdmin: false
  }
}
```

**Funciones:**
- `login(userData)` - Iniciar sesión
- `logout()` - Cerrar sesión
- `updateUser(newData)` - Actualizar perfil

**Persistencia:**
- Guarda en AsyncStorage con clave `@user_session`
- Al abrir la app, lee AsyncStorage para mantener sesión

---

### CartContext.js
**Gestiona:** Carrito de compras y productos

**Estado:**
```javascript
{
  cartItems: [],           // Productos en el carrito
  products: [],            // Catálogo completo
  purchaseHistory: [],     // Historial de compras
  subtotal: 0             // Total calculado
}
```

**Funciones:**
- `addToCart(product)` - Agregar producto
- `updateItemQuantity(id, change)` - Cambiar cantidad
- `removeFromCart(id)` - Eliminar del carrito
- `clearCart()` - Vaciar carrito
- `completePurchase()` - Finalizar compra
- `getProducts()` - Obtener catálogo

**Carga de productos:**
1. Hace `fetch` a `/productos`
2. Mapea imágenes con `imageMap`
3. Si falla, usa productos hardcodeados

---

### FavoritesContext.js
**Gestiona:** Favoritos del usuario

**Estado:**
```javascript
{
  favorites: [],          // IDs de productos favoritos
  favoritesDetails: []    // Productos completos
}
```

**Funciones:**
- `toggleFavorite(product)` - Agregar/quitar favorito
- `isFavorite(productId)` - Verificar si es favorito
- `loadFavorites()` - Cargar del backend

**Persistencia:**
- Backend: tabla `favoritos` con user_id y product_id
- Frontend: caché en AsyncStorage

---

## 🔙 BACKEND - ARQUITECTURA MVC

### ¿Qué es MVC?
**Modelo-Vista-Controlador** (patrón de diseño)

```
Cliente (App) 
    ↓
Routes (Rutas)          → Define las URLs
    ↓
Controllers (Lógica)    → Procesa la petición
    ↓
Models (Base de Datos)  → Consulta/modifica datos
    ↓
Respuesta al Cliente
```

---

### 📁 config/database.js
**¿Qué hace?**
- Configura la conexión a MySQL
- Crea un pool de conexiones (hasta 10 simultáneas)

**Configuración:**
```javascript
{
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'deltadb',
  connectionLimit: 10
}
```

---

### 📁 models/User.js
**¿Qué hace?**
- Gestiona operaciones de usuarios en la BD

**Funciones principales:**
```javascript
create(nombre, correo, contrasena)
  → Hashea la contraseña con bcrypt
  → INSERT INTO usuarios

findByEmail(correo)
  → SELECT * FROM usuarios WHERE correo = ?

verifyPassword(plainPassword, hashedPassword)
  → bcrypt.compare() - Verifica sin desencriptar
```

**bcrypt:**
- Hashea contraseñas (no se guardan en texto plano)
- Salt rounds: 10
- Ejemplo: `123456` → `$2b$10$abc123...`

---

### 📁 models/Product.js
**Operaciones CRUD:**
```javascript
getAll()        → SELECT * FROM productos WHERE activo = 1
getById(id)     → SELECT * WHERE id = ?
create(data)    → INSERT INTO productos
update(id, data)→ UPDATE productos WHERE id = ?
delete(id)      → UPDATE SET activo = 0 (soft delete)
```

**Soft Delete:**
- No elimina físicamente el registro
- Solo marca `activo = 0`
- Permite recuperar datos después

---

### 📁 models/Favorite.js
**Operaciones:**
```javascript
add(userId, productId)
  → INSERT INTO favoritos
  → Si ya existe, no hace nada (manejo de duplicados)

remove(userId, productId)
  → DELETE FROM favoritos WHERE ...

getUserFavorites(userId)
  → SELECT con JOIN a productos
  → Retorna productos completos, no solo IDs
```

---

### 📁 controllers/authController.js
**¿Qué hace?**
- Maneja la lógica de login y registro

**register:**
1. Valida que el email no exista
2. Llama a `User.create()` (hashea contraseña)
3. Retorna éxito

**login:**
1. Busca usuario por email con `User.findByEmail()`
2. Verifica contraseña con `User.verifyPassword()`
3. Si es correcto, retorna datos del usuario

**Respuestas:**
```javascript
{ ok: true, message: '...', user: {...} }
{ ok: false, message: 'Error' }
```

---

### 📁 controllers/productController.js
**Funciones:**
- `getAllProducts` → Llama a `Product.getAll()`
- `getProductById` → Llama a `Product.getById(id)`
- `createProduct` → Llama a `Product.create(data)`
- `updateProduct` → Llama a `Product.update(id, data)`
- `deleteProduct` → Llama a `Product.delete(id)`

**Validaciones:**
- Precio > 0
- Nombre no vacío
- Stock >= 0

---

### 📁 routes/authRoutes.js
**Define las rutas:**
```javascript
POST /auth/register  → authController.register
POST /auth/login     → authController.login
```

**Explicación:**
- `router.post('/register', ...)` define la URL
- Cuando llega una petición, ejecuta el controller

---

### 📁 server.js
**Servidor principal:**

**Configuración:**
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());              // Permite peticiones desde la app
app.use(express.json());      // Parsea JSON en el body
```

**Rutas:**
```javascript
app.use('/auth', authRoutes);
app.use('/productos', productRoutes);
app.use('/favoritos', favoriteRoutes);
```

**Puerto:**
```javascript
app.listen(3000, () => {
  console.log('Servidor en puerto 3000');
});
```

---

## 🗄️ BASE DE DATOS (MySQL)

### Tabla: usuarios
```sql
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  contrasena VARCHAR(255) NOT NULL,  -- Hash de bcrypt
  foto VARCHAR(255),
  es_admin TINYINT DEFAULT 0,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Ejemplo:**
```
id | nombre | correo              | contrasena (hash)  | es_admin
1  | Admin  | admin@deltastyle... | $2b$10$abc...     | 1
2  | Juan   | juan@test.com       | $2b$10$xyz...     | 0
```

---

### Tabla: productos
```sql
CREATE TABLE productos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  imagen VARCHAR(255),
  categoria VARCHAR(50),
  stock INT DEFAULT 0,
  descripcion TEXT,
  activo TINYINT DEFAULT 1,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Productos iniciales:**
- Polo boxy fit oscuro - $89.99
- Jean baggy camuflado - $59.90
- Jorts baggy - $35.50
- Bermuda baggy cargo - $15.00
- Hoodie boxy fit - $120.00
- Polar zip oversize - $199.99

---

### Tabla: favoritos
```sql
CREATE TABLE favoritos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  producto_id INT NOT NULL,
  fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id),
  UNIQUE(usuario_id, producto_id)  -- Un usuario no puede repetir favoritos
);
```

**Relación:**
- `usuario_id` → usuarios.id
- `producto_id` → productos.id
- UNIQUE evita duplicados

---

## 🔐 SEGURIDAD

### bcrypt - Hashing de Contraseñas
**¿Qué es?**
- Algoritmo de encriptación de una sola vía
- No se puede desencriptar (irreversible)

**¿Cómo funciona?**
```javascript
// Al registrar
const hash = await bcrypt.hash('123456', 10);
// Resultado: $2b$10$abc123...xyz (60 caracteres)

// Al hacer login
const match = await bcrypt.compare('123456', hash);
// Retorna true o false
```

**Salt Rounds (10):**
- Más rounds = más seguro pero más lento
- 10 es el estándar recomendado

---

### AsyncStorage - Persistencia Local
**¿Qué es?**
- Almacenamiento local del dispositivo
- Similar a localStorage en web
- Datos persisten aunque cierres la app

**Uso:**
```javascript
// Guardar
await AsyncStorage.setItem('@user_session', JSON.stringify(user));

// Leer
const userJson = await AsyncStorage.getItem('@user_session');
const user = JSON.parse(userJson);

// Eliminar
await AsyncStorage.removeItem('@user_session');
```

---

## 🎨 NAVEGACIÓN

### React Navigation
**Tipos de navegación:**

1. **Stack Navigator** (AuthStack)
   - Login → Registro
   - Pantallas apiladas (back button)

2. **Tab Navigator** (MainTabs)
   - Inicio | Carrito | Mi Perfil | Ajustes | Admin
   - Barra inferior con íconos

**Condicional:**
```javascript
{isAuthenticated ? <MainTabs /> : <AuthStack />}
```

---

## 💡 FLUJOS PRINCIPALES

### 1. Flujo de Registro
```
Usuario completa formulario
    ↓
POST /auth/register
    ↓
Backend hashea contraseña con bcrypt
    ↓
INSERT en tabla usuarios
    ↓
Login automático
    ↓
Guarda sesión en AsyncStorage
    ↓
Navega a HomeScreen
```

---

### 2. Flujo de Login
```
Usuario ingresa email y contraseña
    ↓
POST /auth/login
    ↓
Backend busca usuario por email
    ↓
bcrypt.compare(password, hash)
    ↓
Si coincide, retorna datos del usuario
    ↓
Frontend guarda en UserContext
    ↓
Guarda en AsyncStorage
    ↓
isAuthenticated = true
    ↓
Muestra MainTabs
```

---

### 3. Flujo de Agregar Favorito
```
Usuario hace click en ❤️
    ↓
Frontend: toggleFavorite(product)
    ↓
POST /favoritos/add
    ↓
Backend: INSERT INTO favoritos
    ↓
Frontend actualiza estado local
    ↓
Ícono cambia a ❤️ (rojo)
```

---

### 4. Flujo de Compra
```
Usuario agrega productos al carrito
    ↓
Click en "Comprar ahora"
    ↓
Alert de confirmación
    ↓
completePurchase()
    ↓
Guarda en purchaseHistory
    ↓
Vacía el carrito
    ↓
Alert "Compra exitosa"
```

---

### 5. Flujo de CRUD de Productos (Admin)
```
Admin hace click en "Agregar Producto"
    ↓
Completa formulario
    ↓
POST /productos
    ↓
Backend: INSERT INTO productos
    ↓
Frontend refresca lista
    ↓
Nuevo producto visible en HomeScreen
```

---

## 🚀 CÓMO EJECUTAR EL PROYECTO

### 1. Iniciar Backend
```bash
cd backend
node server.js
```
✅ Servidor en http://localhost:3000

### 2. Iniciar Frontend
```bash
npx expo start
```
✅ Escanea QR con Expo Go

### 3. Base de Datos
- XAMPP corriendo con MySQL
- Base de datos: `deltadb`
- Importar: `sql/deltadb.sql`

---

## 📊 TECNOLOGÍAS USADAS

### Frontend
- **React Native** - Framework móvil
- **Expo** - Herramientas de desarrollo
- **React Navigation** - Navegación
- **AsyncStorage** - Almacenamiento local
- **Expo Vector Icons** - Íconos

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MySQL2** - Driver de MySQL
- **bcrypt** - Hashing de contraseñas
- **CORS** - Permite peticiones cross-origin

---

## 🎯 PREGUNTAS FRECUENTES DEL ORAL

### 1. ¿Por qué usaste React Native?
"Porque permite desarrollar apps móviles para iOS y Android con un solo código JavaScript, es más rápido que desarrollar nativo y tiene una gran comunidad."

### 2. ¿Qué es el Context API?
"Es el sistema de estado global de React. Permite compartir datos entre componentes sin tener que pasar props manualmente. Usé 3 contextos: UserContext (autenticación), CartContext (carrito) y FavoritesContext (favoritos)."

### 3. ¿Por qué usaste bcrypt?
"Para proteger las contraseñas de los usuarios. bcrypt genera un hash irreversible, así que aunque alguien acceda a la base de datos, no puede ver las contraseñas reales."

### 4. ¿Qué es MVC?
"Es un patrón de diseño que separa la aplicación en 3 capas: Modelo (acceso a datos), Vista (interfaz, en mi caso la app móvil), y Controlador (lógica de negocio). Esto hace el código más organizado y mantenible."

### 5. ¿Cómo funciona la autenticación?
"El usuario ingresa su email y contraseña, el backend verifica con bcrypt, si es correcto retorna los datos del usuario, el frontend los guarda en AsyncStorage para mantener la sesión activa, y en el Context para que toda la app tenga acceso."

### 6. ¿Por qué 2 carpetas node_modules?
"Porque el frontend (React Native) y el backend (Express) son proyectos independientes con diferentes dependencias. Cada uno necesita sus propios paquetes."

### 7. ¿Qué es AsyncStorage?
"Es el sistema de almacenamiento local de React Native. Lo uso para guardar la sesión del usuario, así cuando cierra la app y la vuelve a abrir, sigue logueado."

### 8. ¿Cómo se comunica el frontend con el backend?
"Mediante peticiones HTTP usando fetch(). Por ejemplo, para login hago un POST a http://192.168.100.7:3000/auth/login con el email y contraseña."

### 9. ¿Qué diferencia hay entre admin y usuario normal?
"El admin tiene acceso al AdminScreen donde puede crear, editar y eliminar productos. También no puede editar su perfil para mantener la seguridad. Los usuarios normales pueden comprar, agregar favoritos, y gestionar su cuenta."

### 10. ¿Cómo manejas las imágenes?
"Las imágenes están guardadas localmente en la carpeta /image. En la base de datos solo guardo el nombre del archivo (ej: 'Polo.jpg'). Luego uso un objeto imageMap para hacer el require() de la imagen correcta."

---

## ✅ CHECKLIST PARA EL ORAL

Asegúrate de poder explicar:
- [ ] Arquitectura general (Frontend + Backend)
- [ ] ¿Qué es React Native y por qué lo usaste?
- [ ] ¿Qué es Expo?
- [ ] Context API: ¿qué es y cuáles usas?
- [ ] Navegación: Stack vs Tabs
- [ ] Backend: ¿qué es MVC?
- [ ] Base de datos: 3 tablas y sus relaciones
- [ ] bcrypt: ¿por qué y cómo funciona?
- [ ] AsyncStorage: ¿para qué sirve?
- [ ] Diferencias entre admin y usuario
- [ ] Flujo completo: registro → login → compra

---

## 🎓 CONSEJOS PARA EL ORAL

1. **Abre la app mientras explicas** - Es más fácil mostrar que explicar
2. **Empieza por lo general** - "Es una app de e-commerce con React Native..."
3. **Usa analogías** - "MVC es como una fábrica: el modelo es el almacén, el controlador es el trabajador, y la vista es la tienda"
4. **Sé honesto** - Si no sabes algo, di "No profundicé en eso pero sé que..."
5. **Destaca lo importante** - bcrypt, MVC, Context API, AsyncStorage
6. **Muestra el código organizado** - "Como ves, separé todo en carpetas lógicas..."

---

## 🔥 PUNTOS FUERTES A DESTACAR

1. ✅ **Arquitectura profesional MVC**
2. ✅ **Seguridad con bcrypt**
3. ✅ **Persistencia de sesión con AsyncStorage**
4. ✅ **Sistema de roles (admin/usuario)**
5. ✅ **CRUD completo de productos**
6. ✅ **Sistema de favoritos con backend**
7. ✅ **Carrito de compras funcional**
8. ✅ **Modo oscuro/claro**
9. ✅ **Código organizado y escalable**
10. ✅ **Base de datos relacional con MySQL**

---

¡ÉXITO EN TU ORAL! 🚀
