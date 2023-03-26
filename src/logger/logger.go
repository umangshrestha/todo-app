package logger

import (
	"path/filepath"
	"time"

	"github.com/sirupsen/logrus"
	"github.com/umangshrestha/todo-app/src/config"
	"gopkg.in/natefinch/lumberjack.v2"
)

func NewLogger(fileName string) *logrus.Logger {
	logger := logrus.New()
	logger.SetFormatter(&logrus.TextFormatter{})
	logger.SetLevel(config.LogLevel)
	logRotation := &lumberjack.Logger{
		Filename:   filepath.Join(config.LogPath, fileName),
		MaxSize:    config.MaxSize,
		MaxBackups: config.MaxBackups,
		MaxAge:     config.MaxAge,
		Compress:   config.Compress,
	}
	logger.SetOutput(logRotation)
	logger.Debugln("Started Logger:", time.Now())
	return logger
}
