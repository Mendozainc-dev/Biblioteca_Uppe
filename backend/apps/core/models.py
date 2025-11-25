from django.db import models


class Libro(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_libro = models.CharField(max_length=200)
    autor = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    fecha_publicacion = models.DateField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_eliminacion = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.nombre_libro


class Admin(models.Model):
    id = models.AutoField(primary_key=True)
    matricula_admin = models.CharField(max_length=200)
    nombre_admin = models.CharField(max_length=200)
    email_admin = models.EmailField(unique=True)
    password_admin = models.CharField(max_length=200)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre_admin


class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    matricula_usuario = models.CharField(max_length=200)
    nombre_usuario = models.CharField(max_length=200)
    email_usuario = models.EmailField(unique=True)
    password_usuario = models.CharField(max_length=200)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre_usuario


class Prestamo(models.Model):
    id = models.AutoField(primary_key=True)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_prestamo = models.DateTimeField()
    fecha_devolucion = models.DateTimeField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.libro.nombre_libro} - {self.usuario.nombre_usuario}"
