import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Libro",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("nombre_libro", models.CharField(max_length=200)),
                ("autor", models.CharField(max_length=200)),
                ("descripcion", models.TextField(blank=True, null=True)),
                ("status", models.BooleanField(default=False)),
                ("fecha_publicacion", models.DateField()),
                ("fecha_creacion", models.DateTimeField(auto_now_add=True)),
                ("fecha_eliminacion", models.DateTimeField(blank=True, null=True)),
            ],
            options={},
        ),
        migrations.CreateModel(
            name="Admin",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("matricula_admin", models.CharField(max_length=200)),
                ("nombre_admin", models.CharField(max_length=200)),
                ("email_admin", models.EmailField(max_length=254, unique=True)),
                ("password_admin", models.CharField(max_length=200)),
                ("fecha_creacion", models.DateTimeField(auto_now_add=True)),
            ],
            options={},
        ),
        migrations.CreateModel(
            name="Usuario",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("matricula_usuario", models.CharField(max_length=200)),
                ("nombre_usuario", models.CharField(max_length=200)),
                ("apellido_usuario", models.CharField(max_length=200)),
                ("email_usuario", models.EmailField(max_length=254, unique=True)),
                ("password_usuario", models.CharField(max_length=200)),
                ("fecha_creacion", models.DateTimeField(auto_now_add=True)),
            ],
            options={},
        ),
        migrations.CreateModel(
            name="Prestamo",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("fecha_prestamo", models.DateTimeField()),
                ("fecha_devolucion", models.DateTimeField(blank=True, null=True)),
                ("fecha_creacion", models.DateTimeField(auto_now_add=True)),
                (
                    "libro",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.libro"
                    ),
                ),
                (
                    "usuario",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.usuario"
                    ),
                ),
            ],
            options={},
        ),
        migrations.CreateModel(
            name="Ventas",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("objeto", models.CharField(max_length=200)),
                ("fecha_venta", models.DateTimeField()),
                ("status", models.BooleanField(default=True)),
                ("fecha_creacion", models.DateTimeField(auto_now_add=True)),
                (
                    "usuario",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.usuario"
                    ),
                ),
            ],
            options={},
        ),
    ]
