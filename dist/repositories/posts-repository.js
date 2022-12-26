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
exports.postsRepository = void 0;
const db_1 = require("./db");
let posts = [
    {
        "id": "firspost",
        "title": "music",
        "shortDescription": "post of music",
        "content": "content1",
        "blogId": "blogId1",
        "blogName": "Bob's trambon",
        "createdAt": "2022-12-26T13:28:10.174Z"
    },
    {
        "id": "2",
        "title": "title2",
        "shortDescription": "shortDescription2",
        "content": "content2",
        "blogId": "blogId2",
        "blogName": "blogName2",
        "createdAt": "2022-13-26T13:28:10.174Z"
    },
    {
        "id": "3",
        "title": "title3",
        "shortDescription": "shortDescription2",
        "content": "content3",
        "blogId": "blogId3",
        "blogName": "blogName3",
        "createdAt": "2022-14-26T13:28:10.174Z"
    },
];
const postCollection = db_1.client.db("blogsAndPosts").collection("post");
exports.postsRepository = {
    getPostByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield postCollection.findOne({ id: id });
            if (post) {
                return post;
            }
            else {
                return null;
            }
        });
    },
    getPostByBlogsID(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield postCollection.findOne({ blogId: blogId });
            if (post) {
                return post;
            }
            else {
                return null;
            }
        });
    },
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postCollection.find({}).toArray();
        });
    },
    createPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            let date;
            const newPost = {
                "id": (+(new Date())).toString(),
                "title": title,
                "shortDescription": shortDescription,
                "content": content,
                "blogId": blogId,
                "blogName": content + " " + title,
                "createdAt": new Date().toISOString()
            };
            const result = yield postCollection.insertOne(newPost);
            return newPost;
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postCollection
                .updateOne({ id: id }, { $set: { title: title, shortDescription: shortDescription, content: content, blogId: blogId } });
            return result.matchedCount === 1;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    deleteAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postCollection.deleteMany({});
            return true;
        });
    },
};
