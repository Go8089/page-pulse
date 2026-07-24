package config

import (
	"os"
	"strconv"
)

type Config struct {
	AppEnv         string
	ServerPort     string
	RequestTimeout int
	RateLimitRPS   int
}

func Load() *Config {
	return &Config{
		AppEnv:         getEnv("APP_ENV", "development"),
		ServerPort:     getEnv("SERVER_PORT", "8085"),
		RequestTimeout: getEnvAsInt("REQUEST_TIMEOUT", 10),
		RateLimitRPS:   getEnvAsInt("RATE_LIMIT_RPS", 10),
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

func getEnvAsInt(key string, fallback int) int {
	if value, exists := os.LookupEnv(key); exists {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return fallback
}
