import { runDbBlogs } from './db/db_blogs'
import { runDbPosts } from './db/db_posts'
import express from 'express'
import { postsRouter } from './routers/posts_router'
import { blogsRouter } from './routers/blogs_router'
import { deletedAllRouters } from './routers/deletAllRouters'

const app = express()
const PORT  = process.env.PORT || 4000

const startApp = async function() {
	await runDbBlogs()
	await runDbPosts()
	app.use(express.json())
	app.use('/posts', postsRouter)
	app.use('/blogs', blogsRouter)
	app.use('/testing/all-data', deletedAllRouters)
	app.listen(PORT, function() {console.log(`Server was started at port ${PORT}`)})
	return app
}
startApp()