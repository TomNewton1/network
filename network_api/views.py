import json

from django.shortcuts import render
from django.http import HttpResponse, QueryDict
from django.db.models import Q
from django.core.serializers.json import DjangoJSONEncoder


from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import PostSerializer, VoteSerializer, datetimeSerializer

from network.models import User, Post, Comment, Follower, Vote

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    """ Creates an api endpoint that lists all api endpoints"""
    api_urls = {
        'List all Posts': '/post-list',
        'Posts by followers': '/post-list-followers',
        'Posts by User': '/post-list-user',
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
    posts = Post.objects.all().order_by('-id')
    serializer = PostSerializer(posts, many=True) # Serializes all the posts 

    return Response(serializer.data) # Returns all the posts as JSON

@api_view(['GET'])
def postListFollowers(request, id):
    """ Creates an api endpoint that lists all existing posts based on who the user is following"""

    users_followed = Follower.objects.filter(user_following_id=id).values_list('user_followed_id', flat=True).distinct()

    all_follower_posts = Post.objects.filter(user_id__in=users_followed).order_by('-id')

    serializer = PostSerializer(all_follower_posts, many=True) # Serializes all the posts 
    
    return Response(serializer.data) # Returns all the posts as JSON 

@api_view(['GET'])
def postListUser(request, id):
    """ Creates an api endpoint that lists all existing posts of specific user and details of that user"""

    posts = Post.objects.filter(user_id=id).order_by('-id')
    serializer = PostSerializer(posts, many=True) # Serializes all the posts

    user = User.objects.get(id=id)
    username = user.username
    date_joined = user.date_joined
    date_joined = json.dumps(date_joined, cls=DjangoJSONEncoder)

    followers = Follower.objects.filter(user_followed=id).count()
    following = Follower.objects.filter(user_following=id).count()

    return Response({'username': username, 'followers':followers, 'following':following, 'date':date_joined, 'posts':serializer.data}) # Returns all the posts as JSON

# Add New Post 
@api_view(['POST'])
def postSubmit(request):
    """ Creates an api endpoint to submit a new post"""
    serializer = PostSerializer(data=request.data)

    print("New post serializer", serializer)

    if serializer.is_valid():
        print("Serializer was valid")
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

        # Check if user has already upvoted on a post.

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
                return Response(f"You can't {type} more than once")

        else:
            # Add new vote to database
            new_vote = Vote(user_id=user_id, post_id=post_id, type=type )
            new_vote.save()
    
        # Update the post votes count by calling the vote_count method
        post = Post.objects.get(id=post_id)
        vote_count = post.vote_count()

        return Response(serializer.data) # Returns all the posts as JSON 


    else:
        print("Serializer was not valid")
        print("Serializer errors", serializer.errors)
    
    return Response(serializer.data)

# GET if user follows profile
@api_view(['GET', 'POST'])
def followUser(request, id, followed_id):
    """Api endpoint that checks if the user is already following the profile they are on and allows users to follow/unfollow"""

    if request.method == 'GET':
        # Filter follower table by user_following_id and user_followed_id

        # Check if logged in user and user profile are the same id.
        if id == followed_id:
            return Response("self")
            print("You can't follow yourself (set following to true)")

        # Check if user already following profile 
        check_following = Follower.objects.filter(user_following_id=id, user_followed_id=followed_id)
        
        if check_following.exists():
            return Response("true")
            print("Already following")
        else: 
            return Response("false")
            print("Not yet following")
    
    elif request.method == 'POST':
        print("Post request received")

        print(request.POST)
        

        """

        if (request.data.action) == "follow":
            print("Follow user")
        
        elif (request.data.action) == "unfollow":
            print("Unfollow user")

        """


        return Response("updated or inserted follower")


    
    







# Show individual post? 

# Update/edit existing post

# Delete post