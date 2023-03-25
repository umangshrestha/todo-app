package database

import (
	"gorm.io/gorm"
)

func CreateTodo(db *gorm.DB, todo *Todo) (uint, error) {
	result := db.Create(todo)
	if result.Error != nil {
		return 0, result.Error
	}
	return todo.ID, nil
}

func FindAll(db *gorm.DB, limit, offset int, isDeleted, isCompleted bool) ([]*Todo, error) {
	var todos []*Todo
	query := db.Order("created_at DESC").Limit(limit).Offset(offset)

	if isDeleted {
		query = query.Where("deleted_at IS NOT NULL")
	} else {
		query = query.Where("deleted_at IS NULL")
	}

	if isCompleted {
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

func FindById(db *gorm.DB, id uint) (*Todo, error) {
	var todo Todo
	result := db.First(&todo, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &todo, nil
}

func UpdateTodoById(db *gorm.DB, id uint, updates *Todo) error {
	result := db.Model(&Todo{}).Where("id = ?", id).Updates(updates)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func DeleteTodoById(db *gorm.DB, id uint) error {
	result := db.Delete(&Todo{}, id)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
