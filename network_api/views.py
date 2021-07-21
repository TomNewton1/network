from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/post-list',
    }

    return Response(api_urls)

@api_view(['GET'])
def taskList(request):

    return Response("A list of all the posts made")