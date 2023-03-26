package database

import (
	"github.com/umangshrestha/todo-app/src/config"
	"gorm.io/gorm"
)

func CreateTodo(db *gorm.DB, todo *Todo) (uint, error) {
	if db == nil {
		return 0, ErrDBNil
	}
	result := db.Create(todo)
	if result.Error != nil {
		return 0, result.Error
	}
	return todo.ID, nil
}

func FindAllTodo(db *gorm.DB, q *Query) ([]*Todo, error) {
	if db == nil {
		return nil, ErrDBNil
	}
	var todos []*Todo
	if q.Limit == 0 {
		q.Limit = config.Limit
	}
	query := db.Order("created_at DESC").Limit(q.Limit).Offset(q.Offset)

	if q.Deleted {
		query = query.Where("deleted_at IS NOT NULL")
	} else {
		query = query.Where("deleted_at IS NULL")
	}

	if q.Completed {
		query = query.Where("completed_at IS NOT NULL")
	} else {
		query = query.Where("completed_at IS NULL")
	}

	result := query.Find(&todos)

	if result.Error != nil {
		return nil, result.Error
	}

	return todos, nil
}

func FindTodoById(db *gorm.DB, id uint) (*Todo, error) {
	var todo Todo
	result := db.First(&todo, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &todo, nil
}

func UpdateTodoById(db *gorm.DB, id uint, updates *Todo) error {
	if db == nil {
		return ErrDBNil
	}
	result := db.Model(&Todo{}).Where("id = ?", id).Updates(updates)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func DeleteTodoById(db *gorm.DB, id uint) error {
	if db == nil {
		return ErrDBNil
	}
	result := db.Delete(&Todo{}, id)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func CountTodo(db *gorm.DB) (*Count, error) {
	if db == nil {
		return nil, ErrDBNil
	}
	var count Count
	db.Model(&Todo{}).Where("completed_at IS NOT NULL").Where("deleted_at IS NOT NULL").Count(&count.Completed)
	db.Model(&Todo{}).Where("deleted_at IS NULL").Where("completed_at IS NULL").Count(&count.Todo)
	db.Model(&Todo{}).Where("deleted_at IS NOT NULL").Count(&count.Deleted)
	db.Model(&Todo{}).Count(&count.Total)
	return &count, nil
}
