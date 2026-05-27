import mongoose from "mongoose";
const UserSchema=new mongoose.Schema(
{
  _id:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true
  },
  full_name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    unique:true


  },
  bio:{
    type:String,
    default:"Hey there!I am using SakshaMedia"
  },
  location:{
    type:String,
    default:"",
  },
  profile_picture:{
    type:String,
    default :""
  },
  cover_photo:{
    type:String,
    default:"",
  },
  followers:[
    {
      type:String,
      ref:"User"
      
    }
  ],
  following:[
    {
      type:String,
      ref:"User"
    }
  ],
  connections:[
    {
      type:String,
      ref:"User"
    }
  ]
  
  





},
{
  timestamps:true,
  minimize:false,//by default minimize is true if it is true mongoose will automatically remove data of empty objects.
}
)
//

const User=mongoose.model('User',UserSchema);
export default User;