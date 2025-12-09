# API de Libros - Documentación

Esta documentación describe los endpoints disponibles para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la base de datos de libros.

## Base URL
```
http://localhost:8000/api/
```

---

## 1. Crear un Libro

### Endpoint
```
POST /libro/crear/
```

### Descripción
Crea un nuevo libro en la base de datos.

### Request Body
```json
{
  "nombre_libro": "El Quijote",
  "autor": "Miguel de Cervantes",
  "descripcion": "Una novela clásica de la literatura española",
  "fecha_publicacion": "1605-01-16",
  "total_libros": 5,
  "status": true
}
```

### Parámetros
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| nombre_libro | string | Sí | Nombre del libro |
| autor | string | Sí | Autor del libro |
| descripcion | string | No | Descripción del libro |
| fecha_publicacion | string (YYYY-MM-DD) | Sí | Fecha de publicación |
| total_libros | integer | No | Cantidad de copias (default: 1) |
| status | boolean | No | Estado del libro (default: false) |

### Response - Success (201)
```json
{
  "success": true,
  "message": "Libro creado exitosamente",
  "libro": {
    "id": 1,
    "nombre_libro": "El Quijote",
    "autor": "Miguel de Cervantes",
    "descripcion": "Una novela clásica de la literatura española",
    "fecha_publicacion": "1605-01-16",
    "total_libros": 5,
    "status": true,
    "fecha_creacion": "2024-01-15T10:30:00Z"
  }
}
```

### Response - Error (400/500)
```json
{
  "success": false,
  "message": "El nombre del libro es requerido"
}
```

### Ejemplo cURL
```bash
curl -X POST http://localhost:8000/api/libro/crear/ \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_libro": "El Quijote",
    "autor": "Miguel de Cervantes",
    "descripcion": "Una novela clásica de la literatura española",
    "fecha_publicacion": "1605-01-16",
    "total_libros": 5,
    "status": true
  }'
```

---

## 2. Obtener Libros

### Endpoint
```
GET /libro/obtener/
```

### Descripción
Obtiene la lista de todos los libros o un libro específico por ID.

### Query Parameters
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| id | integer | No | ID del libro específico a obtener |

### Response - Obtener Todos (200)
```json
{
  "success": true,
  "message": "Libros obtenidos exitosamente",
  "libros": [
    {
      "id": 1,
      "nombre_libro": "El Quijote",
      "autor": "Miguel de Cervantes",
      "descripcion": "Una novela clásica de la literatura española",
      "fecha_publicacion": "1605-01-16",
      "total_libros": 5,
      "status": true,
      "fecha_creacion": "2024-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "nombre_libro": "Cien Años de Soledad",
      "autor": "Gabriel García Márquez",
      "descripcion": null,
      "fecha_publicacion": "1967-05-30",
      "total_libros": 3,
      "status": false,
      "fecha_creacion": "2024-01-15T10:35:00Z"
    }
  ]
}
```

### Response - Obtener por ID (200)
```json
{
  "success": true,
  "message": "Libro obtenido exitosamente",
  "libro": {
    "id": 1,
    "nombre_libro": "El Quijote",
    "autor": "Miguel de Cervantes",
    "descripcion": "Una novela clásica de la literatura española",
    "fecha_publicacion": "1605-01-16",
    "total_libros": 5,
    "status": true,
    "fecha_creacion": "2024-01-15T10:30:00Z"
  }
}
```

### Ejemplo cURL
```bash
# Obtener todos los libros
curl -X GET http://localhost:8000/api/libro/obtener/

# Obtener libro con ID 1
curl -X GET http://localhost:8000/api/libro/obtener/?id=1
```

---

## 3. Editar un Libro

### Endpoint
```
PUT /libro/editar/
```

### Descripción
Edita un libro existente. Solo los campos incluidos en el request serán actualizados.

### Request Body
```json
{
  "id": 1,
  "nombre_libro": "El Quijote - Edición Revisada",
  "total_libros": 10,
  "status": false
}
```

### Parámetros
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | integer | Sí | ID del libro a editar |
| nombre_libro | string | No | Nuevo nombre del libro |
| autor | string | No | Nuevo autor |
| descripcion | string | No | Nueva descripción |
| fecha_publicacion | string (YYYY-MM-DD) | No | Nueva fecha de publicación |
| total_libros | integer | No | Nueva cantidad de copias |
| status | boolean | No | Nuevo estado |

### Response - Success (200)
```json
{
  "success": true,
  "message": "Libro actualizado exitosamente",
  "libro": {
    "id": 1,
    "nombre_libro": "El Quijote - Edición Revisada",
    "autor": "Miguel de Cervantes",
    "descripcion": "Una novela clásica de la literatura española",
    "fecha_publicacion": "1605-01-16",
    "total_libros": 10,
    "status": false,
    "fecha_creacion": "2024-01-15T10:30:00Z"
  }
}
```

### Ejemplo cURL
```bash
curl -X PUT http://localhost:8000/api/libro/editar/ \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "nombre_libro": "El Quijote - Edición Revisada",
    "total_libros": 10,
    "status": false
  }'
```

---

## 4. Eliminar un Libro

### Endpoint
```
DELETE /libro/eliminar/
```

### Descripción
Elimina un libro de la base de datos de forma permanente.

### Request Body
```json
{
  "id": 1
}
```

### Parámetros
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | integer | Sí | ID del libro a eliminar |

### Response - Success (200)
```json
{
  "success": true,
  "message": "Libro 'El Quijote' eliminado exitosamente"
}
```

### Response - Error (404)
```json
{
  "success": false,
  "message": "Libro no encontrado"
}
```

### Ejemplo cURL
```bash
curl -X DELETE http://localhost:8000/api/libro/eliminar/ \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1
  }'
```

---

## Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos o incompletos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## Notas Importantes

1. **Formato de Fecha**: Todas las fechas deben estar en formato `YYYY-MM-DD`
2. **CSRF Exempt**: Todos los endpoints tienen `@csrf_exempt` para permitir solicitudes desde el frontend
3. **Validaciones**: Los campos requeridos son validados en el servidor
4. **Respuestas**: Todas las respuestas están en formato JSON
5. **Manejo de Errores**: Los errores incluyen mensajes descriptivos para facilitar el debugging

---

## Ejemplos de Integración en Frontend (React)

### Crear un libro
```javascript
async function crearLibro(datosLibro) {
  try {
    const response = await fetch('http://localhost:8000/api/libro/crear/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosLibro)
    });
    
    const data = await response.json();
    if (data.success) {
      console.log('Libro creado:', data.libro);
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}
```

### Obtener todos los libros
```javascript
async function obtenerLibros() {
  try {
    const response = await fetch('http://localhost:8000/api/libro/obtener/');
    const data = await response.json();
    
    if (data.success) {
      console.log('Libros:', data.libros);
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}
```

### Editar un libro
```javascript
async function editarLibro(id, datosActualizados) {
  try {
    const response = await fetch('http://localhost:8000/api/libro/editar/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...datosActualizados })
    });
    
    const data = await response.json();
    if (data.success) {
      console.log('Libro actualizado:', data.libro);
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}
```

### Eliminar un libro
```javascript
async function eliminarLibro(id) {
  try {
    const response = await fetch('http://localhost:8000/api/libro/eliminar/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    });
    
    const data = await response.json();
    if (data.success) {
      console.log('Libro eliminado:', data.message);
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}
```
