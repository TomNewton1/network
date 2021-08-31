from django.contrib.auth.models import AbstractUser
from django.db import models
from multiselectfield import MultiSelectField

class User(AbstractUser):
    pass

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    body = models.TextField(max_length=600)
    date = models.DateTimeField(auto_now_add=True)
    votes = models.IntegerField(default=0, null=True)

    def __str__(self):
        return self.title
    
    def vote_count(self):
        post_id = Post.objects.get(title=self.title).id
        upvotes = Vote.objects.filter(post_id=post_id, type__contains="upvote").count()
        downvotes = Vote.objects.filter(post_id=post_id, type__contains="downvote").count()
        count = upvotes - downvotes
        self.votes = count
        self.save()
    

class Vote(models.Model):

    VOTE_CHOICE = (
                    ('upvote', 'upvote'),
                    ('downvote', 'downvote')
                )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    type = MultiSelectField(choices=VOTE_CHOICE)

    def __str__(self):
        return f"{self.user} {self.type} {self.post}"

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

    
    


