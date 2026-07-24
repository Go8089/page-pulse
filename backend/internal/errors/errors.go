package errors

import "errors"

var (
	ErrInvalidURL     = errors.New("invalid url")
	ErrTimeout        = errors.New("request timeout")
	ErrNonHTML        = errors.New("non-html response")
	ErrParseHTML      = errors.New("failed to parse html")
	ErrInternalServer = errors.New("internal server error")
)
