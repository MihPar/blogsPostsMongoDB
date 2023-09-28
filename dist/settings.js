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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = void 0;
const express_1 = __importDefault(require("express"));
const posts_router_1 = require("./routers/posts_router");
const blogs_router_1 = require("./routers/blogs_router");
const db_blogs_1 = require("./db/db_blogs");
const db_posts_1 = require("./db/db_posts");
const startApp = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_blogs_1.runDbBlogs)();
        yield (0, db_posts_1.runDbPosts)();
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use('/posts', posts_router_1.postsRouter);
        app.use('/blogs', blogs_router_1.blogsRouter);
        return app;
    });
};
exports.startApp = startApp;
