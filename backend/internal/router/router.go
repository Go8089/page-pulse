package router

import (
	"github.com/Go8089/page-pulse/internal/app"
	"github.com/Go8089/page-pulse/internal/health"

	"github.com/gin-gonic/gin"
)

func New(application *app.Application) *gin.Engine {
	r := gin.New()

	// Middleware (we'll add custom middleware next)
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	healthHandler := health.NewHandler()

	api := r.Group("/api/v1")
	{
		api.GET("/health", healthHandler.Health)
	}

	return r
}
