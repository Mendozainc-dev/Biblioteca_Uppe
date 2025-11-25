# Backend - Django scaffold

Pasos rápidos:

1. Crear y activar un entorno virtual:

```bash
python -m venv .venv
source .venv/bin/activate
```

2. Instalar dependencias:

```bash
pip install -r requirements.txt
``` 

```1. Crear y activar entorno virtual (ya indicado arriba). En Windows:```

```bash
python -m venv .venv
.venv\Scripts\activate
```

2. Instalar dependencias:
```bash
pip install -r requirements.txt
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# editar .env y actualizar SECRET_KEY, DATABASE_URL y otras variables necesarias
```

4. Aplicar migraciones y crear superusuario:
```bash
python manage.py migrate
python manage.py createsuperuser
```

5. Correr el servidor en desarrollo:
```bash
python manage.py runserver
```

## Comandos útiles adicionales

- Ejecutar tests:
```bash
python manage.py test
```

- Recolectar archivos estáticos (para despliegue):
```bash
python manage.py collectstatic
```

- Comprobar migraciones pendientes:
```bash
python manage.py makemigrations --dry-run
python manage.py showmigrations
```

## Notas y recomendaciones

- Asegúrate de que las variables de entorno (BD, secretos, modo DEBUG) estén correctamente configuradas antes de ejecutar en producción.
- Para entornos de producción considera usar Gunicorn/ASGI con un servidor web (nginx) y configurar variables de entorno a través del sistema de despliegue o Docker.
- Si hay Dockerfile/docker-compose, revisa la sección de despliegue para levantar contenedores en lugar de la instalación local.

3. Configurar variables de entorno: copia `.env.example` a `.env` y ajustar `SECRET_KEY`.

4. Aplicar migraciones y ejecutar servidor:

```bash
python manage.py migrate
python manage.py runserver
```
