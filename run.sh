#!/bin/bash

# Script to initialize environment and manage docker-compose services

# Function to create directories with 777 permissions
init_env() {
    echo "Initializing environment directories..."
    
    # Create data directories
    mkdir -p ./data/keycloak
    mkdir -p ./data/postgres
    mkdir -p ./data/redis
    
    # Create log directories
    mkdir -p ./logs/keycloak
    mkdir -p ./logs/postgres
    mkdir -p ./logs/redis
    
    # Set permissions to 777
    chmod -R 777 ./data
    chmod -R 777 ./logs
    
    echo "Environment initialization completed."
}

# Function to start services
start_services() {
    echo "Starting services..."
    docker-compose up -d
    echo "Services started."
}

# Function to stop services
stop_services() {
    echo "Stopping services..."
    docker-compose down
    echo "Services stopped."
}

# Function to restart services
restart_services() {
    echo "Restarting services..."
    docker-compose down
    docker-compose up -d
    echo "Services restarted."
}

# Function to check status
status_services() {
    echo "Checking services status..."
    docker-compose ps
}

# Main script logic
case "$1" in
    init)
        init_env
        ;;
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    status)
        status_services
        ;;
    *)
        echo "Usage: $0 {init|start|stop|restart|status}"
        echo "  init    - Initialize environment directories"
        echo "  start   - Start all services"
        echo "  stop    - Stop all services"
        echo "  restart - Restart all services"
        echo "  status  - Check status of services"
        exit 1
        ;;
esac