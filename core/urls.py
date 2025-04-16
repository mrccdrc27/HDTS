from django.urls import path
from . import views

urlpatterns = [
    path('', views.book_list, name='book_list'),
    path('api/books/', views.book_list_api, name='book_list_api'),
]
