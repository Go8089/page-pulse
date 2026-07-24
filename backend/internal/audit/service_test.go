package audit

import (
	"context"
    "errors"
	"testing"
	"github.com/Go8089/page-pulse/internal/fetcher"
	"github.com/Go8089/page-pulse/internal/parser"
)

type MockFetcher struct {
	Result *fetcher.Result
	Err    error
}

func (m *MockFetcher) Fetch(ctx context.Context, url string) (*fetcher.Result, error) {
	return m.Result, m.Err
}

type MockParser struct {
	Result *parser.Result
	Err    error
}

func (m *MockParser) Parse(html string) (*parser.Result, error) {
	return m.Result, m.Err
}
func TestAuditService_Audit_Success(t *testing.T) {

	fetcher := &MockFetcher{
		Result: &fetcher.Result{
			StatusCode:     200,
			ResponseTimeMS: 120,
			Body:           []byte("<html></html>"),
		},
	}

	parser := &MockParser{
		Result: &parser.Result{
			Title:            "Example",
			MetaDescription:  "Demo",
			H1Count:          1,
			ImagesMissingAlt: 2,
			WordCount:        150,
		},
	}

	service := NewService(fetcher, parser)

	report, err := service.Audit(context.Background(), "https://example.com")

	if err != nil {
		t.Fatal(err)
	}

	if report.HTTPStatus != 200 {
		t.Fatalf("expected 200 got %d", report.HTTPStatus)
	}

	if report.Title != "Example" {
		t.Fatal("title mismatch")
	}

	if report.WordCount != 150 {
		t.Fatal("word count mismatch")
	}
}
func TestAuditService_Audit_FetcherError(t *testing.T) {
	expectedErr := errors.New("fetch failed")

	fetcher := &MockFetcher{
		Err: expectedErr,
	}

	parser := &MockParser{}

	service := NewService(fetcher, parser)

	_, err := service.Audit(context.Background(), "https://example.com")

	if err == nil {
		t.Fatal("expected error")
	}

	if !errors.Is(err, expectedErr) {
		t.Fatal("unexpected error")
	}
}
func TestAuditService_Audit_ParserError(t *testing.T) {
	expectedErr := errors.New("parse failed")

	fetcher := &MockFetcher{
		Result: &fetcher.Result{
			StatusCode:     200,
			ResponseTimeMS: 100,
			Body:           []byte("<html></html>"),
		},
	}

	parser := &MockParser{
		Err: expectedErr,
	}

	service := NewService(fetcher, parser)

	_, err := service.Audit(context.Background(), "https://example.com")

	if err == nil {
		t.Fatal("expected error")
	}

	if !errors.Is(err, expectedErr) {
		t.Fatal("unexpected error")
	}
}
func TestAuditService_Audit_ReportMapping(t *testing.T) {

	fetcher := &MockFetcher{
		Result: &fetcher.Result{
			StatusCode:     201,
			ResponseTimeMS: 321,
			Body:           []byte("<html></html>"),
		},
	}

	parser := &MockParser{
		Result: &parser.Result{
			Title:            "Google",
			MetaDescription:  "Search Engine",
			H1Count:          5,
			ImagesMissingAlt: 7,
			WordCount:        999,
		},
	}

	service := NewService(fetcher, parser)

	report, err := service.Audit(context.Background(), "https://google.com")
	if err != nil {
		t.Fatal(err)
	}

	if report.HTTPStatus != 201 ||
		report.ResponseTimeMS != 321 ||
		report.Title != "Google" ||
		report.MetaDescription != "Search Engine" ||
		report.H1Count != 5 ||
		report.ImagesMissingAlt != 7 ||
		report.WordCount != 999 {
		t.Fatal("report mapping failed")
	}
}