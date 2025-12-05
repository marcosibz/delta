# 🚀 GUÍA RÁPIDA - SOLUCIÓN DE PROBLEMAS

## ✅ PROBLEMA RESUELTO

### El problema era:
1. ❌ Faltaban las tablas `productos` y `favoritos` en la base de datos
2. ❌ El servidor backend no podía responder a las peticiones

### Lo que se hizo:
1. ✅ Se ejecutó el script `backend/setupDatabase.js`
2. ✅ Se crearon las tablas faltantes
3. ✅ Se insertaron 6 productos iniciales
4. ✅ Se configuró el usuario administrador
5. ✅ El servidor backend está corriendo en el puerto 3000

---

## 📱 AHORA PUEDES:

### 1. Registrar un Usuario Nuevo
- Abre la app en Expo
- Click en "Registrarme"
- Completa los datos
- ¡Ya puedes hacer login!

### 2. Iniciar Sesión como Admin
```
Email: admin@deltastyle.com
Contraseña: admin123
```

---

## 🔧 SI EL PROBLEMA PERSISTE:

### Verificar que el backend esté corriendo:
```bash
# En una terminal:
cd backend
node server.js

# Deberías ver:
✅ Servidor backend corriendo en puerto 3000
```

### Verificar la conexión:
```bash
cd backend
node testConnection.js
```

### Reiniciar todo desde cero:
```bash
# 1. Detener todos los procesos
Ctrl+C en todas las terminales

# 2. Configurar la base de datos
node backend\setupDatabase.js

# 3. Iniciar el backend
cd backend
node server.js

# 4. En otra terminal, iniciar la app
npx expo start
```

---

## 📋 SOBRE LOS 2 NODE_MODULES

**Es CORRECTO tener 2 carpetas `node_modules`:**

### 📁 `/node_modules` (Raíz)
- Dependencias del frontend
- React Native, Expo, React Navigation
- ~800-1000 paquetes

### 📁 `/backend/node_modules` (Backend)
- Dependencias del servidor
- Express, MySQL, bcrypt, CORS
- ~180 paquetes

**¿Por qué?** Son 2 proyectos separados:
- **Frontend**: App móvil con React Native
- **Backend**: Servidor API con Express

**NO elimines ninguno**, ambos son necesarios.

---

## 🎯 CHECKLIST DE VERIFICACIÓN

Antes de iniciar la app, verifica que:

- [ ] MySQL está corriendo (XAMPP/WAMP)
- [ ] Base de datos `deltadb` existe
- [ ] Tablas: `usuarios`, `productos`, `favoritos` existen
- [ ] Backend corriendo en puerto 3000 (`node backend/server.js`)
- [ ] App de Expo iniciada (`npx expo start`)

---

## 💡 COMANDOS ÚTILES

### Ver procesos en puerto 3000:
```powershell
Get-NetTCPConnection -LocalPort 3000
```

### Matar proceso en puerto 3000:
```powershell
Get-NetTCPConnection -LocalPort 3000 | 
  Select-Object -ExpandProperty OwningProcess | 
  ForEach-Object { Stop-Process -Id $_ -Force }
```

### Verificar MySQL:
```powershell
Get-Process mysqld
```

---

## 📞 SI NADA FUNCIONA:

1. Asegúrate que XAMPP/WAMP están corriendo
2. Ejecuta: `node backend\setupDatabase.js`
3. Inicia el backend: `cd backend; node server.js`
4. Abre otra terminal e inicia Expo: `npx expo start`
5. Escanea el QR con Expo Go

---

**¡Ahora sí debería funcionar todo! 🎉**
