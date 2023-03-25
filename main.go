package main

import (
	"embed"

	"github.com/umangshrestha/todo-app/config"
	"github.com/umangshrestha/todo-app/database"
	"github.com/umangshrestha/todo-app/logger"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Creating Logger
	log := logger.NewLogger(config.AppLog)
	db, err := database.NewDB(config.DBName)
	if err != nil {
		log.Fatalln(err)
	}
	app := NewApp().setLogger(log).setDB(db)

	// Create application with options
	err = wails.Run(&options.App{
		Title:  "todo-app",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		log.Fatalln("Error:", err.Error())
	}
}
