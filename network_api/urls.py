from django.urls import path
from . import views 

urlpatterns = [
    path('', views.apiOverview, name="api-Overview"),
    path('post-list/', views.postList, name="api-postList"),
    path('post-list-followers/<int:id>', views.postListFollowers, name="api-postListFollowers"),
    path('post-list-user/<int:id>', views.postListUser, name="api-postListUser"),
    path('post-submit/', views.postSubmit, name="api-postSubmit"),
    path('post-edit/<int:id>', views.postEdit, name="api-postEdit"),
    path('post-vote/', views.postVote, name="api-postVote"),
    path('follow-user/<int:id>/<int:followed_id>', views.followUser, name="api-followUser"),
]