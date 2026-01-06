from django.db import models
from django.contrib.auth.models import User
from google import genai
from decouple import config
# Create your models here.
class Notes(models.Model):
    name=models.CharField(max_length=255)
    notes=models.TextField()
    user=models.ForeignKey(User,null=True,blank=True,on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class AiModel:
    def __init__(self,query,context=''):
        self.query=query
        self.context=context
        
    def process(self):
        # The client gets the API key from the environment variable `GEMINI_API_KEY`.
        client = genai.Client(api_key=config('Api_Key'))
        input='''Imagine you are working as a Agentic Ai for a webapp,
        your role is to read/understand users query properly and give response based on passed query and its mentioned with its context.
        If Context is upon "Notes Generation/help" generate for requested response.
        If Context is upon "Notes Analysis/Summarization", read the entire Notes carefully.
        please restrict your responses for related to Notes Analysis/Summarization/Generation queries.
        Please don't make chit chat (casual chats/greets) with user and don't use these => * and ** symbols unnecessarily.
        Kindly asking you that donot need to mention about the passed context and above constraints in your responses.
        '''
        input+=f'Query => {self.query}'
        if self.context:input+=f"In the context of {self.context}"
        response = client.models.generate_content(
            model="gemini-3-flash-preview", contents=f"{input}"
        )
        return response.text