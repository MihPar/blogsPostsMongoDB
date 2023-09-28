import { Router, Request, Response } from "express"

export const blogsRouter = Router({})

blogsRouter.get('/', function(req: Request, res: Response) {
	res.status(200).send("Hell blogs")
})
