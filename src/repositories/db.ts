import {MongoClient} from "mongodb";

const mongoUri = process.env.mongoUri || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoUri);

export async function runDb(){
    try {
        await client.connect()
        await client.db("blog").command({ping: 1});
        console.log("Connected successfully to mongo server")
    }
    catch {
        console.log("Can't connect to db")
        await client.close()
    }
}