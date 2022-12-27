import {client} from "./db";
import {ObjectId} from "mongodb";

export type blogTypeOutput = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string
}

export type blogType = {
    _id: string | ObjectId,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string
}

let blogs: Array<blogType> = [
    {
        "_id": "firstblog",
        "name": "name1",
        "description": "description1",
        "websiteUrl": "websiteUrl",
        "createdAt": "2022-12-26T13:28:10.174Z"
    },
    {
        "_id": "2",
        "name": "name2",
        "description": "description2",
        "websiteUrl": "websiteUrl",
        "createdAt": "2022-13-26T13:28:10.174Z"
    },
    {
        "_id": "3",
        "name": "name3",
        "description": "description3",
        "websiteUrl": "websiteUrl",
        "createdAt": "2022-14-26T13:28:10.174Z"
    }
]

const blogCollection = client.db("blogsAndPosts").collection<blogType>("blog")

export const blogsRepository = {

    async getBlogByID(id: string): Promise<blogTypeOutput | null> {
        if(!ObjectId.isValid(id)){
            return null
        }
        let _id = new ObjectId(id)
        const blog: blogType | null = await blogCollection.findOne({_id: _id})
        if (!blog) {
            return null
        }
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt
        }
    },

    async getAllBlogs(): Promise<blogTypeOutput[]> {
        let outBlogs = await blogCollection.find({}).toArray()
        return outBlogs.map((blogs: blogType) => ({
            id: blogs._id.toString(),
            name: blogs.name,
            description: blogs.description,
            websiteUrl: blogs.websiteUrl,
            createdAt: blogs.createdAt
        }))
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<blogTypeOutput> {
        const newBlog: blogType = {
            "_id": new ObjectId(),
            "name": name,
            "description": description,
            "websiteUrl": websiteUrl,
            "createdAt": new Date().toISOString()
        }
        const result = await blogCollection.insertOne(newBlog)
        return {
            id: newBlog._id.toString(),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: newBlog.createdAt
        }
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{
        if (ObjectId.isValid(id)){
            let _id = new ObjectId(id)
            const result = await blogCollection
                .updateOne({_id: _id},{$set: {name: name, description: description, websiteUrl: websiteUrl}})
            return result.matchedCount === 1
        }
        else return false

    },

    async deleteBlog(id: string): Promise<boolean>{
        if (ObjectId.isValid(id)){
            let _id = new ObjectId(id)
            const result = await blogCollection.deleteOne({_id: _id})
            return result.deletedCount === 1
        }
        else return false

    },

    async deleteAllBlogs(): Promise<boolean> {
        const result = await blogCollection
            .deleteMany({})
        return true
    },
}


