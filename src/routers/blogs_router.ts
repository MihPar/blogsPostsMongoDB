import { BlogsType } from "../db/db_blogs";
import { authMiddleware } from "../middleware/authrorisation";
import {
  inputBlogNameValidator,
  inputBlogsDescriptionValidator,
  inputBlogsWebsiteUrlValidator,
} from "../middleware/blogs_input_value_middleware";
import { ValueMiddleware } from "../middleware/validatorMiddleware";
import { blogsRepositories } from "../repositories/blogs_db_repositories";
import { HTTP_STATUS } from "../utils";
import { Router, Request, Response } from "express";

export const blogsRouter = Router({});

blogsRouter.get("/", async function (req: Request, res: Response) {
  const getAllBlogs: BlogsType[] = await blogsRepositories.findAllBlogs();
  res.status(HTTP_STATUS.OK_200).json(getAllBlogs);
});

blogsRouter.post(
  "/",
  ValueMiddleware,
  authMiddleware,
  inputBlogNameValidator,
  inputBlogsDescriptionValidator,
  inputBlogsWebsiteUrlValidator,
  async function (req: Request, res: Response) {
    const newPost: BlogsType = await blogsRepositories.createNewBlog(
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    res.status(HTTP_STATUS.CREATED_201).json(newPost);
  }
);

blogsRouter.get("/:id", async function (req: Request, res: Response) {
  const blogId = await blogsRepositories.findBlogId(req.params.id);
  if (!blogId) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
  } else {
    res.sendStatus(HTTP_STATUS.OK_200);
  }
});

blogsRouter.put(
  "/:id",
  authMiddleware,
  ValueMiddleware,
  inputBlogNameValidator,
  inputBlogsDescriptionValidator,
  inputBlogsWebsiteUrlValidator,
  async function (req: Request, res: Response) {
    const updateBlogId = await blogsRepositories.updateBlogId(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    if (!updateBlogId) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);

blogsRouter.delete('/:id', authMiddleware, async function(req: Request, res: Response) {
	const deleteBlogId = await blogsRepositories.deleteId(req.params.id)
	if(!deleteBlogId) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
	}
	res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})
