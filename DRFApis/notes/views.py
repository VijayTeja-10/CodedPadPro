from rest_framework.views import APIView
from .models import Notes
from django.contrib.auth.models import User
from .serializers import NotesSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from .models import AiModel

# Create your views here.
class NotesView(APIView):
    def get(self,request):
        name=request.query_params.get('name')
        key=request.query_params.get('key')
        note=get_object_or_404(Notes,name=name)     
        serializer=NotesSerializer(note)
        return Response(serializer.data)
    def post(self,request):
        serializer=NotesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_306_RESERVED)
    def patch(self,request):
        pk=request.data.get('pk')
        notes=Notes.objects.get(pk=pk)
        print(notes)
        serializer=NotesSerializer(notes,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success':'Update Success!'},status=status.HTTP_200_OK)
        return Response({'error':'Failed to update!'},status=status.HTTP_400_BAD_REQUEST)
    def delete(self,request):
        pk=request.data.get('pk')
        print(pk)
        try :
            notes=Notes.objects.get(pk=pk)
            notes.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except Exception:
            return Response({'error':'This notes doesnot exist!'},status=status.HTTP_204_NO_CONTENT)

class AiView(APIView):
    def post(self,request):
        data=request.data
        response=''
        # print('data',data)
        try:
            Ai=AiModel(data['req'],data['con'])
            if Ai.query:
                response=Ai.process()
                # print('request',data['req'],'response',response)
                return Response({'rsp':response},status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)