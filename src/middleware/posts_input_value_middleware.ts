import { blogsRepositories } from "./../repositories/blogs_db_repositories";
import { body } from "express-validator";

export const inpurtPostsBlogIdValidator = body("blogId")
  .isString()
  .trim()
  .notEmpty()
  .custom(async (id) => {
    const blogExist = await blogsRepositories.findBlogId(id);
    if (!blogExist) {
      throw new Error("Blog is not exists");
    }
    return true;
  })
  .withMessage("Invalid blogId");

export const inputPosstTitleValidator = body("title")
  .isString()
  .trim()
  .notEmpty()
  .isLength({ min: 1, max: 30 })
  .withMessage("Title should be length from 1 to 30 symbols");

export const inputPostsShortDescriptionValidator = body("shortDescription")
  .isString()
  .trim()
  .notEmpty()
  .isLength({ min: 1, max: 100 })
  .withMessage("ShortDescription should be length from 1 to 100 symbols");

export const inputPostsContentValidator = body("content")
  .isString()
  .trim()
  .notEmpty()
  .isLength({ min: 1, max: 1000 })
  .withMessage("Content should be length from 1 to 1000 symbols");
