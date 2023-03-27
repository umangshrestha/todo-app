package database

import (
	"database/sql"
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
	CompletedAt sql.NullTime   `gorm:"type:TIMESTAMP NULL" json:"completedAt,omitempty"`
}

func (t *Todo) Validate() error {
	validate := validator.New()
	return validate.Struct(t)
}

func (t *Todo) ToMap() map[string]interface{} {
	out := map[string]interface{}{
		"id":        t.ID,
		"title":     t.Title,
		"createdAt": t.CreatedAt,
		"updatedAt": t.UpdatedAt,
	}
	if t.CompletedAt.Valid {
		out["completedAt"] = t.CompletedAt.Time
	}

	if t.DeletedAt.Valid {
		out["deletedAt"] = t.DeletedAt.Time
	}
	return out
}
