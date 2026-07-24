# Build stage
FROM golang:1.25-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o page-pulse ./cmd/server

# Runtime stage
FROM alpine:latest

WORKDIR /app

ENV GIN_MODE=release

COPY --from=builder /app/page-pulse .

EXPOSE 8085

CMD ["./page-pulse"]