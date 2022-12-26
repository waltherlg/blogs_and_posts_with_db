import {client} from "./db";
import {blogType} from "./blogs-repository";

type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}
let posts: Array<postType> = [
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

]

const postCollection = client.db("blogsAndPosts").collection<blogType>("post")
export const postsRepository = {

    async getPostByID(id: string): Promise<postType | null> {
        const post: any | null = await postCollection.findOne({id: id})
        if (post) {
            return post
        }
        else {
            return null
        }

    },

    async getPostByBlogsID(blogId: string): Promise<postType | null> {
        const post: any | null = await postCollection.findOne({blogId: blogId})
        if (post) {
            return post
        }
        else {
            return null
        }
    },

    async getAllPosts() {
        return await postCollection.find({}).toArray()
    },

    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<postType> {
        const newPost: any = {
            "id": (+(new Date())).toString(),
            "title": title,
            "shortDescription": shortDescription,
            "content": content,
            "blogId": blogId,
            "blogName": content + " " + title,
            "createdAt": new Date().toISOString()
        }
        const result = await postCollection.insertOne(newPost)
        return newPost
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const result = await postCollection
            .updateOne({id: id}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId }})
        return result.matchedCount === 1
    },

    async deletePost(id: string): Promise<boolean> {
        const  result = await postCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },

    async deleteAllPosts(): Promise<boolean> {
        const result = await postCollection.deleteMany({})
        return true
    },
}