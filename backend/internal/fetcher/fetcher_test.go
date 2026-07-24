package fetcher

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	appErrors "github.com/Go8089/page-pulse/internal/errors"
)

func TestFetcher_Fetch_Success(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("<html><title>Hello</title></html>"))
	}))
	defer server.Close()

	f := New(5 * time.Second)

	result, err := f.Fetch(context.Background(), server.URL)
	if err != nil {
		t.Fatal(err)
	}

	if result.StatusCode != http.StatusOK {
		t.Fatalf("expected 200 got %d", result.StatusCode)
	}

	if len(result.Body) == 0 {
		t.Fatal("expected body")
	}
}
func TestFetcher_Fetch_NonHTML(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true}`))
	}))
	defer server.Close()

	f := New(5 * time.Second)

	_, err := f.Fetch(context.Background(), server.URL)

	if err != appErrors.ErrNonHTML {
		t.Fatalf("expected ErrNonHTML got %v", err)
	}
}
func TestFetcher_Fetch_Timeout(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(2 * time.Second)
		w.Header().Set("Content-Type", "text/html")
		w.Write([]byte("<html></html>"))
	}))
	defer server.Close()

	f := New(1 * time.Second)

	_, err := f.Fetch(context.Background(), server.URL)

	if err == nil {
		t.Fatal("expected timeout")
	}
}
func TestFetcher_Fetch_404(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html")
		w.Header().Set("Content-Type", "text/html")
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("<html><body><h1>404 Not Found</h1></body></html>"))
	}))
	defer server.Close()

	f := New(5 * time.Second)

	result, err := f.Fetch(context.Background(), server.URL)
	if err != nil {
		t.Fatal(err)
	}

	if result.StatusCode != http.StatusNotFound {
		t.Fatalf("expected 404 got %d", result.StatusCode)
	}
}
