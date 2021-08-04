from django.test import TestCase
from network.models import User, Post

# Create your tests here. ( Need to revisit TesTing in Django)

"""

class Test_Create_Post(TestCase):

    @classmethod
    def setUpTestData(cls):
        testuser1 = User.objects.create_user(username='test_user1', password='123456789')
        test_post = Post.objects.create(user_id=1, title='Post title', body='Post Body', date='2021-07-21 06:54:28.252630')

    def test_post_content(self):
        post = Post.objects.get(id=1)
        user = f'{post.user}'
        title = f'{post.title}'
        body = f'{post.body}'
        date= f'{post.date}'
        self.assertEqual(user, 'test-user1')
        self.assertEqual(title, 'Post title')
        self.assertEqual(body, 'Post Body')
        self.assertEqual(date, '2021-07-21 06:54:28.252630')
        self.assertEqual(str(post), 'Post title')

"""

