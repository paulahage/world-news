# World News

World News is a small news search project. Its API loads a bundled collection of news articles, searches their titles and descriptions, and returns matching articles with metadata such as country, importance, and sponsored status. Country flags are added to results using the country code list in the API data.

The project has two services:

- `api/` — a Node.js and Express API that exposes `GET /search?query=...` on port `3003`.
- `website/` — an Angular application served as a production build on port `4200`. It currently displays the Angular starter page and is not connected to the search API.

## Run with Docker Compose

### Prerequisites

- Docker Engine with the Docker Compose plugin, or Docker Desktop with Compose

From the repository root, build and start both services:

```sh
docker compose up --build
```

Open the website at <http://localhost:4200>. Search the API at <http://localhost:3003/search?query=healthcare>.

To follow the service logs in another terminal:

```sh
docker compose logs -f
```

Stop and remove the containers and network with:

```sh
docker compose down
```

## Run locally

Node.js and npm are required for local development.

Start the API in one terminal:

```sh
cd api
npm ci
npm start
```

The API listens on <http://localhost:3003>. For example, request <http://localhost:3003/search?query=healthcare>.

In a separate terminal, start the Angular development server:

```sh
cd website
npm ci
npm start
```

The website is available at <http://localhost:4200>.

## Project files

```text
api/
  countries.json  Country names and ISO country codes used for flag images
  results.json    Bundled news article data searched by the API
  index.js        Express server and MiniSearch setup
website/
  src/            Angular application source
docker-compose.yml
```
