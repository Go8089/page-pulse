# PagePulse
A modern website auditing platform built with **React + TypeScript** and **Go** that analyzes website SEO, accessibility, metadata, content structure, and performance in seconds.
---

# Features

 Website Audit
 SEO Analysis
 Accessibility Checks
 Metadata Analysis
 Performance Metrics
 Technical Report Dashboard
 Copy Report
 Export Report
 Recent Audits
 Responsive Design
 Docker Support

# Tech Stack

Frontend

 React
 TypeScript
 Vite
 Tailwind CSS
 Framer Motion
 Axios
 React Circular Progressbar
 Sonner

Backend

 Go
 Gin
 Colly

Deployment
 Render
 Vercel
 Docker
 
# Installation

# Clone Repository

```bash
git clone https://github.com/Go8089/page-pulse.git

cd page-pulse
```

---

# Run Locally

# Backend

```bash
cd backend

go mod tidy

go run cmd/server/main.go
```

Backend URL

```
http://localhost:8085
```

# Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# Run with Docker

# Prerequisites

- Docker
- Docker Compose

Check installation

```bash
docker --version

docker compose version
```

Start application

```bash
docker compose up --build
```

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:8085
```

Stop containers

```bash
docker compose down
```

View logs

```bash
docker compose logs

docker compose logs backend

docker compose logs frontend
```

---

# Deploy Frontend to Vercel

# Build

```bash
cd frontend

npm run build
```

# Deploy

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Set the environment variable:

```env
VITE_API_URL=https://your-render-url.onrender.com
```

4. Deploy.

---

# Deploy Backend to Render

1. Push the backend to GitHub.
2. Create a new **Web Service** on Render.
3. Select the `backend` directory as the root.
4. Build command:

```bash
go build -o server ./cmd/server
```

5. Start command:

```bash
./server
```

6. Set the environment variable:

```env
PORT=8085
```

After deployment your backend will be available at:

```
https://your-service-name.onrender.com
```

Your audit endpoint becomes:

```
https://your-service-name.onrender.com/api/v1/audit
```

---

# Production Configuration

Update the frontend environment variable before deploying to Vercel.

```env
VITE_API_URL=https://your-service-name.onrender.com
```