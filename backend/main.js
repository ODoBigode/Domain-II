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
    const collection = await getMongoCollection("Final", "users")
    const result = await collection.find().toArray()
    return result
}  

async function FindUserByEmail(email) {
    const collection = await getMongoCollection('Final', 'users')
    return await collection.findOne({email: email})
    
}

app.use(express.json())

// signup
app.post('/api/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body
    
    const answer = {
        errMessageMail: 'O email introduzido não é valido.',
        errMessagePass: 'As password não coincidem.'
    }
    if (!validateEmail(email)) return res.sendStatus(400).json({errMessageMail})

    if (FindUserByEmail(email)) return res.sendStatus(400)

    if (password !== passwordConfirmation) return res.status(400).json({errMessagePass})

    if (password === passwordConfirmation && validateEmail(email)) return res.sendStatus(200)
})

// signup correu bem, insere o username 
app.post('/api/signup/username', async (req,res) => {
    const { username } = req.body
})

// já tem conta faz login
app.post('/api/login', async (req, res) =>{
    const { username, password } = req.body;
    const users = await FindUserByEmail(email)
    const passwordsMatch = users.password == password

    if (!users || !passwordsMatch) {
       return res.sendStatus(400)
    }
    // eventualmente returnar um "_id"
    res.sendStatus(200)
})
// usar intems

// ler historia do inicio (includes choices made require = ('Mongodb' WORKING)) 

// 

app.listen(port, () => console.log(`À escuta em http://localhost:${port}`))
