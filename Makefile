.PHONY: backend test fmt vet

backend:
	cd backend && go run ./cmd/server

test:
	cd backend && go test ./...

fmt:
	cd backend && gofmt -w .

vet:
	cd backend && go vet ./...
