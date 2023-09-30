import { postsRepositories } from './../repositories/posts_db_repositories';
import { blogsRepositories } from './../repositories/blogs_db_repositories';
import { Router, Request, Response } from "express"
import { HTTP_STATUS } from '../utils';

export const deletedAllRouters = Router({})

deletedAllRouters.delete('/', async function(req: Request, res: Response) {
	await blogsRepositories.deleteAllBlogs()
	await postsRepositories.deleteAllPosts()
	res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})