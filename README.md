# PagePulse

PagePulse is a modern website auditing platform built with React, TypeScript, Tailwind CSS, Go, and Colly.
It analyzes any website and generates an instant report including:
- SEO
- Metadata
- Accessibility
- Page Structure
- Performance
- Response Time

---
# Running with Docker

## Prerequisites

- Docker
- Docker Compose

Verify installation:

```bash
docker --version
docker compose version
```
---
## Clone the repository

```bash
git clone https://github.com/Go8089/page-pulse.git
cd page-pulse
```

---

## Start the application

```bash
docker compose up --build
```

The first build may take a few minutes.

---

## Access the application

Frontend

```
http://localhost:3000
```

Backend API

```
http://localhost:8085
```

---

## Verify Backend

```bash
curl -X POST http://localhost:8085/api/v1/audit \
-H "Content-Type: application/json" \
-d '{"url":"https://google.com"}'
```

Expected response:

```json
{
  "http_status":200,
  "response_time_ms":517,
  "title":"Google",
  "meta_description":"",
  "h1_count":0,
  "images_missing_alt":0,
  "word_count":24
}
```

---

## Stop containers

```bash
docker compose down
```

---

## Rebuild after changes

```bash
docker compose up --build
```

---

## Docker Project Structure

```
page-pulse/
│
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   └── .dockerignore
│
└── backend/
    ├── Dockerfile
    └── .dockerignore
```

---

## Docker Services

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | React application served by Nginx |
| Backend | 8085 | Go REST API |

---

## Troubleshooting

View running containers

```bash
docker ps
```

View logs

```bash
docker compose logs
```

Backend logs

```bash
docker compose logs backend
```

Frontend logs

```bash
docker compose logs frontend
```

Restart containers

```bash
docker compose restart
```