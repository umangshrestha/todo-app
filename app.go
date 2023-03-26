package main

import (
	"context"

	"github.com/umangshrestha/todo-app/src/config"
	"github.com/umangshrestha/todo-app/src/database"
	"github.com/umangshrestha/todo-app/src/logger"
	"gorm.io/gorm"
)

var log = logger.NewLogger(config.AppLog)

// App struct
type App struct {
	ctx context.Context
	db  *gorm.DB
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

func (a *App) setDB(db *gorm.DB) *App {
	a.db = db
	return a
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Ping() bool {
	log.Info("Ping")
	return true
}

func (a *App) FindOneTodo(id uint) *database.Todo {
	log.Info("FindOneTodo:", id)
	data, err := database.FindTodoById(a.db, id)
	if err != nil {
		log.Fatalln("FindOne:", err)
	}
	log.Debug(data)
	return data
}

func (a *App) CreateTodo(input database.Input) *database.Todo {
	log.Debugln("CreateTodo:", input)
	todo := input.ToTodo()
	if len(input.Title) == 0 {
		log.Fatalln("No Title Found")
	}
	id, err := database.CreateTodo(a.db, todo)
	if err != nil {
		log.Fatalln("Create:", err)
	}
	return a.FindOneTodo(id)
}

func (a *App) UpdateTodo(id uint, input database.Input) *database.Todo {
	log.Debugln("updateTodo:", id, input)
	todo := input.ToTodo()
	if len(input.Title) > 0 {
		todo.Title = input.Title
	}
	err := database.UpdateTodoById(a.db, id, todo)
	if err != nil {
		log.Fatalln("Update:", err)
	}
	return a.FindOneTodo(id)
}

func (a *App) DeleteTodo(id uint) *database.Todo {
	data := a.FindOneTodo(id)
	err := database.DeleteTodoById(a.db, id)
	if err != nil {
		log.Fatalln("Delete:", err)
	}
	log.Debug(data)
	return data
}

func (a *App) FindAllTodo(query *database.Query) []*database.Todo {
	log.Info("FindAll:", query)
	data, err := database.FindAllTodo(a.db, query)
	if err != nil {
		log.Fatalln("FindAll:", err)
	}
	log.Debug(data)
	return data
}

func (a *App) CountTodo() *database.Count {
	log.Info("Count")
	count, err := database.CountTodo(a.db)
	if err != nil {
		log.Fatalln("Count:", err)
	}
	log.Debug(count)
	return count
}
