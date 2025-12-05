# Biblioteca_Uppe

Sistema de gestión de biblioteca desarrollado con Django (backend) y React + TypeScript (frontend).

## 📋 Requisitos Previos

- Python 3.8 o superior
- Node.js 16 o superior
- npm o yarn

## 🚀 Configuración del Proyecto

### Backend (Django)

1. **Navegar al directorio del backend:**
   ```bash
   cd backend
   ```

2. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Crear y ejecutar migraciones:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Crear un administrador de prueba:**
   ```bash
   python create_admin.py
   ```
   
   Esto creará un administrador con las siguientes credenciales:
   - **Email:** `admin@test.com`
   - **Contraseña:** `admin123`
   - **Matrícula:** `ADMIN001`

5. **Iniciar el servidor Django:**
   ```bash
   python manage.py runserver
   ```
   
   El backend estará disponible en `http://localhost:8000`

### Frontend (React)

1. **Navegar al directorio del frontend:**
   ```bash
   cd frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   
   El frontend estará disponible en `http://localhost:5173`

## 🔐 Sistema de Autenticación

### Login

El sistema de login está conectado al backend y valida las credenciales contra el modelo `Admin` en la base de datos.

**Credenciales de prueba:**
- Email: `admin@test.com`
- Contraseña: `admin123`

### Endpoints Disponibles

- `POST /login/` - Endpoint de autenticación
  - Body: `{ "email": "admin@test.com", "password": "admin123" }`
  - Respuesta exitosa: `{ "success": true, "message": "Login exitoso", "admin": {...} }`
  - Respuesta de error: `{ "success": false, "message": "Credenciales inválidas" }`

- `GET /ping/` - Endpoint de prueba
  - Respuesta: `{ "status": "ok", "app": "core" }`

## 🗄️ Base de Datos

El proyecto utiliza **SQLite** como base de datos local. La base de datos se crea automáticamente en `backend/db.sqlite3` cuando ejecutas las migraciones.

### Modelos Disponibles

- **Admin** - Administradores del sistema
- **Usuario** - Usuarios de la biblioteca
- **Libro** - Libros disponibles
- **Prestamo** - Registro de préstamos
- **Ventas** - Registro de ventas

## 📁 Estructura del Proyecto

```
Biblioteca_Uppe/
├── backend/                 # Aplicación Django
│   ├── apps/
│   │   └── core/           # App principal
│   │       ├── models.py   # Modelos de la base de datos
│   │       ├── views.py    # Vistas/endpoints
│   │       └── urls.py     # URLs de la app
│   ├── biblioteca/         # Configuración de Django
│   │   ├── settings.py     # Configuración principal
│   │   └── urls.py         # URLs principales
│   ├── manage.py
│   ├── requirements.txt   # Dependencias Python
│   └── create_admin.py    # Script para crear admin de prueba
│
└── frontend/               # Aplicación React
    ├── src/
    │   ├── components/     # Componentes React
    │   │   └── common/    # Componentes comunes (Login, Header)
    │   ├── pages/         # Páginas principales
    │   │   ├── AdminPage.tsx
    │   │   ├── ContactoPage.tsx
    │   │   └── RegistrarUsuario.tsx
    │   ├── App.tsx        # Componente principal
    │   └── main.tsx       # Punto de entrada
    ├── package.json       # Dependencias Node.js
    └── vite.config.ts     # Configuración de Vite
```

## 🔧 Configuración Técnica

### Backend

- **Framework:** Django 4.2+
- **API:** Django REST Framework
- **CORS:** django-cors-headers (configurado para `localhost:5173`)
- **Base de datos:** SQLite3
- **Autenticación:** Hash de contraseñas con Django (PBKDF2)

### Frontend

- **Framework:** React 19.2
- **Lenguaje:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Estilos:** CSS personalizado

## 📝 Notas Importantes

1. **CORS:** El backend está configurado para aceptar peticiones desde `http://localhost:5173` y `http://127.0.0.1:5173`. Si cambias el puerto del frontend, actualiza la configuración en `backend/biblioteca/settings.py`.

2. **Contraseñas:** Las contraseñas se hashean automáticamente al guardar en la base de datos usando el sistema de hash de Django.

3. **Migraciones:** Si modificas los modelos, recuerda ejecutar:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Admin de Prueba:** El script `create_admin.py` solo crea un admin si no existe uno con el mismo email. Puedes modificar el script para crear más administradores.

## 🐛 Solución de Problemas

### Error de CORS
Si ves errores de CORS, verifica que:
- El backend esté corriendo en `http://localhost:8000`
- El frontend esté corriendo en `http://localhost:5173`
- La configuración de CORS en `settings.py` incluya el puerto correcto

### Error de conexión
Si el frontend no puede conectarse al backend:
- Verifica que el servidor Django esté corriendo
- Verifica que la URL en `Login_Form.tsx` sea `http://localhost:8000/login/`
- Revisa la consola del navegador para ver errores específicos

### Error de migraciones
Si hay problemas con las migraciones:
```bash
# Eliminar migraciones (cuidado: esto eliminará datos)
rm backend/apps/core/migrations/0001_initial.py
python manage.py makemigrations
python manage.py migrate
```

## 📄 Licencia

Ver archivo LICENSE para más detalles.
