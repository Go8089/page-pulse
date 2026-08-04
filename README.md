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

# General Challenges

These are common issues that other developers may encounter when working with or deploying the project.

| Challenge | Recommendation |

| CORS errors between frontend and backend. | Configure the backend CORS middleware to allow frontend requests. |
| Environment variables differ between development and production. | Use `.env` locally and configure variables in Vercel and Render dashboards. |
| Docker build takes several minutes initially. | This is expected because Docker downloads base images and installs dependencies on the first build. |
| Backend deployment URL changes after redeployment. | Update `VITE_API_URL` to point to the current backend endpoint. |
| Websites may block automated scraping. | Handle failures gracefully and display meaningful error messages to the user. |

| Large project size because of `node_modules` and build artifacts. | Exclude generated files from submissions and regenerate them with `npm  
  install`   or   `go mod tidy`. |
| Local ports may already be in use. | Stop conflicting processes or change the exposed ports in `docker-compose.yml`. |
| Production frontend cannot reach the backend. | Ensure the frontend is configured with the correct production API URL before building and deploying. |
| Browser caching may serve outdated frontend assets after deployment. | Perform a hard refresh or clear the browser cache after new deployments. |
| Dependency versions may become incompatible over time. | Lock dependency versions and test builds after upgrades. |

# Project-Specific Challenges

These are the challenges encountered during the development of PagePulse.

# Frontend

| Challenge | Solution |

| Search bar occupied too much horizontal space on smaller screens. | Redesigned the layout, reduced padding, and improved responsiveness. |
| Hero section remained visible after completing an audit. | Added a collapsible hero section with smooth transitions after analysis. |
| Report cards looked static. | Implemented Framer Motion animations and staggered transitions. |
| Overall score card lacked visual feedback. | Redesigned it with animated progress, health labels, and status indicators. |
| React Error #130 occurred after receiving a successful API response. | Fixed an invalid component import/export and corrected the component hierarchy. |
| Report failed to render even though the backend returned valid data. | Updated component props to match the `AuditReport` interface. |
| Recent audits were not stored correctly. | Fixed Local Storage integration and audit history management. |
| Error messages appeared at the bottom of the page after scrolling. | Moved error handling closer to the search interface for better visibility. |
| Loading experience felt abrupt. | Added loading skeletons, transitions, and smoother UI feedback. |
| README lacked proper setup instructions. | Documented local setup, Docker, deployment, API usage, and troubleshooting. |

# Backend

| Challenge | Solution |

| Invalid URLs caused backend failures. | Added URL validation before starting the audit. |
| Some websites returned unexpected scraping results. | Improved request handling and response validation. |
| Response time was not tracked. | Added response time measurement for every audit request. |

# Docker

| Challenge | Solution |

| Needed to verify frontend-backend communication inside Docker. | Tested API connectivity using Docker Compose and browser network tools. |
| Docker documentation was missing. | Added Docker setup and usage instructions. |

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
VITE_API_URL=https://page-pulse.onrender.com
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

After deployment backend will be available at:
```
https://page-pulse.onrender.com
```
audit endpoint becomes:
```
https://page-pulse.onrender.com/api/v1/audit
