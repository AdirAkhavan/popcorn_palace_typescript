# Popcorn Palace Backend Setup

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/)
- 

## Setup Instructions

### 1. Clone the repository
Clone the repository to your local machine:

```sh
git clone <repository-url>
cd <repository-folder>
```

### 2. Build and Start the Containers
Use Docker Compose to build and start the containers for both the app and the PostgreSQL database.

```bash
docker-compose up --build -d
```

This will:
Build the Docker images as specified in the Dockerfile.
Start the PostgreSQL database and the app containers.
The app will be available at http://localhost:3000, and PostgreSQL will be running on port 5432.

### 3. Verify the App Is Running (might take a few seconds)
You can check the logs to verify that everything is running correctly:

```bash
docker-compose logs -f
```

Look for messages indicating that the app has started successfully, such as:

```bash
[Nest] 19 - 03/24/2025, 5:57:50 PM     LOG [NestFactory] Starting Nest application...
```

### 4. Running Tests (E2E)
You can run the end-to-end (e2e) tests inside the Docker container with the following command:
```bash
docker-compose exec app npm run test:e2e
```

This will run the e2e tests inside the app container, using the project's dependencies within the container environment.

### 5. Stopping the Containers
To stop the containers, you can run:

```bash
docker-compose down
```

This will stop and remove the containers, but the PostgreSQL data will be preserved in the ./data directory.

### 6. Additional Commands
To start the app again without rebuilding:

```bash
docker-compose up -d
```

To remove containers, volumes, and networks (useful for a fresh start):

```bash
docker-compose down -v
```

## Troubleshooting

If you encounter any issues, make sure the database is running and reachable, and check the application logs for more detailed error messages.
