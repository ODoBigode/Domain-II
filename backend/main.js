const express = require('express')
const app = express()
const port = process.env.PORT ?? 3007
const { MongoClient, ObjectId } = require('mongodb')
const URL = process.env.MONGO_URL ?? "mongodb://localhost:27017"


let client
async function createSession(){

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
    const collection = await getMongoCollection('ProjectReadingHood', 'users')
    return await collection.findOne({email: email})
    
}

function validateEmail(email) {
  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return EMAIL_REGEX.test(email)
}

function validatePassword(password){
  if(password.length < 8) return false
    const regexes= [
      /[a-z]/g,
      /[A-Z]/g,
      /[0-9]/g,
      /[~!@#$%^&*)(+=._-]/g,
    ]
    
    let score= 0
    const testes = []
      for(const teste of regexes){  
        testes.push(teste.test(password))
      }
      for(const result of testes){
      score = result ? score + 1 : score
      }
    return score > 3
}

function validateConfirmation(passwordConfirmation, password) {
        return passwordConfirmation === password 
}

async function insertUserMongo(user) {
    const collection = await getMongoCollection('ProjectReadingHood', 'users')
    const result = await collection.insertOne(user)
    return  // result.insertedUser
}



app.use(express.json())



// signup
app.post('/api/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body

    console.log("validateEmail", email, password, passwordConfirmation)
    if (!validateEmail(email) || !validatePassword(password) || !validateConfirmation(passwordConfirmation, password)){
        console.log('validações falharam')
        return res.sendStatus(400)
    }

    if ((await FindUserByEmail(email)) || email.length == 0 || password.length == 0) {
        console.log('utilzador já existe')
        return res.sendStatus(400)
    }

    if (password !== passwordConfirmation) return res.status(400).json({errMessagePass})

    if (password === passwordConfirmation && validateEmail(email)) {
        insertUserMongo({email, password})

        return res.status(200).json({Menssagem: 'User stored'})

    }
})
 
// app.get('api/login')
app.get('/api/login', async (req, res) => {

})

// já tem conta faz login
app.post('/api/login', async (req, res) =>{
    const { email, password } = req.body;
    console.log('trying')
    //if (!validateEmail(email) || !validatePassword(password)) return res.sendStatus(400)
    console.log('trying to get user')
    const user = await FindUserByEmail(email)
    console.log(user)

    if(!user) return res.sendStatus(400)

    const passwordsMatch = user.password == password

    

    if (!user || !passwordsMatch) {
       return res.sendStatus(400)
    }
    // eventualmente returnar um "_id"
    const token = createSession()
    res.status(200).json({token: user._id})
})
// the game

app.get('/api/game', require('./sendStoryFrontend'), (req, res) => {
  console.log(req.body)
})



// ler historia do inicio (includes choices made require = ('Mongodb' WORKING)) 

// 

app.listen(port, () => console.log(`À escuta em http://localhost:${port}`))