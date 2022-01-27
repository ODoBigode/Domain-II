const express = require('express')
const app = express()
const port = process.env.PORT ?? 3007
const { MongoClient, ObjectId } = require('mongodb')
const URL = process.env.MONGO_URL ?? "mongodb://localhost:27017"

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

async function getMongoCollection(dbName, collectionName) {
    const client = await connectToMongo()
    return client.db(dbName).collection(collectionName)
} 

async function readAll() {
    const collection = await getMongoCollection("Final", "users")
    const result = await collection.find().toArray()
    return result
}  

async function FindUserByEmail(email) {
    const collection = await getMongoCollection('ProjectReadingHood', 'users')
    return await collection.findOne({email: email})
    
}

app.use(express.json())

// signup
app.post('/api/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body
    if (!validateEmail(email)) return res.sendStatus(400).json({errMessageMail})

    if (FindUserByEmail(email) || email.length == 0 || password.length == 0) return res.sendStatus(400)

    if (password !== passwordConfirmation) return res.status(400).json({errMessagePass})

    if (password === passwordConfirmation && validateEmail(email)) return res.sendStatus(200)
})
 


// já tem conta faz login
app.post('/api/login', async (req, res) =>{
    const { email, password } = req.body;
    const users = await FindUserByEmail(email)
    const passwordsMatch = users.password == password

    if (!users || !passwordsMatch) {
       return res.sendStatus(400)
    }
    // eventualmente returnar um "_id"
    res.sendStatus(200)
})
// buscar intems ao bau (caso implementado)

// ler historia do inicio (includes choices made require = ('Mongodb' WORKING)) 

// 

app.listen(port, () => console.log(`À escuta em http://localhost:${port}`))