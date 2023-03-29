package database

import (
	"github.com/go-playground/validator/v10"
	"github.com/umangshrestha/todo-app/src/config"
)

type CreateInput struct {
	Title       string `json:"title"`
	IsCompleted bool   `json:"isCompleted,omitempty"`
}

func (t *CreateInput) Validate() error {
	validate := validator.New()
	return validate.Struct(t)
}

func (t *CreateInput) Todo() Todo {
	return Todo{
		Title:       t.Title,
		IsCompleted: t.IsCompleted,
	}
}

type Query struct {
	Limit   int  `json:"limit,omitempty" validate:"omitempty,min=5,max=200"`
	Offset  int  `json:"offset,omitempty"`
	Deleted bool `json:"deleted,omitempty"`
}

func (t *Query) Validate() error {
	if t.Limit == 0 {
		t.Limit = config.Limit
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
