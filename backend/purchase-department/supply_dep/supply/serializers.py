from rest_framework import serializers
from .models import *


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'


class FeedstockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedstock
        fields = '__all__'
