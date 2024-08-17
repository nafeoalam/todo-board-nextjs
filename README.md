## ToDo Board PostgreSQL Setup

This guide provides instructions for setting up a PostgreSQL database for a ToDo Board application using Docker.

### Prerequisites

- Node.js v20.16.0
- Docker Desktop for Mac
- PgAdmin for a UI view of the database

## Getting Started

First, install and run the development server:

```bash
yarn install
yarn dev
```

### Installation Steps

#### Step 1: Install Docker

If Docker is not yet installed on your Mac:

- Download Docker Desktop for Mac [here](https://hub.docker.com/editions/community/docker-ce-desktop-mac/).
- Follow the installation instructions to install Docker.

#### Step 2: Run PostgreSQL with Docker

Run the following command to pull the PostgreSQL image and run it:

```bash
docker pull postgres
yarn db:up
```

Go to PostgreSQL interactive mode


```bash
docker exec -it [container_id_or_name] psql -U your_username -d db_name
```

## Troubleshooting

- **Docker Not Starting**: Ensure that virtualization is enabled in your BIOS settings, and that you have sufficient administrative privileges.

- **Database Connection Issues**: Verify that the PostgreSQL container is running with `docker ps`. Check that you are using the correct credentials and database name.

- **PgAdmin Not Connecting**: Ensure that the PgAdmin container is on the same network as the PostgreSQL container if running within Docker.
