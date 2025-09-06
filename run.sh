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
    
    # Create certificates directory
    mkdir -p ./certs
    
    # Set permissions to 777
    chmod -R 777 ./data
    chmod -R 777 ./logs
    chmod -R 777 ./certs
    
    echo "Environment initialization completed."
}

# Function to generate self-signed certificates
generate_certs() {
    echo "Generating self-signed certificates..."
    
    # Create certificates directory if it doesn't exist
    mkdir -p ./certs
    
    # Generate private key
    openssl genrsa -out ./certs/server.key 2048
    
    # Generate certificate
    openssl req -new -x509 -key ./certs/server.key -out ./certs/server.crt -days 365 -subj "/C=CN/ST=Beijing/L=Beijing/O=BurnCloud/CN=testauth.burncloud.cn"
    
    # Copy certificates to the expected location in the Keycloak container
    mkdir -p ./keycloak-certs
    cp ./certs/server.crt ./keycloak-certs/server.crt.pem
    cp ./certs/server.key ./keycloak-certs/server.key.pem
    
    echo "Certificates generated and copied to keycloak-certs directory."
}

# Function to import realms
import_realms() {
    echo "Importing realms..."
    docker-compose run --rm burncloud-cn-keycloak \
        -Dkeycloak.import=/opt/keycloak/data/import/burncloud-realm.json
    echo "Realms imported."
}

# Function to show logs
show_logs() {
    if [ -z "$2" ]; then
        echo "Showing logs for all services..."
        docker-compose logs -f
    else
        echo "Showing logs for $2..."
        docker-compose logs -f $2
    fi
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
    certs)
        generate_certs
        ;;
    import)
        import_realms
        ;;
    logs)
        show_logs "$@"
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
        echo "Usage: $0 {init|certs|import|logs [service]|start|stop|restart|status}"
        echo "  init    - Initialize environment directories"
        echo "  certs   - Generate self-signed certificates"
        echo "  import  - Import realms"
        echo "  logs    - Show logs for all services or a specific service"
        echo "  start   - Start all services"
        echo "  stop    - Stop all services"
        echo "  restart - Restart all services"
        echo "  status  - Check status of services"
        exit 1
        ;;
esac