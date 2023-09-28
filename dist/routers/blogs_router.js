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
exports.blogsRouter = void 0;
const blogs_input_value_middleware_1 = require("../middleware/blogs_input_value_middleware");
const blogs_db_repositories_1 = require("../repositories/blogs_db_repositories");
const utils_1 = require("../utils");
const express_1 = require("express");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllBlogs = yield blogs_db_repositories_1.blogsRepositories.findAllBlogs();
        res.status(utils_1.HTTP_STATUS.OK_200).json(getAllBlogs);
    });
});
exports.blogsRouter.post("/", blogs_input_value_middleware_1.inputBlogNameValidator, blogs_input_value_middleware_1.inputBlogsDescription, blogs_input_value_middleware_1.inputBlogsWebsiteUrl, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = yield blogs_db_repositories_1.blogsRepositories.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl);
        res.status(utils_1.HTTP_STATUS.CREATED_201).json(newPost);
    });
});
