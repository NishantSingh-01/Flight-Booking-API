import app from '../src/app.js'
import dotenv from "dotenv"
import connectdb from './db/db.js'
dotenv.config({
    path: './.env'
})

connectdb()

app.listen(process.env.PORT ||4000, () => {
    console.log(`Server is ready at ${process.env.PORT}`)
})

app.get('/api/v1', (_, res) => {
    res.send(`<h1 style="color: blue; text-align: center;">Welcome to the API <span style="color: red;">Health-Up App</span></h1>`)
})