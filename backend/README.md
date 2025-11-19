# Backend - Django scaffold

Este directorio contiene una estructura mínima para un proyecto Django llamada `biblioteca` y una app de ejemplo `core` dentro de `apps`.

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

3. Configurar variables de entorno: copia `.env.example` a `.env` y ajustar `SECRET_KEY`.

4. Aplicar migraciones y ejecutar servidor:

```bash
python manage.py migrate
python manage.py runserver
```
