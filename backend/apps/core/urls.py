from django.urls import path

from . import views

urlpatterns = [
    path("ping/", views.ping, name="ping"),
    path("login/", views.login, name="login"),
    path("libro/crear/", views.crear_libro, name="crear_libro"),
    path("libro/obtener/", views.obtener_libros, name="obtener_libros"),
    path("libro/editar/", views.editar_libro, name="editar_libro"),
    path("libro/eliminar/", views.eliminar_libro, name="eliminar_libro"),
]