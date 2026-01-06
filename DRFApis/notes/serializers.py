from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Notes
from rest_framework.exceptions import ValidationError

class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(min_length=8,write_only=True)
    class Meta:
        model=User
        fields=['username','email','password']

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Notes
        fields=['name','notes']
    
    def validate_name(self, name):
        notes=Notes.objects.filter(name=name)
        if notes.exists(): raise serializers.ValidationError('A notes with this name already exists')
        return name