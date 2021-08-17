# Define what data we want to serialize from the database and then return as JSON

from rest_framework import serializers
from network.models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'