package main

import (
	"context"
	"time"

	"github.com/sirupsen/logrus"
	"github.com/umangshrestha/todo-app/database"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx context.Context
	log *logrus.Logger
	db  *gorm.DB
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

func (a *App) setLogger(log *logrus.Logger) *App {
	a.log = log
	return a
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
	return true
}

func (a *App) FindOneTodo(id uint) map[string]any {
	a.log.Debugln("FindOneTodo:", id)
	data, err := database.FindById(a.db, id)
	if err != nil {
		a.log.Fatalln("FindOne:", err)
	}
	return data.ToMap()
}

func (a *App) CreateTodo(id uint, m map[string]any) map[string]any {
	a.log.Debugln("CreateTodo:", m)
	var todo *database.Todo
	input := MapToInput[Input](&m, a.log)
	if len(input.Title) == 0 {
		a.log.Fatalln("No Title Found")
	}
	todo.Title = input.Title
	if input.Completed {
		todo.CompletedAt.Valid = true
		todo.CompletedAt.Time = time.Now()
	}
	if input.Deleted {
		todo.DeletedAt.Valid = true
		todo.DeletedAt.Time = time.Now()
	}
	id, err := database.CreateTodo(a.db, todo)
	if err != nil {
		a.log.Fatalln("Create:", err)
	}
	return a.FindOneTodo(id)
}

func (a *App) UpdateTodo(id uint, m map[string]any) map[string]any {
	a.log.Debugln("updateTodo:", id, m)
	var todo *database.Todo
	input := MapToInput[Input](&m, a.log)
	if len(input.Title) > 0 {
		todo.Title = input.Title
	}
	if input.Completed {
		todo.CompletedAt.Valid = true
		todo.CompletedAt.Time = time.Now()
	} else {
		todo.CompletedAt.Valid = false
		todo.CompletedAt.Time = time.Time{}
	}
	if input.Deleted {
		todo.DeletedAt.Valid = true
		todo.DeletedAt.Time = time.Now()
	} else {
		todo.DeletedAt.Valid = false
		todo.DeletedAt.Time = time.Time{}
	}
	err := database.UpdateTodoById(a.db, id, todo)
	if err != nil {
		a.log.Fatalln("Update:", err)
	}
	return a.FindOneTodo(id)
}

func (a *App) DelteTodo(id uint) map[string]any {
	data := a.FindOneTodo(id)
	err := database.DeleteTodoById(a.db, id)
	if err != nil {
		a.log.Fatalln("Delete:", err)
	}
	return data
}

func (a *App) FindAllTodo(m map[string]any) []map[string]any {
	input := MapToInput[Query](&m, a.log)
	data, err := database.FindAll(a.db, input.Limit, input.Offset, input.Deleted, input.Completed)
	a.log.Debug(input)
	if err != nil {
		a.log.Fatalln("FindAll:", err)
	}

	arr := make([]map[string]any, len(data))
	for i, v := range data {
		arr[i] = v.ToMap()
	}
	return arr
}

func (a *App) CountTodo() map[string]int64 {
	var result map[string]int64
	var total, completed, deleted, todo int64
	database.Count(a.db, &total, &completed, &deleted, &todo)
	result["todo"] = todo

	result["completed"] = completed
	result["total"] = total

	result["deleted"] = deleted
	return result
}
