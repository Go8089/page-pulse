package app

import (
	"github.com/Go8089/page-pulse/internal/config"
	"github.com/Go8089/page-pulse/internal/logger"
	"go.uber.org/zap"
)

type Application struct {
	Config *config.Config
	Logger *zap.Logger
}

func New() (*Application, error) {
	cfg := config.Load()

	log, err := logger.New()
	if err != nil {
		return nil, err
	}

	return &Application{
		Config: cfg,
		Logger: log,
	}, nil
}
