import dotenv  from "dotenv/config"
import express from 'express'
import connection from './connectionDB/mongo.db' 
import api from './routes/user.routes'
const app = express()
dotenv

app.use(express.json())
connection

const port = process.env.PORT;

app.use(api);

app.listen(port, () => {
    console.log("server running")
})
