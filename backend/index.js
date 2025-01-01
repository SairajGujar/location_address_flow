import express from 'express'
import { config } from 'dotenv'
import dbConnect from './dbConnect.js'
import userRoute from './routes/user.routes.js'
import { authMiddleware } from './middleware/auth.middleware.js'
import addressRoute from './routes/address.routes.js'
import cors from 'cors'
config()
const app = express()

app.use(express.json())
app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
  
app.use('/api/user', userRoute)
app.use('/api/address', authMiddleware, addressRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`app listening on ${process.env.PORT}`);
})
dbConnect()



