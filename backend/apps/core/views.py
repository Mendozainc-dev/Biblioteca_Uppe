from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .models import Admin


@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return JsonResponse({
                'success': False,
                'message': 'Email y contraseña son requeridos'
            }, status=400)
        
        try:
            admin = Admin.objects.get(email_admin=email)
        except Admin.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': 'Credenciales inválidas'
            }, status=401)
        
        # Verificar contraseña
        if admin.check_password(password):
            return JsonResponse({
                'success': True,
                'message': 'Login exitoso',
                'admin': {
                    'id': admin.id,
                    'matricula': admin.matricula_admin,
                    'nombre': admin.nombre_admin,
                    'email': admin.email_admin
                }
            })
        else:
            return JsonResponse({
                'success': False,
                'message': 'Credenciales inválidas'
            }, status=401)
            
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'message': 'Datos inválidos'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': f'Error del servidor: {str(e)}'
        }, status=500)


def ping(request):
    return JsonResponse({'status': 'ok', 'app': 'core'})
