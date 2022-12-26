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
exports.blogsRepository = void 0;
const db_1 = require("./db");
let blogs = [
    {
        "id": "firstblog",
        "name": "name1",
        "description": "description1",
        "websiteUrl": "websiteUrl",
        "createdAt": "2022-12-26T13:28:10.174Z"
    },
    {
        "id": "2",
        "name": "name2",
        "description": "description2",
        "websiteUrl": "websiteUrl",
        "createdAt": "2022-13-26T13:28:10.174Z"
    },
    {
        "id": "3",
        "name": "name3",
        "description": "description3",
        "websiteUrl": "websiteUrl",
        "createdAt": "2022-14-26T13:28:10.174Z"
    }
];
exports.blogsRepository = {
    getBlogByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.client.db("blogsAndPosts").collection("blog").findOne({ id: id });
            if (blog) {
                return blog;
            }
            else {
                return null;
            }
        });
    },
    getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.client.db("blogsAndPosts").collection("blog").find({}).toArray();
        });
    },
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                "id": (+(new Date())).toString(),
                "name": name,
                "description": description,
                "websiteUrl": websiteUrl,
                "createdAt": new Date().toISOString()
            };
            const result = yield db_1.client.db("blogsAndPosts").collection("blog").insertOne(newBlog);
            return newBlog;
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.client.db("blogsAndPosts").collection("blog")
                .updateOne({ id: id }, { $set: { name: name, description: description, websiteUrl: websiteUrl } });
            return result.matchedCount === 1;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.client.db("blogsAndPosts").collection("blog")
                .deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.client.db("blogsAndPosts").collection("blog")
                .deleteMany({});
            return true;
        });
    },
};
