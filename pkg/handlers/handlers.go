package handlers

import "github.com/valyala/fasthttp"

func Hi(ctx *fasthttp.RequestCtx) {
	ctx.Response.SetBodyString("Hi")
}
