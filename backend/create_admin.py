#!/usr/bin/env python
"""
Script para crear un administrador de prueba.
Ejecutar desde el directorio backend: python create_admin.py
"""
import os
import sys
import django

# Configurar Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'biblioteca.settings')
django.setup()

from apps.core.models import Admin

def create_test_admin():
    email = "admin@test.com"
    password = "admin123"
    
    # Verificar si ya existe
    if Admin.objects.filter(email_admin=email).exists():
        print(f"El administrador con email {email} ya existe.")
        return
    
    admin = Admin.objects.create(
        matricula_admin="ADMIN001",
        nombre_admin="Administrador de Prueba",
        email_admin=email,
        password_admin=password  # Se hasheará automáticamente en el save()
    )
    
    print(f"Administrador creado exitosamente:")
    print(f"  Email: {email}")
    print(f"  Contraseña: {password}")
    print(f"  Matrícula: {admin.matricula_admin}")

if __name__ == "__main__":
    create_test_admin()

