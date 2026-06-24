import mongoose from "mongoose";
const connectDB=async()=>{
  try{
mongoose.connection.on("connected",()=>{
  console.log("Connected to database")
   console.log("Database name:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
})

    await mongoose.connect(process.env.MONGO_URI)

  }
  catch(err)
  {
    console.log(err.message)
  }
}
export default connectDB;