package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func NewDB(dbName string) (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open(dbName), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	if err = db.AutoMigrate(Todo{}); err != nil {
		return nil, err
	}
	// Seed(db)
	return db, nil
}
