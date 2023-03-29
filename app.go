package main

import (
	"context"

	"github.com/umangshrestha/todo-app/src/database"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx context.Context
	db  *gorm.DB
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

func (a *App) setDB(db *gorm.DB) {
	a.db = db
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

func (a *App) FindOneTodo(id uint) database.Todo {
	log.Infoln("FindOneTodo:", id)
	data, err := database.FindTodoById(a.db, id)
	if err != nil {
		log.Fatalln("FindOne:", err)
	}
	log.Debug(data)
	return *data
}

func (a *App) CreateTodo(input database.CreateInput) database.Todo {
	log.Debugf("CreateTodo: %+v\n", input)
	todo := input.Todo()
	id, err := database.CreateTodo(a.db, &todo)
	if err != nil {
		log.Fatalln("Create:", err)
	}
	return a.FindOneTodo(id)
}

func (a *App) UpdateTodo(id uint, input map[string]any) database.Todo {
	log.Debugln("updateTodo:", id, input)
	err := database.UpdateTodoById(a.db, id, input)
	if err != nil {
		log.Fatalln("Update:", err)
	}
	return a.FindOneTodo(id)
}

func (a *App) DeleteTodo(id uint, hardDelete bool) database.Todo {
	data := a.FindOneTodo(id)
	err := database.DeleteTodoById(a.db, id, hardDelete)
	if err != nil {
		log.Fatalln("Delete:", err)
	}
	log.Debug(data)
	return data
}

func (a *App) FindAllTodo(query *database.Query) database.FindAllResponse {
	log.Infof("FindAll:%+v\n", query)
	data, err := database.FindAllTodo(a.db, query)
	if err != nil {
		log.Fatalln("FindAll:", err)
	}
	log.Debug(data)
	return *data
}

func (a *App) CountTodo() database.Count {
	log.Info("Count")
	count, err := database.CountTodo(a.db)
	if err != nil {
		log.Fatalln("Count:", err)
	}
	log.Debugf("%+v\n", count)
	return *count
}
