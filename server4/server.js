import express from "express";
import connectDb from "./config/db.js";
import 'dotenv/config'
await connectDb();
const app=express()
app.use(express.json());
app.get('/',(req,res)=>{
  res.send("Running backend");
})

app.listen(process.env.PORT || 4000,()=>{
  console.log(`Server started at port ${process.env.PORT || 4000}`)
})  
