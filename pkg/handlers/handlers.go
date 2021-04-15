package handlers

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/sergystepanov/jo-go/pkg/store/entity"
	"github.com/valyala/fasthttp"
)

func Hi(ctx *fasthttp.RequestCtx) {
	ctx.Response.SetBodyString("Hi")
}

func Data(ctx *fasthttp.RequestCtx, db *sql.DB) {
	var records []entity.Record
	rows, err := db.Query("select id, text, created_at, updated_at from record")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		r := entity.Record{}
		err = rows.Scan(&r.Id, &r.Text, &r.CreatedAt, &r.UpdatedAt)
		if err != nil {
			log.Fatal(err)
		}
		records = append(records, r)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	ctx.Response.SetBodyString(fmt.Sprintf("%+v", records))
}
