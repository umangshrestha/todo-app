package database

import (
	"time"

	"gorm.io/gorm"
)

func CreateTodo(db *gorm.DB, todo *Todo) (uint, error) {
	if db == nil {
		return 0, ErrDBNil
	}
	if err := todo.Validate(); err != nil {
		return 0, err
	}
	result := db.Create(todo)
	if result.Error != nil {
		return 0, result.Error
	}
	return todo.ID, nil
}

func FindAllTodo(db *gorm.DB, q *Query) (*FindAllResponse, error) {
	if db == nil {
		return nil, ErrDBNil
	}
	var response FindAllResponse
	var todos []Todo
	if err := q.Validate(); err != nil {
		return nil, err
	}
	query := db.Order("created_at DESC").Limit(q.Limit).Offset(q.Offset)

	if q.Deleted {
		query = query.Unscoped().Where("deleted_at IS NOT NULL")
	}

	result := query.Find(&todos).Count(&response.Count)
	if result.Error != nil {
		return nil, result.Error
	}
	response.Data = todos

	return &response, nil
}

func FindTodoById(db *gorm.DB, id uint) (*Todo, error) {
	var todo Todo
	result := db.First(&todo, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &todo, nil
}

func UpdateTodoById(db *gorm.DB, id uint, updates map[string]any) error {
	if db == nil {
		return ErrDBNil
	}
	result := db.Model(&Todo{}).Where("id = ?", id)
	if title, ok := updates["title"].(string); ok && len(title) > 0 {
		result = result.Update("title", title)
	}

	if completed, ok := updates["completed"].(bool); ok {
		if completed {
			result = result.Update("completed_at", nil)
		} else {
			result = result.Update("completed_at", time.Now())
		}
	}

	if result.Error != nil {
		return result.Error
	}
	return nil
}

func DeleteTodoById(db *gorm.DB, id uint, hardDelete bool) error {
	if db == nil {
		return ErrDBNil
	}
	var result *gorm.DB
	if hardDelete {
		result = db.Unscoped().Delete(&Todo{}, id)
	} else {
		result = db.Delete(&Todo{}, id)
	}
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
	err := db.Model(&Todo{}).Where("completed_at IS NOT NULL").Where("deleted_at IS NULL").Count(&count.Completed).Error
	if err != nil {
		return nil, err
	}
	err = db.Model(&Todo{}).Where("deleted_at IS NULL").Where("completed_at IS NULL").Count(&count.Todo).Error
	if err != nil {
		return nil, err
	}
	err = db.Unscoped().Model(&Todo{}).Where("deleted_at IS NOT NULL").Count(&count.Deleted).Error
	if err != nil {
		return nil, err
	}
	err = db.Model(&Todo{}).Count(&count.Total).Error
	if err != nil {
		return nil, err
	}
	return &count, nil
}
