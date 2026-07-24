package router

import (
	"time"

	"github.com/Go8089/page-pulse/internal/app"
	"github.com/Go8089/page-pulse/internal/audit"
	"github.com/Go8089/page-pulse/internal/fetcher"
	"github.com/Go8089/page-pulse/internal/health"
	"github.com/Go8089/page-pulse/internal/parser"

	"github.com/gin-gonic/gin"
)

func New(application *app.Application) *gin.Engine {
	r := gin.New()

	// Middleware
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	// Health
	healthHandler := health.NewHandler()

	// Audit dependencies
	fetcherClient := fetcher.New(
		time.Duration(application.Config.RequestTimeout) * time.Second,
	)

	htmlParser := parser.New()

	auditService := audit.NewService(fetcherClient, htmlParser)
	auditHandler := audit.NewHandler(auditService)

	// Routes
	api := r.Group("/api/v1")
	{
		api.GET("/health", healthHandler.Health)
		api.POST("/audit", auditHandler.Audit)
	}

	return r
}
