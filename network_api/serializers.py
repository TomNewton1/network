# Define what data we want to serialize from the database and then return as JSON

from rest_framework import serializers
from network.models import Post, Vote

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'