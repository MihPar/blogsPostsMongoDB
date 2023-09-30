import {
  inputPosstTitleValidator,
  inputPostsShortDescriptionValidator,
  inputPostsContentValidator,
  inpurtPostsBlogIdValidator,
} from "./../middleware/posts_input_value_middleware";
import { PostsType } from "../db/db";
import { HTTP_STATUS } from "../utils";
import { postsRepositories } from "./../repositories/posts_db_repositories";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/authrorisation";
import { ValueMiddleware } from "../middleware/validatorMiddleware";

export const postsRouter = Router({});

/******************************* get **********************************/

postsRouter.get("/", async function (req: Request, res: Response) {
  const findAllPosts: PostsType[] = await postsRepositories.findAllPosts();
  res.status(HTTP_STATUS.OK_200).json(findAllPosts);
});

/******************************* post **********************************/

postsRouter.post(
  "/",
  authMiddleware,
  inputPosstTitleValidator,
  inputPostsShortDescriptionValidator,
  inputPostsContentValidator,
  inpurtPostsBlogIdValidator,
  ValueMiddleware,
  async function (req: Request, res: Response) {
    const createNewPost: PostsType = await postsRepositories.createPost(
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.body.blogId
    );
    res.status(HTTP_STATUS.CREATED_201).json(createNewPost);
  }
);

/******************************* get{id} **********************************/

postsRouter.get("/:id", async function (req: Request, res: Response) {
  const postId = await postsRepositories.findPostId(req.params.id);
  if (!postId) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
  } else {
    res.sendStatus(HTTP_STATUS.OK_200);
  }
});

/******************************* put{id} **********************************/

postsRouter.put(
  "/:id",
  authMiddleware,
  inputPosstTitleValidator,
  inputPostsShortDescriptionValidator,
  inputPostsContentValidator,
  inpurtPostsBlogIdValidator,
  ValueMiddleware,
  async function (req: Request, res: Response) {
    const newPost = await postsRepositories.updatePostId(
      req.params.id,
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.body.blogId
    );
    if (!newPost) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);

/******************************* delete{id} **********************************/

postsRouter.delete('/:id', authMiddleware, async function(req: Request, res: Response) {
	const deletedPostId = await postsRepositories.deletePostId(req.params.id)
	if(!deletedPostId) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
	}
	res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})