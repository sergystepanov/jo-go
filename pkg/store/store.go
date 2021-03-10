package store

import "database/sql"
import _ "github.com/mattn/go-sqlite3"

type Store struct {
	Db *sql.DB
}

func NewStore() *Store {
	db, err := sql.Open("sqlite3", "file:locked.sqlite?cache=shared")
	if err != nil {
		panic(err)
	}

	return &Store{
		Db: db,
	}
}
