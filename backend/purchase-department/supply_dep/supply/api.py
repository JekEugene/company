from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, request
from rest_framework.parsers import JSONParser

from .models import *
from .serializers import *


# def expenses_by_material(request):
#     query = request.GET.get('q')
#     qs = Material.objects.filter(name=query)
#     #print(qs[0].number)
#     serializer = MaterialSerializer(qs)
#     serializer.is_valid(raise_exception=True)
#     print(serializer.errors)
#     return JsonResponse({"name": "serializer.data"})  # id


# def expenses_by_feedstock(request):
#     query = request.GET.get('q')
#     qs = Feedstock.objects.filter(name=query)
#     #print(qs[0].number)
#     serializer = FeedstockSerializer(qs)
#     serializer.is_valid(raise_exception=True)
#     print(serializer.errors)
#     return JsonResponse({"name": "serializer.data"})  # id

def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET' and request.GET.get('q')==None:
        snippets = Material.objects.all()
        serializer = MaterialSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.GET.get('q'):
        query = request.GET.get('q')
        if Material.objects.filter(name=query):
            snippets = Material.objects.filter(name=query)
            serializer = MaterialSerializer(snippets, many=True)
            status = 200
            return JsonResponse(serializer.data, safe=False)
        else:
            status = 404
            return JsonResponse({"code": status},status=404)