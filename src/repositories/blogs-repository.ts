import {client} from "./db";

export type blogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

let blogs: Array<blogType> = [
    {
        "id": "firstblog",
        "name": "name1",
        "description": "description1",
        "websiteUrl": "websiteUrl"
    },
    {
        "id": "2",
        "name": "name2",
        "description": "description2",
        "websiteUrl": "websiteUrl"
    },
    {
        "id": "3",
        "name": "name3",
        "description": "description3",
        "websiteUrl": "websiteUrl"
    }
]

export const blogsRepository = {
    async getBlogByID(id: string): Promise<blogType | null> {
        const blog: any | null = await client.db("blogsAndPosts").collection<blogType>("blog").findOne({id: id})
        if (blog){
            return blog
        }
        else {
            return null
        }
    },

    async getAllBlogs(): Promise<blogType[]> {
        return await client.db("blogsAndPosts").collection<blogType>("blog").find({}).toArray()
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<blogType> {
        const newBlog: blogType = {
            "id": (+(new Date())).toString(),
            "name": name,
            "description": description,
            "websiteUrl": websiteUrl
        }
        const result = await client.db("blogsAndPosts").collection<blogType>("blog").insertOne(newBlog)
        return newBlog
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{
        const result = await client.db("blogsAndPosts").collection<blogType>("blog")
            .updateOne({id: id},{$set: {name: name, description: description, websiteUrl: websiteUrl}})
        return result.matchedCount === 1
    },

    async deleteBlog(id: string): Promise<boolean>{
        const result = await client.db("blogsAndPosts").collection<blogType>("blog")
            .deleteOne({id: id})
        return result.deletedCount === 1
    },

    async deleteAllBlogs(): Promise<boolean> {
        const result = await client.db("blogsAndPosts").collection<blogType>("blog")
            .deleteMany({})
        return true
    },
}


