package main

import (
	"flag"
	"unsafe"

	"github.com/sergystepanov/jo-go/pkg/handlers"
	"github.com/sergystepanov/jo-go/pkg/store"
	"github.com/valyala/fasthttp"
)

var bindHost string

func init() {
	flag.StringVar(&bindHost, "bind", ":8080", "your host")
	flag.Parse()
}

func main() {
	handler := func(ctx *fasthttp.RequestCtx) {
		switch asStr(ctx.Path()) {
		case "/api/v1/hi":
			handlers.Hi(ctx)
		default:
			ctx.Error(fasthttp.StatusMessage(fasthttp.StatusNotFound), fasthttp.StatusNotFound)
		}
	}

	server := &fasthttp.Server{
		Name:                          "jog",
		Handler:                       handler,
		DisableHeaderNamesNormalizing: true,
	}

	// store init
	persistence := store.NewStore()
	defer func() {
		err := persistence.Db.Close()
		if err != nil {
			panic(err)
		}
	}()

	//persistence.Db.

	if err := server.ListenAndServe(bindHost); err != nil {
		panic(err)
	}
}

func asStr(b []byte) string { return *(*string)(unsafe.Pointer(&b)) }
