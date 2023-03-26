package database

import "time"

type Input struct {
	Title     string `json:"title"`
	Completed bool   `json:"completed,omitempty"`
	Deleted   bool   `json:"deleted,omitempty"`
}

func (i *Input) ToTodo() *Todo {
	var todo *Todo
	todo.Title = i.Title
	if i.Completed {
		todo.CompletedAt.Valid = true
		todo.CompletedAt.Time = time.Now()
	} else {
		todo.CompletedAt.Valid = false
		todo.CompletedAt.Time = time.Time{}
	}
	if i.Deleted {
		todo.DeletedAt.Valid = true
		todo.DeletedAt.Time = time.Now()
	} else {
		todo.DeletedAt.Valid = false
		todo.DeletedAt.Time = time.Time{}
	}
	return todo
}

type Query struct {
	Limit     int  `json:"limit,omitempty"`
	Offset    int  `json:"offset,omitempty"`
	Deleted   bool `json:"deleted,omitempty"`
	Completed bool `json:"completed,omitempty"`
}

type Count struct {
	Todo      int64 `json:"todo"`
	Completed int64 `json:"completed"`
	Deleted   int64 `json:"deleted"`
	Total     int64 `json:"Total"`
}
