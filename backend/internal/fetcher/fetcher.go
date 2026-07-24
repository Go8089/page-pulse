package fetcher

import (
	"context"
	"errors"
	appErrors "github.com/Go8089/page-pulse/internal/errors"
	"io"
	"net/http"
	"strings"
	"time"
)

type Result struct {
	Body           []byte
	StatusCode     int
	ResponseTimeMS int64
	ContentType    string
}

type Fetcher struct {
	client *http.Client
}

func New(timeout time.Duration) *Fetcher {
	return &Fetcher{
		client: &http.Client{
			Timeout: timeout,
		},
	}
}

func (f *Fetcher) Fetch(ctx context.Context, url string) (*Result, error) {
	start := time.Now()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return nil, appErrors.ErrTimeout
		}
		return nil, err
	}

	req.Header.Set("User-Agent", "PagePulse/1.0")

	resp, err := f.client.Do(req)
	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return nil, appErrors.ErrTimeout
		}
		return nil, err
	}
	defer resp.Body.Close()

	contentType := resp.Header.Get("Content-Type")

	if !strings.Contains(contentType, "text/html") {
		return nil, appErrors.ErrNonHTML
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return nil, appErrors.ErrTimeout
		}
		return nil, err
	}

	return &Result{
		Body:           body,
		StatusCode:     resp.StatusCode,
		ResponseTimeMS: time.Since(start).Milliseconds(),
		ContentType:    contentType,
	}, nil
}
