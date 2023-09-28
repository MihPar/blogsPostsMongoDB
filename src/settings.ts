import express from "express";
import {postsRouter} from './routers/posts_router'
import { blogsRouter } from "./routers/blogs_router";


export const startApp = function() {
	const app = express()
	app.use(express.json())
	app.use('/posts', postsRouter)
	app.use('/blogs', blogsRouter)
	return app
}