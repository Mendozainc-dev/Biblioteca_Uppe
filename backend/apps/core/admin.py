from django.contrib import admin
from .models import Admin, Usuario, Libro, Prestamo, Ventas


@admin.register(Admin)
class AdminAdmin(admin.ModelAdmin):
    list_display = ("id", "matricula_admin", "nombre_admin", "email_admin", "fecha_creacion")
    search_fields = ("matricula_admin", "nombre_admin", "email_admin")


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ("id", "matricula_usuario", "nombre_usuario", "apellido_usuario", "email_usuario", "fecha_creacion")
    search_fields = ("matricula_usuario", "nombre_usuario", "apellido_usuario", "email_usuario")


@admin.register(Libro)
class LibroAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre_libro", "autor", "status", "fecha_publicacion")
    search_fields = ("nombre_libro", "autor")
    list_filter = ("status", "fecha_publicacion")


@admin.register(Prestamo)
class PrestamoAdmin(admin.ModelAdmin):
    list_display = ("id", "libro", "usuario", "fecha_prestamo", "fecha_devolucion", "fecha_creacion")
    list_filter = ("fecha_prestamo", "fecha_devolucion")


@admin.register(Ventas)
class VentasAdmin(admin.ModelAdmin):
    list_display = ("id", "objeto", "usuario", "fecha_venta", "status", "fecha_creacion")
    list_filter = ("status", "fecha_venta")
