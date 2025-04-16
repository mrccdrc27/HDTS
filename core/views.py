from django.shortcuts import render
from .models import Book

# For the HTML template view
def book_list(request):
    books = Book.objects.all()
    return render(request, 'core/book_list.html', {'books': books})

# 🔥 For the API view
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import BookSerializer

@api_view(['GET'])
def book_list_api(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)
