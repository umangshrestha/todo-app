package database

import (
	"log"
	"time"

	"github.com/umangshrestha/todo-app/src/config"
	"gorm.io/gorm"
)

func DeleteOldData(db *gorm.DB) {
	cutoffDate := time.Now().AddDate(0, 0, -config.DelteOldData)
	// Find all soft-deleted users that were deleted more than 100 days ago
	var todos []Todo
	result := db.Unscoped().Where("deleted_at < ?", cutoffDate).Find(&todos)
	if result.Error != nil {
		log.Fatal(result.Error)
	}

	result = db.Unscoped().Delete(&todos)
	if result.Error != nil {
		log.Fatal(result.Error)
	}
}
