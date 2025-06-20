# Use official Python image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project files
COPY . /app/

# Collect static files (optional, if you serve static)
RUN python manage.py collectstatic --noinput

# Expose port (default for Django)
EXPOSE 8000

# Start server
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]