const express = require('express')
const app = express()
const port = process.env.PORT ?? 3000

const story = [
    {
        id: 1,
        text: 'parte 1'
    },
    {
        id: 2,
        text: 'parte 2' 
    },
    {
        id: 3,
        text: 'parte 3'
    }

]