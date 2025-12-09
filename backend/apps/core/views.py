import json
from datetime import datetime

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Admin, Libro, Usuario


@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    """
    Autentica usando el modelo `Usuario` unificado. Si las credenciales son válidas,
    devuelve la información del usuario y la ruta de redirección según su rol:
      - admin -> '/admin/dashboard'
      - user  -> '/user/home'
    Esto mantiene compatibilidad con clientes que antes esperaban datos del Admin.
    """
    try:
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return JsonResponse(
                {"success": False, "message": "Email y contraseña son requeridos"},
                status=400,
            )

        # Intentar autenticar usando el método de conveniencia del modelo Usuario
        user = Usuario.authenticate(email, password)
        if not user:
            return JsonResponse(
                {"success": False, "message": "Credenciales inválidas"}, status=401
            )

        # Preparar respuesta con datos del usuario y ruta de redirección según rol
        user_payload = {
            "id": user.id,
            "matricula": getattr(user, "matricula_usuario", ""),
            "nombre": getattr(user, "nombre_usuario", ""),
            "email": getattr(user, "email_usuario", ""),
            "rol": getattr(user, "rol", ""),
        }

        # Determinar ruta de redirección según rol
        if user.is_admin:
            redirect = "/admin/dashboard"
        else:
            redirect = "/user/home"

        return JsonResponse(
            {
                "success": True,
                "message": "Login exitoso",
                "user": user_payload,
                "redirect": redirect,
            }
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {"success": False, "message": "Datos inválidos"}, status=400
        )
    except Exception as e:
        return JsonResponse(
            {"success": False, "message": f"Error del servidor: {str(e)}"}, status=500
        )


@csrf_exempt
@require_http_methods(["POST"])
def crear_libro(request):
    """
    Crea un nuevo libro en la base de datos.

    Espera un JSON con los siguientes campos:
    - nombre_libro (str, requerido): Nombre del libro
    - autor (str, requerido): Autor del libro
    - descripcion (str, opcional): Descripción del libro
    - fecha_publicacion (str, requerido): Fecha de publicación (formato: YYYY-MM-DD)
    - total_libros (int, opcional, default=1): Cantidad total de copias
    - status (bool, opcional, default=False): Estado del libro

    Devuelve:
    - success: True si se creó correctamente, False en caso contrario
    - message: Mensaje de respuesta
    - libro: Datos del libro creado (si es exitoso)
    """
    try:
        data = json.loads(request.body)

        # Validar campos requeridos
        nombre_libro = data.get("nombre_libro", "").strip()
        autor = data.get("autor", "").strip()
        fecha_publicacion_str = data.get("fecha_publicacion", "").strip()

        if not nombre_libro:
            return JsonResponse(
                {"success": False, "message": "El nombre del libro es requerido"},
                status=400,
            )

        if not autor:
            return JsonResponse(
                {"success": False, "message": "El autor es requerido"},
                status=400,
            )

        if not fecha_publicacion_str:
            return JsonResponse(
                {"success": False, "message": "La fecha de publicación es requerida"},
                status=400,
            )

        # Parsear la fecha
        try:
            fecha_publicacion = datetime.strptime(
                fecha_publicacion_str, "%Y-%m-%d"
            ).date()
        except ValueError:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Formato de fecha inválido. Use YYYY-MM-DD",
                },
                status=400,
            )

        # Campos opcionales
        descripcion = data.get("descripcion", "").strip()
        total_libros = data.get("total_libros", 1)
        status = data.get("status", False)

        # Validar que total_libros sea un número positivo
        try:
            total_libros = int(total_libros)
            if total_libros < 0:
                return JsonResponse(
                    {
                        "success": False,
                        "message": "La cantidad de libros debe ser positiva",
                    },
                    status=400,
                )
        except (ValueError, TypeError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "La cantidad de libros debe ser un número entero",
                },
                status=400,
            )

        # Crear el libro
        libro = Libro.objects.create(
            nombre_libro=nombre_libro,
            autor=autor,
            descripcion=descripcion if descripcion else None,
            fecha_publicacion=fecha_publicacion,
            total_libros=total_libros,
            status=status,
        )

        # Preparar respuesta
        libro_data = {
            "id": libro.id,
            "nombre_libro": libro.nombre_libro,
            "autor": libro.autor,
            "descripcion": libro.descripcion,
            "fecha_publicacion": libro.fecha_publicacion.isoformat(),
            "total_libros": libro.total_libros,
            "status": libro.status,
            "fecha_creacion": libro.fecha_creacion.isoformat(),
        }

        return JsonResponse(
            {
                "success": True,
                "message": "Libro creado exitosamente",
                "libro": libro_data,
            },
            status=201,
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {"success": False, "message": "Datos inválidos"},
            status=400,
        )
    except Exception as e:
        return JsonResponse(
            {"success": False, "message": f"Error del servidor: {str(e)}"},
            status=500,
        )


@csrf_exempt
@require_http_methods(["GET"])
def obtener_libros(request):
    """
    Obtiene la lista de todos los libros.

    Parámetros opcionales:
    - id (int): Filtrar por ID de libro

    Devuelve:
    - success: True si se obtuvieron correctamente
    - message: Mensaje de respuesta
    - libros: Lista de libros (si es exitoso)
    """
    try:
        libro_id = request.GET.get("id")

        if libro_id:
            try:
                libro_id = int(libro_id)
                libro = Libro.objects.get(id=libro_id)
                libro_data = {
                    "id": libro.id,
                    "nombre_libro": libro.nombre_libro,
                    "autor": libro.autor,
                    "descripcion": libro.descripcion,
                    "fecha_publicacion": libro.fecha_publicacion.isoformat(),
                    "total_libros": libro.total_libros,
                    "status": libro.status,
                    "fecha_creacion": libro.fecha_creacion.isoformat(),
                }
                return JsonResponse(
                    {
                        "success": True,
                        "message": "Libro obtenido exitosamente",
                        "libro": libro_data,
                    }
                )
            except Libro.DoesNotExist:
                return JsonResponse(
                    {"success": False, "message": "Libro no encontrado"}, status=404
                )
            except ValueError:
                return JsonResponse(
                    {"success": False, "message": "ID de libro inválido"}, status=400
                )
        else:
            # Obtener todos los libros
            libros = Libro.objects.all().values()
            libros_list = [
                {
                    "id": libro["id"],
                    "nombre_libro": libro["nombre_libro"],
                    "autor": libro["autor"],
                    "descripcion": libro["descripcion"],
                    "fecha_publicacion": libro["fecha_publicacion"].isoformat(),
                    "total_libros": libro["total_libros"],
                    "status": libro["status"],
                    "fecha_creacion": libro["fecha_creacion"].isoformat(),
                }
                for libro in libros
            ]
            return JsonResponse(
                {
                    "success": True,
                    "message": "Libros obtenidos exitosamente",
                    "libros": libros_list,
                }
            )

    except Exception as e:
        return JsonResponse(
            {"success": False, "message": f"Error del servidor: {str(e)}"}, status=500
        )


@csrf_exempt
@require_http_methods(["PUT"])
def editar_libro(request):
    """
    Edita un libro existente.

    Espera un JSON con los siguientes campos:
    - id (int, requerido): ID del libro a editar
    - nombre_libro (str, opcional): Nuevo nombre
    - autor (str, opcional): Nuevo autor
    - descripcion (str, opcional): Nueva descripción
    - fecha_publicacion (str, opcional): Nueva fecha (formato: YYYY-MM-DD)
    - total_libros (int, opcional): Nueva cantidad
    - status (bool, opcional): Nuevo estado

    Devuelve:
    - success: True si se editó correctamente
    - message: Mensaje de respuesta
    - libro: Datos del libro actualizado (si es exitoso)
    """
    try:
        data = json.loads(request.body)
        libro_id = data.get("id")

        if not libro_id:
            return JsonResponse(
                {"success": False, "message": "El ID del libro es requerido"},
                status=400,
            )

        try:
            libro = Libro.objects.get(id=libro_id)
        except Libro.DoesNotExist:
            return JsonResponse(
                {"success": False, "message": "Libro no encontrado"}, status=404
            )

        # Actualizar campos opcionales
        if "nombre_libro" in data:
            nombre = data.get("nombre_libro", "").strip()
            if nombre:
                libro.nombre_libro = nombre
            else:
                return JsonResponse(
                    {"success": False, "message": "El nombre no puede estar vacío"},
                    status=400,
                )

        if "autor" in data:
            autor = data.get("autor", "").strip()
            if autor:
                libro.autor = autor
            else:
                return JsonResponse(
                    {"success": False, "message": "El autor no puede estar vacío"},
                    status=400,
                )

        if "descripcion" in data:
            libro.descripcion = data.get("descripcion", "").strip() or None

        if "fecha_publicacion" in data:
            fecha_str = data.get("fecha_publicacion", "").strip()
            if fecha_str:
                try:
                    libro.fecha_publicacion = datetime.strptime(
                        fecha_str, "%Y-%m-%d"
                    ).date()
                except ValueError:
                    return JsonResponse(
                        {
                            "success": False,
                            "message": "Formato de fecha inválido. Use YYYY-MM-DD",
                        },
                        status=400,
                    )

        if "total_libros" in data:
            try:
                total = int(data.get("total_libros", 0))
                if total < 0:
                    return JsonResponse(
                        {
                            "success": False,
                            "message": "La cantidad debe ser positiva",
                        },
                        status=400,
                    )
                libro.total_libros = total
            except (ValueError, TypeError):
                return JsonResponse(
                    {
                        "success": False,
                        "message": "La cantidad debe ser un número entero",
                    },
                    status=400,
                )

        if "status" in data:
            libro.status = data.get("status", False)

        libro.save()

        libro_data = {
            "id": libro.id,
            "nombre_libro": libro.nombre_libro,
            "autor": libro.autor,
            "descripcion": libro.descripcion,
            "fecha_publicacion": libro.fecha_publicacion.isoformat(),
            "total_libros": libro.total_libros,
            "status": libro.status,
            "fecha_creacion": libro.fecha_creacion.isoformat(),
        }

        return JsonResponse(
            {
                "success": True,
                "message": "Libro actualizado exitosamente",
                "libro": libro_data,
            }
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {"success": False, "message": "Datos inválidos"}, status=400
        )
    except Exception as e:
        return JsonResponse(
            {"success": False, "message": f"Error del servidor: {str(e)}"}, status=500
        )


@csrf_exempt
@require_http_methods(["DELETE"])
def eliminar_libro(request):
    """
    Elimina un libro de la base de datos.

    Espera un JSON con el siguiente campo:
    - id (int, requerido): ID del libro a eliminar

    Devuelve:
    - success: True si se eliminó correctamente
    - message: Mensaje de respuesta
    """
    try:
        data = json.loads(request.body)
        libro_id = data.get("id")

        if not libro_id:
            return JsonResponse(
                {"success": False, "message": "El ID del libro es requerido"},
                status=400,
            )

        try:
            libro = Libro.objects.get(id=libro_id)
            libro_nombre = libro.nombre_libro
            libro.delete()

            return JsonResponse(
                {
                    "success": True,
                    "message": f"Libro '{libro_nombre}' eliminado exitosamente",
                }
            )

        except Libro.DoesNotExist:
            return JsonResponse(
                {"success": False, "message": "Libro no encontrado"}, status=404
            )

    except json.JSONDecodeError:
        return JsonResponse(
            {"success": False, "message": "Datos inválidos"}, status=400
        )
    except Exception as e:
        return JsonResponse(
            {"success": False, "message": f"Error del servidor: {str(e)}"}, status=500
        )


def ping(request):
    return JsonResponse({"status": "ok", "app": "core"})