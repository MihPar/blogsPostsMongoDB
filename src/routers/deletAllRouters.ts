import { authMiddleware } from './../middleware/authrorisation';
import { blogsCollection } from './../db/db_blogs';
import { blogsRouter } from './blogs_router';
import { postsCollection } from './../db/db_posts';
import { Router, Request, Response } from "express"
import { postsRouter } from "./posts_router"
import { HTTP_STATUS } from '../utils';

const deletedAllRouters = Router({})

deletedAllRouters.delete('/', authMiddleware,  async function(req: Request, res: Response) {
	blogsRouter.delete('/', authMiddleware, async function(req: Request, res: Response) {
		const deleteAllBlogs = await blogsCollection.deleteMany({})
		// res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
	})
	postsRouter.delete('/', authMiddleware, async function(req: Request, res: Response) {
		const deleteAllPosts = await postsCollection.deleteMany({})
		// res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
	})
	res.status(HTTP_STATUS.NO_CONTENT_204).send('All data is deleted')
})