package audit

import (
	"context"

	"github.com/Go8089/page-pulse/internal/fetcher"
	"github.com/Go8089/page-pulse/internal/parser"
)

type Fetcher interface {
	Fetch(ctx context.Context, url string) (*fetcher.Result, error)
}

type HTMLParser interface {
	Parse(html string) (*parser.Result, error)
}

type Service interface {
	Audit(ctx context.Context, url string) (*AuditReport, error)
}
