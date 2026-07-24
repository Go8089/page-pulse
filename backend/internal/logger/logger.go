package logger

import (
	"go.uber.org/zap"
)

func New() (*zap.Logger, error) {
	config := zap.NewProductionConfig()

	config.Encoding = "json"

	logger, err := config.Build()
	if err != nil {
		return nil, err
	}

	return logger, nil
}
