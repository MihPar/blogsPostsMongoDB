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
const db_1 = require("../db/db");
exports.blogsRepositories = {
    findAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const filtered = {};
            return db_1.blogsCollection.find(filtered, { projection: { _id: 0 } }).toArray();
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
                isMembership: false,
            };
            const result = yield db_1.blogsCollection.insertOne(Object.assign({}, newBlog));
            return newBlog;
        });
    },
    findBlogId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogId = yield db_1.blogsCollection.findOne({ id: id }, { projection: { _id: 0 } });
            return blogId ? blogId : null;
        });
    },
    updateBlogId(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.updateOne({ id: id }, { $set: { name: name, description: description, websiteUrl: websiteUrl } });
            return result.modifiedCount === 1;
        });
    },
    deleteId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteBlogId = yield db_1.blogsCollection.deleteOne({ id: id });
            return deleteBlogId.deletedCount === 1;
        });
    },
    deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAll = yield db_1.blogsCollection.deleteMany({});
            return deletedAll.deletedCount === 1;
        });
    }
};
