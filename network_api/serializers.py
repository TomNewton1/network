# Define what data we want to serialize from the database and then return as JSON

from rest_framework import serializers
from network.models import Post, Vote, User

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class EditPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'body')

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'

class datetimeSerializer(serializers.ModelSerializer): # define a serializer with a datetime field
    class Meta:
        model = User
        fields = ('date_joined',)