import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ContactRequest

@csrf_exempt
def contact_api(request):

    if request.method == "OPTIONS":
        return JsonResponse({},status=200)
    if request.method !="POST":
        return JsonResponse(
            {"error": "POST required"},
            status=405
        )
    try:
        data=json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Invalid JSON"},
            status=400
        )
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone", "")
    project_type = data.get("project_type")
    message = data.get ("message", "")

    if not name or not email or not project_type:
        return JsonResponse(
            {"error": "Missimg requered fields"},
            status=400
        )
    contact = ContactRequest.objects.create(
        name=name,
        email=email,
        phone=phone,
        project_type=project_type,
        message=message
    )
    return JsonResponse (
        {
            "status": "ok",
            "id": contact.id
        },
        status=201
    )



# Create your views here.
