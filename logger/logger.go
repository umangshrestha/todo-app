package logger

import (
	"path/filepath"

	"github.com/sirupsen/logrus"
	"github.com/umangshrestha/todo-app/config"
	"gopkg.in/natefinch/lumberjack.v2"
)

func NewLogger(fileName string) *logrus.Logger {
	logger := logrus.New()
	logger.SetFormatter(&logrus.JSONFormatter{})
	logRotation := &lumberjack.Logger{
		Filename:   filepath.Join(config.LogPath, fileName),
		MaxSize:    config.MaxSize,
		MaxBackups: config.MaxBackups,
		MaxAge:     config.MaxAge,
		Compress:   config.Compress,
	}
	logger.SetOutput(logRotation)
	return logger
}
