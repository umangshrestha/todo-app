package main

import (
	"embed"
	"time"

	"github.com/robfig/cron/v3"

	"github.com/umangshrestha/todo-app/src/config"
	"github.com/umangshrestha/todo-app/src/database"
	"github.com/umangshrestha/todo-app/src/dialog"
	"github.com/umangshrestha/todo-app/src/logger"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS
var log = logger.NewLogger(config.AppLog)

func main() {
	app := NewApp()
	db, err := database.NewDB(config.DBName)
	if err != nil {
		log.Fatalln(err)
	}
	c := cron.New()
	// Set up the cron job to run every day at midnight
	c.AddFunc("0 0 * * *", func() {
		cutoffDate := time.Now().AddDate(0, 0, -config.DelteOldData)
		log.Infof("Deleting todos older than %s", cutoffDate)
		database.DeleteOldData(db, cutoffDate)
	})

	app.setDB(db)

	wailsOption := options.App{
		Title:  "Todo App",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		OnBeforeClose:    dialog.BeforeClose,
		Bind: []interface{}{
			app,
		},
	}

	if err = wails.Run(&wailsOption); err != nil {
		log.Fatalln("Error:", err.Error())
	}
}
