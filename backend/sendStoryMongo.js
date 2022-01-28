const { MongoClient, ObjectId } = require('mongodb')
const URL = process.env.MONGO_URL ?? "mongodb://localhost:27017"
import  story  from "story.js";

let client
async function connectToMongo() {
    try {
      if (!client) {
        client = await MongoClient.connect(URL)
      }
      return client;
    } catch (err) {
      console.log(err)
    }
}

async function getMongoCollection() {
    const client = await connectToMongo()
    return client.db('ProjectReadingHood').collection('Story')
}

async function createStory() { 
    const collection = await getMongoCollection()
    return collection.insertMany(story)
}
createStory().then(() => console.log('done'))