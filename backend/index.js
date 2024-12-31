import express from 'express'
import { config } from 'dotenv'
import dbConnect from './dbConnect.js'
import userRoute from './routes/user.routes.js'
config()
const app = express()

app.use(express.json())
app.use('/', userRoute)

app.listen(process.env.PORT, ()=>{
    console.log(`app listening on ${process.env.PORT}`);
})
dbConnect()



