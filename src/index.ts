import express from 'express'
import { postsRouter } from './routers/posts_router'
import { blogsRouter } from './routers/blogs_router'
import { deletedAllRouters } from './routers/deletAllRouters'




export const createApp = function() {
	const app = express()
	app.use(express.json())
	app.use('/posts', postsRouter)
	app.use('/blogs', blogsRouter)
	app.use('/testing/all-data', deletedAllRouters)
	
	return app
}
