import { BadgeCheck, Check, Loader, MapPin, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../api/axois'
import { useAuth } from '@clerk/react'
import { fetchConnection } from '../features/connections/connectionSlice'
import { fetchUser } from '../features/user/userSlice'



const Card = ({item,discover="",setDiscover}) => {
  const {getToken}=useAuth()
  const dispatch=useDispatch()

  
  const user=useSelector((state)=>state.user.value)
  const {connections,followers,following,pendingConnections,sentRequest}=useSelector((state)=>state.connections)
  
  const connectionRequest=async(id)=>{
    const token=await getToken()
    try{
   const {data}=await api.post('/api/user/connect',
    {
      id
    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
   );
   if(data.success)
   {
    toast.success(data.message)
  dispatch(fetchConnection(token))
  dispatch(fetchUser(token))

   }
   else{
    toast.error(data.message)

   }
    
    }
    catch(err)
    {
  toast.error(err.message)
    }
  }
   const handleAccept=async(id)=>{
    const token=await getToken()
    try{
   const {data}=await api.post('/api/user/accept',
    {
      id
    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
   );
   if(data.success)
   {
      toast.success(data.message)
dispatch(fetchUser(token))
  dispatch(fetchConnection(token))


   }
   else{
    toast.error(data.message)

   }
    
    }
    catch(err)
    {
  toast.error(err.message)
    }
  }
  
const handleFollow=async(item)=>{

  const token=await getToken()
  try{
    const {data}=await api.post('/api/user/follow',
      {
        id:item._id,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    console.log(data)

    if(data.success)
    {
          dispatch(fetchUser(token))
               dispatch(fetchConnection(token))
      // setFollowing((prev)=>{
      //   return [item._id,...prev]
      // })
    
discover && setDiscover && setDiscover(prev=> prev.map((discoverUser)=>{
          if(discoverUser._id==item._id)
          {
        return {
          ...discoverUser,
          followers:[...discoverUser.followers,user._id]
        }
          }
          return discoverUser
        }))
  
  
      toast.success(`Following ${item.full_name} successfully.`)
    }
    else{
      toast(data.message)
    }
  }
  catch(err)
  {
toast.error(err.message)
  }
}
const handleUnFollow=async(item)=>{
  const token=await getToken()

  try{
    const {data}=await api.post('/api/user/unfollow',
      {
        id:item._id,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    if(data.success)
    {
      
  //     setFollowing((prev)=>{
  //  return prev.filter(user=>user!==item._id)
  //     })
       discover && setDiscover &&  setDiscover(prev=>prev.map((discoverUser)=>{
          if(discoverUser._id==item._id)
          {
          return{
            ...discoverUser,
            followers:discoverUser.followers.filter((dUser)=>dUser!==user._id)
          }
          }
          return discoverUser
        }))

          dispatch(fetchUser(token))
          dispatch(fetchConnection(token))
  
  
      toast.success(`Unfollowed ${item.full_name} successfully.`)
    }
    else{
      toast(data.message)
    }

  }
  catch(err)
  {
toast.error(err.message)
  }
}
  return (
    

   <div className='flex flex-col max-w-72 rounded-lg p-4  min-w-60 shadow mt-8  items-center gap-4'>
       <img  className='w-15 h-15 object-cover rounded-full' src={item.profile_picture} alt="" />
       <div>
   
      
       <h1 className='font-semibold flex gap-1'>{item.full_name}{item.is_verified && <BadgeCheck className='fill-blue-600 text-white'/>}</h1>
       <p className='text-gray-500 text-center'>@{item.username}</p>
   
    </div>
       <p className=' text-gray-600 text-sm'>{item.bio}</p>
   
   
    { discover && setDiscover &&
      <div className='flex gap-2 justify-center items-center'>
       {item.location &&
   
        <button className='rounded-2xl justify-center items-center text-sm gap-2  border-gray-300 border py-0.5 flex  text-gray-600  px-4 shadow'><MapPin className='w-5 h-5'/>{item.location}</button>}
          <button  className='rounded-2xl text-sm  px-4 py-0.5 justify-center shadow text-gray-600 border-gray-300  border flex'>{item.followers.length} Followers</button>
       </div>}
       
     
   <div className='flex w-full items-center  content-around gap-3 my-1'>
   
   
   {
   user.following.includes(item._id) ?
   
    <button  onClick={()=>{
       handleUnFollow(item)
     }}
       className={`group cursor-pointer relative  w-full  py-2   bg-slate-500  text-white shadow font-bold rounded-lg`}>
         
     Unfollow
   
   
     </button> :
   
     <button  onClick={()=>{
       handleFollow(item)
     }}
       className={`group relative cursor-pointer  w-full text-sm py-2 bg-indigo-600 text-white font-bold rounded-lg`}>
     
   
     Follow
   
   
     </button>
     
      
     
   
     
   
   }
   <div className='w-20 h-10 border-none cursor-pointer shadow  transition-all duration-150  rounded-lg flex  justify-center items-center'>
   
   
     {
    ! (connections.some((connection)=>connection.to_user_id==item._id || connection.from_user_id==item._id)) &&!(sentRequest.some((reqUser)=>reqUser._id===item._id)) && !(pendingConnections.some((reqUser)=>reqUser._id===item._id)) && !(connections.some((reqUser)=>reqUser._id==item._id)) &&
    <>
    <button className='cursor-pointer' onClick={()=>{
     connectionRequest(item._id)
    }}>
      <Plus className=''/>
    </button>
      
    </>
   
     }
      {
     
     sentRequest.some((reqUser)=>reqUser._id===item._id) &&
    <>
    <button  className='group relative w-full cursor-pointer  flex justify-center transition-all duration-700' onClick={()=>{
   
    }}>
    <Loader  className='animate-spin '/>
   
    </button>
     
    </>
   
     }
      {
   connections.some((reqUser)=>reqUser._id==item._id) &&
    <>
    <button  className='group relative w-full cursor-pointer flex h-full items-center rounded-lg justify-center transition-all duration-700 bg-green-600 ' onClick={()=>{
   
    }}>
    <Check  className='text-white font-bold'/>
   
    </button>
     
    </>
   
     }
     {
   pendingConnections.some((reqUser)=>reqUser._id==item._id) &&
    <>
    <button   className='group relative w-full cursor-pointer flex h-full items-center rounded-lg justify-center transition-all cursor-pointer duration-700 bg-green-600 text-sm truncate text-white' onClick={()=>{
   handleAccept(item._id
   )
    }}>
   Accept
   
    </button>
     
    </>
     }
   </div>
   
   
   
   
   
         </div>
      </div>
   
       
    )
}

export default Card
