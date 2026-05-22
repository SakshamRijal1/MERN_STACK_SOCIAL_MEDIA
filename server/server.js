import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDb from "./confings/db.js";
const app=express();
app.use(express.json());//middleware
app.use(cors());
await connectDb()
app.get('/',(req,res)=>{ 
  res.send('server is running good')

})
const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
  console.log("Server is running at ",PORT)
})