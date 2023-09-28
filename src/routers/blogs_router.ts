import { BlogsType } from "../db/db_blogs";
import {
  inputBlogNameValidator,
  inputBlogsDescription,
  inputBlogsWebsiteUrl,
} from "../middleware/blogs_input_value_middleware";
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
  inputBlogNameValidator,
  inputBlogsDescription,
  inputBlogsWebsiteUrl,
  async function (req: Request, res: Response) {
    const newPost: BlogsType = await blogsRepositories.createNewBlog(
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    res.status(HTTP_STATUS.CREATED_201).json(newPost);
  }
);
