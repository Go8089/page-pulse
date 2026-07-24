package audit

import (
	"context"
)

type auditService struct {
	fetcher Fetcher
	parser  HTMLParser
}

func NewService(fetcher Fetcher, parser HTMLParser) Service {
	return &auditService{
		fetcher: fetcher,
		parser:  parser,
	}
}

func (s *auditService) Audit(ctx context.Context, url string) (*AuditReport, error) {
	result, err := s.fetcher.Fetch(ctx, url)
	if err != nil {
		return nil, err
	}

	parsed, err := s.parser.Parse(string(result.Body))
	if err != nil {
		return nil, err
	}

	return &AuditReport{
		HTTPStatus:       result.StatusCode,
		ResponseTimeMS:   result.ResponseTimeMS,
		Title:            parsed.Title,
		MetaDescription:  parsed.MetaDescription,
		H1Count:          parsed.H1Count,
		ImagesMissingAlt: parsed.ImagesMissingAlt,
		WordCount:        parsed.WordCount,
	}, nil
}
