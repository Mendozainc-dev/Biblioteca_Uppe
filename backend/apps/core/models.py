from django.db import models
from django.contrib.auth.hashers import make_password, check_password


# Diferentes clases que seran asumidas por la base de datos para que se usen correctamente en este caso
# decidimos que lo mejor era usar una clase para cada entidad
# ya que de esta manera podemos tener una mejor organizacion y control de los datos
class Libro(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_libro = models.CharField(max_length=200)
    autor = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    status = models.BooleanField(default=False)
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
    password_admin = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Hashear la contraseña si es texto plano
        if self.password_admin and not self.password_admin.startswith('pbkdf2_'):
            self.password_admin = make_password(self.password_admin)
        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password_admin)

    def __str__(self):
        return self.nombre_admin


class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    matricula_usuario = models.CharField(max_length=200)
    nombre_usuario = models.CharField(max_length=200)
    apellido_usuario = models.CharField(max_length=200)
    email_usuario = models.EmailField(unique=True)
    password_usuario = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Hashear la contraseña si es texto plano
        if self.password_usuario and not self.password_usuario.startswith('pbkdf2_'):
            self.password_usuario = make_password(self.password_usuario)
        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password_usuario)

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


class Ventas(models.Model):
    id = models.AutoField(primary_key=True)
    objeto = models.CharField(max_length=200)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_venta = models.DateTimeField()
    status = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.objeto} - {self.usuario.nombre_usuario}"
