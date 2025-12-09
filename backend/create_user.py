#!/usr/bin/env python
"""
Script para crear un usuario de prueba (rol: user).
Ejecutar desde el directorio backend: python create_user.py
"""
import os
import sys
import django

# Configurar Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'biblioteca.settings')
django.setup()

from apps.core.models import Usuario

def create_test_user():
    email = "usuario@test.com"
    password = "usuario123"
    
    # Verificar si ya existe
    if Usuario.objects.filter(email_usuario=email).exists():
        print(f"El usuario con email {email} ya existe.")
        return
    
    user = Usuario.objects.create(
        matricula_usuario="USER001",
        nombre_usuario="Usuario de Prueba",
        apellido_usuario="Test",
        email_usuario=email,
        password_usuario=password,  # Se hasheará automáticamente en el save()
        rol=Usuario.ROLE_USER  # Rol de usuario regular
    )
    
    print(f"Usuario creado exitosamente:")
    print(f"  Email: {email}")
    print(f"  Contraseña: {password}")
    print(f"  Matrícula: {user.matricula_usuario}")
    print(f"  Rol: {user.rol}")

if __name__ == "__main__":
    create_test_user()

