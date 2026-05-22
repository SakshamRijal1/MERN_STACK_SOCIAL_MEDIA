import mongoose from "mongoose";
const connectDb=async()=>{
  try{
    mongoose.connection.on("connected",()=>{
      console.log("database connected");
    })
    await mongoose.connect(`${process.env.MONGO_URI}/sakshaMedia`)
  }
  catch(err)
  {
    console.log(err.message)
  }
}
export default connectDb