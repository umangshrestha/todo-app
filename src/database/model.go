package database

import (
	"database/sql"
	"time"
)

type Todo struct {
	ID          uint         `gorm:"primaryKey" json:"id"`
	Title       string       `gorm:"not null" json:"title"`
	CreatedAt   time.Time    `gorm:"not null;default:current_timestamp" json:"createdAt"`
	UpdatedAt   time.Time    `gorm:"autoUpdateTime:true" json:"updatedAt"`
	DeletedAt   sql.NullTime `gorm:"type:TIMESTAMP NULL" json:"deletedAt,omitempty"`
	CompletedAt sql.NullTime `gorm:"type:TIMESTAMP NULL" json:"completedAt,omitempty"`
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
