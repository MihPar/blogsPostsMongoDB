"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inpurtPostsBlogIdValidator = exports.inputPostsContentValidator = exports.inputPostsShortDescriptionValidator = exports.inputPosstTitleValidator = void 0;
const blogs_db_repositories_1 = require("./../repositories/blogs_db_repositories");
const express_validator_1 = require("express-validator");
exports.inputPosstTitleValidator = (0, express_validator_1.body)('title')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 30 })
    .withMessage('Title should be length from 1 to 30 symbols');
exports.inputPostsShortDescriptionValidator = (0, express_validator_1.body)('shortDescription')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 100 })
    .withMessage('ShortDescription should be length from 1 to 100 symbols');
exports.inputPostsContentValidator = (0, express_validator_1.body)('content')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content should be length from 1 to 1000 symbols');
exports.inpurtPostsBlogIdValidator = (0, express_validator_1.body)('blogId')
    .isString()
    .trim()
    .notEmpty()
    .custom(id => {
    const blogExist = blogs_db_repositories_1.blogsRepositories.findBlogId(id);
    if (!blogExist) {
        throw new Error('Blog is not exists');
    }
    return true;
})
    .withMessage('Invalid blogId');
