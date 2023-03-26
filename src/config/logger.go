package config

import "github.com/sirupsen/logrus"

const (
	LogLevel   = logrus.DebugLevel
	LogPath    = "./log"
	MaxSize    = 100 // megabytes
	MaxBackups = 3
	MaxAge     = 28 // days
	Compress   = true
)

const (
	AppLog = "app.log"
)
