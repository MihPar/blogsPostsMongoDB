"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const posts_input_value_middleware_1 = require("./../middleware/posts_input_value_middleware");
const utils_1 = require("../utils");
const posts_db_repositories_1 = require("./../repositories/posts_db_repositories");
const express_1 = require("express");
const authrorisation_1 = require("../middleware/authrorisation");
const validatorMiddleware_1 = require("../middleware/validatorMiddleware");
exports.postsRouter = (0, express_1.Router)({});
/******************************* get **********************************/
exports.postsRouter.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const findAllPosts = yield posts_db_repositories_1.postsRepositories.findAllPosts();
        res.status(utils_1.HTTP_STATUS.OK_200).json(findAllPosts);
    });
});
/******************************* post **********************************/
exports.postsRouter.post("/", authrorisation_1.authMiddleware, posts_input_value_middleware_1.inputPosstTitleValidator, posts_input_value_middleware_1.inputPostsShortDescriptionValidator, posts_input_value_middleware_1.inputPostsContentValidator, posts_input_value_middleware_1.inpurtPostsBlogIdValidator, validatorMiddleware_1.ValueMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const createNewPost = yield posts_db_repositories_1.postsRepositories.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
        res.status(utils_1.HTTP_STATUS.CREATED_201).json(createNewPost);
    });
});
/******************************* get{id} **********************************/
exports.postsRouter.get("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postId = yield posts_db_repositories_1.postsRepositories.findPostId(req.params.id);
        if (!postId) {
            res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
        }
        else {
            res.sendStatus(utils_1.HTTP_STATUS.OK_200);
        }
    });
});
/******************************* put{id} **********************************/
exports.postsRouter.put("/:id", authrorisation_1.authMiddleware, posts_input_value_middleware_1.inputPosstTitleValidator, posts_input_value_middleware_1.inputPostsShortDescriptionValidator, posts_input_value_middleware_1.inputPostsContentValidator, posts_input_value_middleware_1.inpurtPostsBlogIdValidator, validatorMiddleware_1.ValueMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(req.params.id)
        const newPost = yield posts_db_repositories_1.postsRepositories.updatePostId(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
        if (!newPost) {
            res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
        }
        else {
            res.sendStatus(utils_1.HTTP_STATUS.NO_CONTENT_204);
        }
    });
});
/******************************* delete{id} **********************************/
exports.postsRouter.delete('/:id', authrorisation_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedPostId = yield posts_db_repositories_1.postsRepositories.deletePostId(req.params.id);
        if (!deletedPostId) {
            res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
            return;
        }
        res.sendStatus(utils_1.HTTP_STATUS.NO_CONTENT_204);
    });
});
