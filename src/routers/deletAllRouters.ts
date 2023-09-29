import { postsRepositories } from './../repositories/posts_db_repositories';
import { blogsRepositories } from './../repositories/blogs_db_repositories';
import { authMiddleware } from './../middleware/authrorisation';
import { blogsCollection } from '../db/db';
import { blogsRouter } from './blogs_router';
import { postsCollection } from '../db/db';
import { Router, Request, Response } from "express"
import { postsRouter } from "./posts_router"
import { HTTP_STATUS } from '../utils';

export const deletedAllRouters = Router({})

deletedAllRouters.delete('/', async function(req: Request, res: Response) {
	await blogsRepositories.deleteAllBlogs()
	await postsRepositories.deleteAllPosts()
	res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})