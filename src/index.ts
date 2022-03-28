import express from 'express'
import connection from './connection' 
import api from './routes'
const app = express()

app.use(express.json())

connection

app.use(api);

app.listen(4000, () => {
    console.log("server running")
})
