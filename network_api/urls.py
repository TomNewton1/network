from django.urls import path
from . import views 

urlpatterns = [
    path('', views.apiOverview, name="api-Overview"),
    path('post-list/', views.postList, name="api-postList"),
    path('post-list-followers/<int:id>', views.postListFollowers, name="api-postListFollowers"),
    path('post-submit/', views.postSubmit, name="api-postSubmit"),
    path('post-like/', views.postLike, name="api-postLike")
]