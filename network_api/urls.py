from django.urls import path
from . import views 

urlpatterns = [
    path('', views.apiOverview, name="api-Overview"),
    path('post-list/', views.postList, name="api-postList"),
]