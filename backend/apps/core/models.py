from django.contrib.auth.hashers import check_password, make_password
from django.db import models
from django.db.transaction import rollback


# Diferentes clases que seran asumidas por la base de datos para que se usen correctamente en este caso
# decidimos que lo mejor era usar una clase para cada entidad
# ya que de esta manera podemos tener una mejor organizacion y control de los datos
class Libro(models.Model):
    id = models.AutoField(primary_key=True)
    total_libros = models.IntegerField(default=0)
    nombre_libro = models.CharField(max_length=200)
    autor = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    status = models.BooleanField(default=False)
    fecha_publicacion = models.DateField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_eliminacion = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.nombre_libro


class Usuario(models.Model):
    """
    Modelo unificado para usuarios y administradores.
    - Mantiene los nombres de campo existentes (email_usuario, matricula_usuario, etc.)
      para compatibilidad con código preexistente y migraciones.
    - Añade choices para `rol` y métodos de autenticación/contraseña.
    """

    id = models.AutoField(primary_key=True)
    matricula_usuario = models.CharField(max_length=200)
    nombre_usuario = models.CharField(max_length=200)
    apellido_usuario = models.CharField(max_length=200, blank=True, null=True)
    email_usuario = models.EmailField(unique=True)
    ROLE_USER = "user"
    ROLE_ADMIN = "admin"
    ROLE_CHOICES = (
        (ROLE_USER, "Usuario"),
        (ROLE_ADMIN, "Administrador"),
    )
    rol = models.CharField(max_length=20, choices=ROLE_CHOICES, default=ROLE_USER)
    password_usuario = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Hashear la contraseña si es texto plano (evitar volver a hashear)
        if self.password_usuario and not self.password_usuario.startswith("pbkdf2_"):
            self.password_usuario = make_password(self.password_usuario)
        super().save(*args, **kwargs)

    def set_password(self, raw_password):
        """
        Utilidad para cambiar la contraseña y guardarla hasheada.
        """
        self.password_usuario = make_password(raw_password)
        # No hacemos save automático aquí para evitar efectos secundarios; el llamador lo hará.

    def check_password(self, raw_password):
        return check_password(raw_password, self.password_usuario)

    @classmethod
    def authenticate(cls, email, password):
        """
        Método de conveniencia para autenticar por email y contraseña.
        Devuelve la instancia de Usuario si las credenciales son válidas, o None en caso contrario.
        """
        try:
            user = cls.objects.get(email_usuario=email)
        except cls.DoesNotExist:
            return None
        if user.check_password(password):
            return user
        return None

    @property
    def is_admin(self):
        return self.rol == self.ROLE_ADMIN

    def __str__(self):
        return self.nombre_usuario


# Proxy + manager para compatibilidad con el código existente que espera un modelo `Admin`
class AdminManager(models.Manager):
    """
    Manager que traduce kwargs usando los nombres antiguos (email_admin, matricula_admin, nombre_admin, password_admin)
    y fuerza rol='admin' en los objetos creados o consultados a través de este manager.
    Esto permite que llamadas como `Admin.objects.get(email_admin=...)` sigan funcionando.
    """

    def get_queryset(self):
        return super().get_queryset().filter(rol=Usuario.ROLE_ADMIN)

    def _translate_kwargs(self, kwargs):
        # Mapear nombres "admin" antiguos a los nombres actuales del modelo Usuario
        mapping = {
            "email_admin": "email_usuario",
            "matricula_admin": "matricula_usuario",
            "nombre_admin": "nombre_usuario",
            "password_admin": "password_usuario",
        }
        for old, new in list(mapping.items()):
            if old in kwargs:
                kwargs[new] = kwargs.pop(old)
        return kwargs

    def get(self, *args, **kwargs):
        kwargs = self._translate_kwargs(kwargs)
        return super().get(*args, **kwargs)

    def filter(self, *args, **kwargs):
        kwargs = self._translate_kwargs(kwargs)
        return super().filter(*args, **kwargs)

    def create(self, **kwargs):
        kwargs = self._translate_kwargs(kwargs)
        # Asegurar que el rol sea admin
        kwargs["rol"] = Usuario.ROLE_ADMIN
        # Si se proporciona password_usuario (viene de password_admin), guardarlo como texto aquí;
        # save() se encargará de hashearlo.
        return super().create(**kwargs)


class Admin(Usuario):
    """
    Proxy model para mantener compatibilidad con lugares del código que importan `Admin`.
    - Usa el mismo almacenamiento (misma tabla) que `Usuario`.
    - Proporciona propiedades con los nombres antiguos (email_admin, matricula_admin, nombre_admin)
      para que el código existente (vistas, scripts de creación) siga funcionando sin cambios.
    """

    objects = AdminManager()

    class Meta:
        proxy = True
        verbose_name = "Admin"
        verbose_name_plural = "Admins"

    # Propiedades compatibilidad (lectura)
    @property
    def email_admin(self):
        return self.email_usuario

    @property
    def matricula_admin(self):
        return self.matricula_usuario

    @property
    def nombre_admin(self):
        return self.nombre_usuario

    @property
    def password_admin(self):
        return self.password_usuario

    # Compatibilidad de método de chequeo
    def check_password(self, raw_password):
        return super().check_password(raw_password)

    def set_password_admin(self, raw_password):
        self.set_password(raw_password)


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
