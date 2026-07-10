
import User from "../models/User.js";
import fs from 'fs';
import {clerkClient} from '@clerk/express'

import Connection from "../models/Connection.js";
import client from "../config/imageKit.js"
import { inngest } from "../inngest/index.js";

import Post from "../models/Post.js";




export const getUserData=async(req,res)=>{

  try{

    const {userId}=  req.auth();

    const user=await User.findById(userId);

    if(!user)
    {
      return res.json({
        success:false,
        message:"User not found"
      })
    }
    res.json({
    success:true,
    user
    })
  }
  catch(err)
  {
 res.json({
  success:false,
    message:err.message
 })
  }
}


export const getUserProfile=async(req,res)=>{

  try{
const {userId}=req.auth();

const {id}=req.body;

if(userId)
{
  const profile=await User.findById(id).populate('followers following connections')
  const posts=await Post.find({
    user:id,
  }).populate('user likes_count').sort({createdAt:-1});
  res.json({
    success:true,
    message:"Post fetched successfully",
    profile,
    posts
  })
}
  }
  catch(err)
  {
    console.log(err)
    res.json({
      success:false,
      message:err.message
    })
  }
}

export const updateUserData=async(req,res)=>{

  try{
    const {userId}=  req.auth();
    let {username,bio,location,full_name}=req.body;
    const tempUser=await User.findById(userId);
     

        const profile=req.files.profile && req.files.profile[0];
   const cover=req.files.cover && req.files.cover[0];

     const existingUser =await User.findOne({
      username,
     })

    if(!username)
    {
    return res.json({
      success:false,
    message: "Username cannot be empty."
    })

  }
if(existingUser)
{
  if(existingUser.username!=tempUser.username)
  {
    return res.json({
      success:false,
    message: `Username ${username} is not available.`
    })
  }
}
 

  

  const updateData=
  {
    username,
    bio,
    location,
    full_name
  };

   if(profile)
   {
    const buffer=fs.createReadStream(profile.path);//fs is file system module in nodejs
    const response=await  client.files.upload({
      file:buffer,
      fileName:profile.originalname,

    })

  //   const url=client.helper.buildSrc({
  // urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,
  //       src:response.filePath,
  //     transformation:[
  //       {
  //         quatlity:"auto"},
  //         {format:'webp'},
  //         {
  //           width:'512'
  //         }
        
  //     ]
  //   })
    updateData.profile_picture=response.url;
   }
      if(cover)
   {
    const buffer=fs.createReadStream(cover.path);//fs is file system module in nodejs
    const response=await  client.files.upload({
      file:buffer,
      fileName:cover.originalname,

    })

  //   const url=client.helper.buildSrc({
  // urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,
  //       src:response.filePath,
  //     transformation:[
  //       {
  //         quality:"auto"},
  //         {format:'webp'},
  //         {
  //           width:'512'
  //         }
        
  //     ]
  //   })
    updateData.cover_photo=response.url;

   }



// await clerkClient.users.updateUserProfileImage(
//   userId,
//   {
//     file: await fetch(updateData.profile_picture).then(r => r.blob())
//   }
// )
if(profile)
  {
await clerkClient.users.updateUserProfileImage(userId,
  {
    file:await fetch(updateData.profile_picture).then(r=>r.blob())
  }
)
  }




   const user=await User.findByIdAndUpdate(userId,
    updateData,
    {
      new:true,//return upadated user data
    }
   )
   res.json({
    success:true,
    user,
    message:"Profile updated successfully"

   })

}  catch(err)
  {
 res.json({
  success:false,
    message:err.message
 })
  }
}

//Find user using username,email,location,name
export const discoverUsers=async(req,res)=>{
 
  try{
    const {userId}=  req.auth();
const {input}=req.body;

const allUsers=await User.find({
  $or:[
    {
      username:new RegExp(input,"i")//$or means if any of the condition is true then it will return the user,i means case insesnsitive
    },
      {
      full_name:new RegExp(input,"i")
    },    {
      location:new RegExp(input,"i")
    }
  ]
})
const filterUsers=allUsers.filter((user)=>user._id!==userId);
if(filterUsers.length>0
)
{
res.json({
  success:true,
  users:filterUsers,
   message:"Successfully found these poeple."
})
}
res.json({
  success:false,
  message:"Not found."

})
  }
  catch(err)
  {
 res.json({
  success:false,
    message:err.message
 })
  }
}

export const defaultUser=async(req,res)=>{
  try{
    const {userId}=req.auth();
    if(userId)
    {
    
      const users=(await User.find({
        is_verified:true
      })).filter((user)=>user._id!==userId)

      res.json({
        success:true,
        message:"Fetched default user successfully.",
        users
      })

    }
    
  }
  catch(err)
  {
    return res.json({
      success:false,
      message:err.message
    })
  }
}


//follow user 
     export const followUsers=async(req,res)=>{
  try{
    const {userId}=  req.auth();
    const {id}=req.body;
    const user=await User.findById(userId);



    if(user.following.includes(id))
    {
      return res.json({
        success:false,
        message:"Already following the user"
      })
    }

   
    user.following.push(id);
    await user.save();
 
    const toUser=await User.findById(id);
    toUser.followers.push(userId);
    await toUser.save();
    await inngest.send({
      name:"app/follow-request",
      data:{
        user,toUser
      }
    })
    res.json({
      success:true,
      message:"User followed successfully"
    })

}
  catch(err)
  {
 res.json({
  success:false,
    message:err.message
 })
  }
}

// unfollow user
export const unfollowUsers=async(req,res)=>{
  try{
    const {userId}= await req.auth();
    const {id}=req.body;
    const user=await User.findById(userId);
    if(user.following.includes(id))
    {

 user.following=user.following.filter((user=>user!=id));
 await user.save()
     const toUser=await User.findById(id);
 toUser.followers=toUser.followers.filter((user=>user!=userId));
 await toUser.save()
    res.json({
      success:true,
      message:"User unfollowed successfully"
    })

 

    }
       else{
      return res.json({
  success:false,
    message:"Not followed."
 })
}


}
  catch(err)
  {
 res.json({
  success:false,
    message:err.message
 })
  }
}
export const disconnectRequest=async(req,res)=>{
  try{
    const {userId}=req.auth();
    const {id}=req.body;
    const connection=await Connection.findOne(
      {
        $or:[
          {to_user_id:userId,from_user_id:id},
          { from_user_id:userId,to_user_id:id}
        ],
        status:'accepted'
      }
    )
    if(!connection )
    {
      return res.json({
        success:false,
        message:"Connection doesnot exists."
      })
    }
  
    const user=await User.findById(userId)
    const toUser=await User.findById(id);
    if(user && toUser)
    {
   user.connections = user.connections.filter(
      (item) => item.toString() !== toUser._id.toString()
    );

    toUser.connections = toUser.connections.filter(
      (item) => item.toString() !== user._id.toString()
    );

    await user.save();
    await toUser.save();
    await connection.deleteOne();

    return res.json({
      success: true,
      message: "Disconnected successfully.",
    })

    }
    else{
return res.json({
  success:false,
  message:"Something went wrong."
})

    }


  }
  catch(err)
  {
    res.json({
      success:false,
    message:err.message
    })
  }
}

export const handleCancel=async(req,res)=>{
  try{
    const {userId}=req.auth();
    const {id}=req.body;
    const connection=await Connection.findOne({
      $or:[{
        to_user_id:id,from_user_id:userId
      },{
        from_user_id:id,to_user_id:userId
      }]
    })
    if(connection)
    {
      await connection.deleteOne();
    
     return res.json({
        success:true,
        message:"Canceled request"
      })

    }
res.json({
  success:false,
  message:"Something went wrong."
})
  }
  catch(err)
  {
res.json({
  success:false,
  message:err.message
})
  }
}

export const sendConnectionRequest=async(req,res)=>{
  try{

    const {userId}= req.auth();
    const {id}=req.body;
    const last24Hours=new Date(Date.now()-24*60*60*1000);
    const connectionRequests=await Connection.find({
      from_user_id:userId,
       createdAt:{
        $gt:last24Hours
       }
    })
    if(connectionRequests.length>=20)
    {
     return res.json({
      success:false,
        message:"You have reached the limit of sending connection request"
      })
    }
    const connection=await Connection.findOne(
      {
        $or:[
          {
            to_user_id:userId, from_user_id:id
          },
          {
            to_user_id:id, from_user_id:userId
          }
        ]
      }
    )

    if(!connection)
    {
    const connection=await Connection.create({
      from_user_id:userId,
      to_user_id:id,
    })

    await inngest.send({
      name:"app/connection-request",
      data:{
      connectionId:connection._id
      }
    })
     {
      return res.json({
        success:true,
        message:"Send connection request successfully"
      })
    }
    }
    else if(connection && connection.status=="accepted")
    {
      return res.json({
        success:false,
        message:"You both are already connected"
      })
    }
return res.json({
  success:false,
  message:"Connection request pending"
})


  }
  catch(err)
  {
    res.json({
      success:false,
      message:err.message
    })
  }
}

//get user connections
export const getUserConnections=async(req,res)=>{
  try{
const {userId}= req.auth();
const user=await User.findById(userId).populate('connections followers following');
const sentRequest=(await Connection.find({
  from_user_id:userId,
  status:'pending'
}).populate('to_user_id')).map(connection=>connection.to_user_id)
const connections=user.connections;

const followers=user.followers;
const following=user.following;
const pendingConnections=(await Connection.find({
  to_user_id:userId,
  status:'pending'
}).populate('from_user_id')).map(connection=>connection.from_user_id)
console.log(connections,sentRequest,followers,following,pendingConnections)
return res.json({
  success:true,
  connections,
  sentRequest,
  followers,
  following,
  pendingConnections
})
  }
  catch(err)
  {
    res.json({
      success:false,
      message:err.message
    })
  }
}



///accept the connection request
export const acceptConnectionRequest=async(req,res)=>{
  try{
const {userId}=req.auth();
const {id}=req.body;
const connection=await Connection.findOne({
  from_user_id:id,
  to_user_id:userId
})
if(!connection)
{
  
}
if(connection.status=="accepted")
{
return res.json({
    success:false,
    message:"Already accepted friend request"
  })
}
connection.status='accepted';
await connection.save()
 const user=await User.findById(userId);
 user.connections.push(id);
 await user.save()
 const toUser=await User.findById(id);
 toUser.connections.push(userId)
 await toUser.save()
 res.json({
  success:true,
  message:"Connection request accepted successfully."
 })

  }
  catch(err)
  {
    res.json({
      message:err.message,
      success:false,
    })
  }
}

export const getVerified=async(req,res)=>{
  try{
    const {userId}=req.auth();
    const user=await User.findById(userId)
    if(!user)
    {
      return res.json({
        success:false,
        message:"User doesnot exists."
      })

      
    }
    if(user.following.length>=100 && user.email && user.username && user.profile_picture && (Date.now()-new Date(user.createdAt))/(1000*60*60*24)>=30)
    {
   user.is_verified=true;
   await user.save();
   return res.json({ 
    success:true,
    message:"User verified successfully",
   })
    }
    res.json({
      success:false,
      message:"Something went wrong"
    })


  }
  catch(err)
  {
    res.json({
      success:false,
      message:err.message
    })
  }
}