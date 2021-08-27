from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import PostSerializer

from network.models import User, Post, Comment, Follower

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    """ Creates an api endpoint that lists all api endpoints"""
    api_urls = {
        'List all Posts': '/post-list',
        'Posts by followers': '/post-list-followers',
        'SubmitPost': '/post-submit',
        'Like Post': '/post-like',

        'Individual User': '/auth/user',
        'Register': '/auth/register',
        'Login': '/auth/login',
        'Logout': '/auth/logout',
        

    }

    return Response(api_urls)

@api_view(['GET'])
def postList(request):
    """ Creates an api endpoint that lists all existing posts"""
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True) # Serializes all the posts 

    return Response(serializer.data) # Returns all the posts as JSON

@api_view(['GET'])
def postListFollowers(request, id):
    """ Creates an api endpoint that lists all existing posts based on who the user is following"""

    users_followed = Follower.objects.filter(user_following_id=id).values_list('user_followed_id', flat=True).distinct()

    all_follower_posts = Post.objects.filter(user_id__in=users_followed)

    serializer = PostSerializer(all_follower_posts, many=True) # Serializes all the posts 
    
    return Response(serializer.data) # Returns all the posts as JSON 

# Add New Post 
@api_view(['POST'])
def postSubmit(request):
    """ Creates an api endpoint to submit a new post"""
    serializer = PostSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        print("Serializer was not valid")

    return Response(serializer.data)

# Like Post
@api_view(['PUT'])
def postLike(request):
    """ Creates an API endpoint to like a post """
    serializer = PostSerializer(data=request.data)

    print("The PUT serializer is:", serializer)

    if serializer.is_valid():
        serializer.save()
    else:
        print("Serializer was not valid")
    
    return Response(serializer.data)



# Show individual post? 

# Update/edit existing post
# Delete post