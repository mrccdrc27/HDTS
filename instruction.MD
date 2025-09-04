# Daily workflow
docker compose start    # Start services
docker compose stop     # Stop services
docker compose restart  # Restart services

# Monitoring
docker ps               # Check status
docker compose logs     # View all logs
docker compose logs backend  # View specific service logs

# First time / after code changes
docker compose up --build -d  # Rebuild and start

# Cleanup
docker compose down     # Full shutdown