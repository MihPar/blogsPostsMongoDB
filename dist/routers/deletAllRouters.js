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
exports.deletedAllRouters = void 0;
const posts_db_repositories_1 = require("./../repositories/posts_db_repositories");
const blogs_db_repositories_1 = require("./../repositories/blogs_db_repositories");
const authrorisation_1 = require("./../middleware/authrorisation");
const express_1 = require("express");
const utils_1 = require("../utils");
exports.deletedAllRouters = (0, express_1.Router)({});
exports.deletedAllRouters.delete('/', authrorisation_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield blogs_db_repositories_1.blogsRepositories.deleteAllBlogs();
        yield posts_db_repositories_1.postsRepositories.deleteAllPosts();
        res.sendStatus(utils_1.HTTP_STATUS.NO_CONTENT_204);
    });
});
