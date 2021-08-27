from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    body = models.TextField(max_length=600)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='network_post', blank=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    body = models.TextField(max_length=220)
    date = models.DateTimeField(auto_now_add=True)

class Follower(models.Model):
    user_following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following', null=True)
    user_followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followed', null=True)
    date = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.user_following} follows {self.user_followed}"

    
    


