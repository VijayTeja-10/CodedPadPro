from rest_framework import serializers
from .models import Notes
from django.utils import timezone
from datetime import timedelta

class NotesSerializer(serializers.ModelSerializer):
    passcode=serializers.CharField(write_only=True,allow_blank=True)
    class Meta:
        model=Notes
        fields=['id','name','passcode','edit','notes','del_after','islocked']
    def validate_passcode(self,passcode):
        if not passcode:return ''
        return passcode
    
    def validate_name(self, name):
        notes=Notes.objects.filter(name=name)
        if notes.exists(): raise serializers.ValidationError('A notes with this name already exists')
        return name