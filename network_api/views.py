from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import PostSerializer

from network.models import User, Post, Comment, Like, Follower

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    """ Creates an api endpoint that lists all api endpoints"""
    api_urls = {
        'List': '/post-list',
    }

    return Response(api_urls)

@api_view(['GET'])
def postList(request):
    """ Creates an api endpoint that lists all existing posts"""
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True) # Serializes all the posts 

    return Response(serializer.data) # Returns all the posts as JSON 



# Show individual post? 
# Add New Post 
# Update/edit existing post
# Delete post