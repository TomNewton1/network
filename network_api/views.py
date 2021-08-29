from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import PostSerializer, VoteSerializer

from network.models import User, Post, Comment, Follower, Vote

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

    print("New post serializer", serializer)

    if serializer.is_valid():
        serializer.save()
    else:
        print("Serializer was not valid")

    return Response(serializer.data)

# Vote Post
@api_view(['PUT'])
def postVote(request):
    """ Creates an API endpoint to vote on a post """
    serializer = VoteSerializer(data=request.data)

    print("The PUT serializer is:", serializer)

    if serializer.is_valid():
        print("Serializeris valid")

        # Check if user has already vpted on a post.

        user_id = serializer.data['user']
        post_id = serializer.data['post']
        type = serializer.data['type']

        if Vote.objects.filter(user_id=user_id, post_id=post_id).exists():
            post = Vote.objects.get(user_id=user_id, post_id=post_id)
            
            # Check if new vote is the same as the old vote. Otherwise update. 
            if str(post.type) != str(type):
                post.type = str(type)
                post.save()
            
            else:
                print(f"You can't {type} more than once")

        else:
            # Add new vote to database
            new_vote = Vote(user_id=user_id, post_id=post_id, type=type )
            new_vote.save()

    else:
        print("Serializer was not valid")
        print("Serializer errors", serializer.errors)
    
    return Response(serializer.data)



# Show individual post? 

# Update/edit existing post
# Delete post