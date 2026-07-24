package main

import (
	"log"

	"github.com/Go8089/page-pulse/internal/app"
	"github.com/Go8089/page-pulse/internal/router"
)

func main() {
	application, err := app.New()
	if err != nil {
		log.Fatal(err)
	}

	r := router.New(application)

	application.Logger.Info("Starting server") // We'll replace this with structured fields in the next sprint

	if err := r.Run(":" + application.Config.ServerPort); err != nil {
		log.Fatal(err)
	}
}
