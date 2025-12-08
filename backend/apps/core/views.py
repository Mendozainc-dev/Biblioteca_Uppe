import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Admin, Usuario


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


def ping(request):
    return JsonResponse({"status": "ok", "app": "core"})
