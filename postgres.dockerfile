# Use the official Postgres image from Docker Hub
FROM postgres:latest

# Set environment variables
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=Capstone
ENV POSTGRES_DB=postgres

# Expose the PostgreSQL port
EXPOSE 5432