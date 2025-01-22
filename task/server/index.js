import express,{json} from 'express'
import { Routes } from './Routes/routes.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express()

app.use(json())
app.use('/',Routes)
 const port=process.env.PORT

 app.listen(port,(req,res)=>{
    console.log(`server listenning to ${port}port `)
 })