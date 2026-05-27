import express from 'express';
import 'dotenv/config' 
import connectDb from './config/db.js';
await connectDb()//node support the top level await

const app=express();
app.use(express.json());
app.get('/',(req,res)=>{
  res.send("Running backend")
})
app.listen(process.env.PORT ||4000,()=>{
  console.log(`Server running at port ${process.env.PORT || 4000}`)
})