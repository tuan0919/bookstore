# Backend Bookstore

This repository contains a Spring Boot application running on Docker, along with a MySQL database. Follow the instructions below to set up, run, update, and clean up the project.

## Prerequisites

Ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup & Run the Project

1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Create environment variable files if they do not exist:
   ```sh
   cp env/mysql.env.example env/mysql.env
   cp env/docker-compose.env.example env/docker-compose.env
   ```
   Modify these files as needed.

3. Start the application using Docker Compose:
   ```sh
   docker compose up -d --build
   ```
   This will build and start both the MySQL database and the Spring Boot backend.

4. Verify that the containers are running:
   ```sh
   docker ps
   ```

5. Access the backend API:
    - Open `http://localhost:8080/api` in your browser or use tools like Postman.

## Updating the Application

If you make changes to the source code and want to update the running container:
1. Stop the running containers:
   ```sh
   docker compose down
   ```
2. Rebuild and restart the containers:
   ```sh
   docker compose up -d --build
   ```

## Cleaning Up

To stop and remove all containers, networks, and volumes:
```sh
   docker compose down -v
```
This will delete any persistent MySQL data stored in Docker volumes.

## Logs & Debugging

- View logs of the Spring Boot container:
  ```sh
  docker logs -f spring_app
  ```
- Enter the running Spring Boot container:
  ```sh
  docker exec -it spring_app sh
  ```
- Access MySQL CLI inside the database container:
  ```sh
  docker exec -it mysql mysql -uadmin -p
  ```
  (Enter the password specified in `env/mysql.env` when prompted.)

