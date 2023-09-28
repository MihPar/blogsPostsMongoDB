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
exports.blogsRepositories = void 0;
const db_blogs_1 = require("../db/db_blogs");
exports.blogsRepositories = {
    findAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const filtered = {};
            return db_blogs_1.blogsCollection.find(filtered).toArray();
        });
    },
    createNewBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: new Date().toISOString(),
                name,
                description,
                websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: true
            };
            const result = yield db_blogs_1.blogsCollection.insertOne(newBlog);
            return newBlog;
        });
    }
};
