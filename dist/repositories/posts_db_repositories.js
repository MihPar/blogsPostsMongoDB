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
exports.postsRepositories = void 0;
const db_1 = require("../db/db");
const db_2 = require("../db/db");
exports.postsRepositories = {
    findAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const filtered = {};
            return db_2.postsCollection.find(filtered).toArray();
        });
    },
    updatePost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogsCollection.findOne({ id: blogId });
            // if(!blog) return null
            const newPost = {
                id: new Date().toISOString(),
                title,
                shortDescription,
                content,
                blogId,
                blogName: blog.name,
                createdAt: new Date().toISOString()
            };
            const post = yield db_2.postsCollection.insertOne(newPost);
            return newPost;
        });
    },
    findPostId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = yield db_2.postsCollection.findOne({ id: id });
            return postId ? postId : null;
        });
    },
    updatePostId(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_2.postsCollection.updateOne({ id: id }, { $set: { title: title, shortDescription: shortDescription, content: content, blogId: blogId } });
            return result.upsertedCount === 1;
        });
    },
    deletePostId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletePostId = yield db_2.postsCollection.deleteOne({ id: id });
            return deletePostId.deletedCount === 1;
        });
    },
    deleteAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAll = yield db_2.postsCollection.deleteMany({});
            return deletedAll.deletedCount === 1;
        });
    }
};
