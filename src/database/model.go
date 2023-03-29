package database

import (
	"time"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type Todo struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	Title       string         `gorm:"not null" json:"title"  validate:"required,min=5,max=100"`
	CreatedAt   time.Time      `gorm:"not null;default:current_timestamp" json:"createdAt"`
	UpdatedAt   time.Time      `gorm:"autoUpdateTime:true" json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
	IsCompleted bool           `gorm:"not null;default:false" json:"isCompleted"`
	CompletedAt time.Time      `gorm:"default:null" json:"completedAt"`
}

func (t *Todo) Validate() error {
	validate := validator.New()
	return validate.Struct(t)
}
