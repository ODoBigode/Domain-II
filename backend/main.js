const express = require('express')
const app = express()
const port = process.env.PORT ?? 3007
const { MongoClient, ObjectId } = require('mongodb')
const URL = process.env.MONGO_URL ?? "mongodb://localhost:27017"

let client

function validateEmail(email) {
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return EMAIL_REGEX.test(email)
}

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

async function getMongoCollection(dbName, collectionName) {
    const client = await connectToMongo()
    return client.db(dbName).collection(collectionName)
} 

async function readAll() {
    const collection = await getMongoCollection("Bootcamp", "Desafio8")
    const result = await collection.find().toArray()
    return result
}  


app.use(express.json())

// signup
app.post('/signup', (req, res) => {
    const answer = {
        errMessage: 'Os dados introduzidos não são válidos.'
    }

    if (validateEmail(email))
})

// login
app.post('/login', (req, res) =>{
    const { username, password } = req.body;
    const users = await readAll()
    const userIsAvailable = !users.some(u => u.username == username)
    const passwordsMatch = users.some(u => u.password == password)

    if (!userIsAvailable) {
        res.status(400),json( )
    }
})
// usar intems

// ler historia do inicio (includes choices made)

// 