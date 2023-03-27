package database

import (
	"time"

	"github.com/go-playground/validator/v10"
)

type CreateInput struct {
	Title     string `json:"title"`
	Completed bool   `json:"completed,omitempty"`
}

func (i *CreateInput) ToTodo() *Todo {
	var todo Todo
	todo.Title = i.Title
	if i.Completed {
		todo.CompletedAt.Valid = true
		todo.CompletedAt.Time = time.Now()
	} else {
		todo.CompletedAt.Valid = false
		todo.CompletedAt.Time = time.Time{}
	}
	return &todo
}

type Query struct {
	Limit   int  `json:"limit,omitempty" validate:"omitempty,min=5,max=200"`
	Offset  int  `json:"offset,omitempty"`
	Deleted bool `json:"deleted,omitempty"`
}

func (t *Query) Validate() error {
	if t.Limit == 0 {
		t.Limit = 10
	}
	validate := validator.New()
	return validate.Struct(t)
}

type Count struct {
	Todo      int64 `json:"todo"`
	Completed int64 `json:"completed"`
	Deleted   int64 `json:"deleted"`
	Total     int64 `json:"total"`
}

type FindAllResponse struct {
	Data  []Todo `json:"data"`
	Count int64  `json:"count"`
}
