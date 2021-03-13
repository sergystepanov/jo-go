package entity

import "time"

type Record struct {
	Id        int
	Text      string
	CreatedAt time.Time
	UpdatedAt time.Time
}
