from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.decorators import action

from .models import *
from .serializers import *
#from rest_framework import filters
#from rest_framework import generics


class MaterialViewset(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

    @action(methods=['get'], detail=True)
    def expenses_on_material(self, request, pk=None):
        expenses = Material.objects.get(pk=pk)
        return JsonResponse({
            "name": expenses.name,
            "expenses": expenses.general_expenses
        })

    @action(methods=['get'], detail=False)
    def expenses_by_material(self, request):
        expenses = Material.objects.all()
        return JsonResponse({
            "name": [e.name for e in expenses],
            "expenses": [e.general_expenses for e in expenses]
        })


class FeedstockViewset(viewsets.ModelViewSet):
    queryset = Feedstock.objects.all()
    serializer_class = FeedstockSerializer

    @action(methods=['get'], detail=True)
    def expenses_on_feedstock(self, request, pk=None):
        expenses = Feedstock.objects.get(pk=pk)
        return JsonResponse({
            "name": expenses.name,
            "expenses": expenses.general_expenses
        })

    @action(methods=['get'], detail=False)
    def expenses_by_feedstock(self, request):
        expenses = Feedstock.objects.all()
        return JsonResponse({
            "name": [e.name for e in expenses],
            "expenses": [e.general_expenses for e in expenses]
        })


def index(request):
    return render(request, 'index.html')

def materials_list(request):
    return render(request, 'materials_list.html')

def feedstock_list(request):
    return render(request, 'feedstock_list.html')

@csrf_exempt
def create_material(request):
    return render(request, 'materials_crud/create_material.html')

@csrf_exempt
def update_material(request):
    return render(request, 'materials_crud/update_material.html')

def delete_material(request):
    return render(request, 'materials_crud/delete_material.html')

#class SupplyViewset(generics.ListAPIView):
#    queryset = Supply.objects.all()
#    serializer_class = SupplySerializer
#    filter_backends = [filters.SearchFilter]
#    search_fields = ['user_id']