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
docker run --name todo-postgres -e POSTGRES_USER=your_username -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=todo_board -p 5432:5432 -d postgres
