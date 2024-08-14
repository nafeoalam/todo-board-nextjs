## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## ToDo Board PostgreSQL Setup

This guide provides instructions for setting up a PostgreSQL database for a ToDo Board application using Docker.

### Prerequisites

- Docker Desktop for Mac

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