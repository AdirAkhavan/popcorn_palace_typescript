# Popcorn Palace Backend Setup

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/)

## Setup Instructions

### 1. Clone the repository
Clone the repository to your local machine:

```sh
git clone https://github.com/AdirAkhavan/popcorn_palace_typescript.git
cd popcorn_palace_typescript
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

### 4. Running Tests

#### 4.1 Unit Tests
To run unit tests inside the app container, use:

```bash
docker-compose exec app npm run test
```

#### 4.2 E2E Tests
Run the end-to-end tests inside the Docker container with:

```bash
docker-compose exec app npm run test:e2e
```

#### 4.3 Manual Testing
Use Postman to send requests to the base URL:

```bash
http://localhost:3000
```

You can test the available endpoints (e.g., GET, POST, PUT, DELETE).

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

# Some objects for manual testing:

### 1. Create a Movie
```json
{
  "title": "Inception",
  "genre": "Sci-Fi",
  "duration": 148,
  "rating": 4.8,
  "release_year": 2010
}
```

### 2. Create a Theater
```json
{
  "name": "Grand Cinema",
  "capacity": 200
}
```

### 3. Create a Showtime
```json
{
  "movie_id": "<movie_id>",
  "theater_id": "<theater_id>",
  "start_time": "2025-03-23T18:00:00.000Z",
  "end_time": "2025-03-23T20:30:00.000Z",
  "price": 12.5
}
```

### 4. Create a Seat
```json
{
  "showtime_id": "<showtime_id>",
  "seat_number": "A1"
}
```
