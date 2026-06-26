import { BadgeCheck, Check, Loader, MapPin, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../api/axois'
import { useAuth } from '@clerk/react'
import { fetchConnection } from '../features/connections/connectionSlice'
import { fetchUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router'



const Card = ({item,discover="",setDiscover}) => {
  const {getToken}=useAuth()
  const dispatch=useDispatch();
  const [loadFollow, setLoadFollow] = useState(false)
  const [loadConnection, setLoadConnection] = useState(false)
const navigate=useNavigate()
  
  const user=useSelector((state)=>state.user.value)
  const {connections,followers,following,pendingConnections,sentRequest}=useSelector((state)=>state.connections)


  const handleDisconnect=async(id)=>{
if(loadConnection)
{
  return
}
setLoadConnection(true)
     const token=await getToken()
    try{
      const {data}=await api.post('/api/user/disconnect',{
        id
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(data.success)
   {
      toast.success(data.message)
dispatch(fetchUser(token))
  dispatch(fetchConnection(token))


   }
   else{
    toast.error(data.message)
dispatch(fetchUser(token))
  dispatch(fetchConnection(token))
   }
    }
    catch(err)
    {
      toast.error(err.message)
   

    }
    finally{
           setLoadConnection(false)
    }
  }
  
  const connectionRequest=async(id)=>{
if(loadConnection) return;
    const token=await getToken()
  setLoadConnection(true)
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
dispatch(fetchUser(token))
  dispatch(fetchConnection(token))
   }
    
    }
    catch(err)
    {
  toast.error(err.message)
    }
    finally{
 setLoadConnection(false)
    }
  }
   const handleAccept=async(id)=>{
if(loadConnection) return
setLoadConnection(true)
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
    finally{
        setLoadConnection(false)
    }
  }
  
const handleFollow=async(item)=>{
if(loadFollow) return
  const token=await getToken()
setLoadFollow(true)
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
  finally{
      setLoadFollow(false)
  }
}
const handleUnFollow=async(item)=>{
  if(loadFollow) return;
     setLoadFollow(true)
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
  finally{
      setLoadFollow(false)
  }
}
  return (
    

   <div className='flex flex-col max-w-72 rounded-lg p-4  min-w-60 shadow mt-8   items-center gap-4'>

       <img  onClick={()=>{
        navigate(`/profile/${item._id}`)
       }} className='w-15 cursor-pointer h-15 object-cover rounded-full' src={item.profile_picture} alt="" />
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
       
     
   <div className='flex w-full items-center  content-around gap-3'>
   
   
   {
   user.following.includes(item._id) ?
   
    <button disabled={
   loadFollow
     }   onClick={()=>{
      setLoadFollow(true)
       handleUnFollow(item)
     }}
       className={`group  relative text-sm  w-full  py-2 active:scale-95 ${loadFollow ? "cursor-not-allowed":'cursor-pointer'}     bg-slate-500  text-white active:scale-95 transition-all duration-300   shadow cursor-pointer  rounded-lg`}>
         
     Unfollow
   
   
     </button> :
   
     <button disabled={loadFollow} onClick={()=>{
  
       handleFollow(item)
     
     }}
       className={`group relative   w-full text-sm ${loadFollow ? "cursor-not-allowed":'cursor-pointer'} active:scale-95 transition-all duration-300    py-2 bg-indigo-600 text-white  rounded-lg`}>
     
   
     Follow
   
   
     </button>
     
      
     
   
     
   
   }
   <div className='w-20 h-10 border-none cursor-pointer shadow  transition-all duration-150  rounded-lg flex  justify-center items-center relative group '>
   
   
     {
    ! (connections.some((connection)=>connection.to_user_id==item._id || connection.from_user_id==item._id)) &&!(sentRequest.some((reqUser)=>reqUser._id===item._id)) && !(pendingConnections.some((reqUser)=>reqUser._id===item._id)) && !(connections.some((reqUser)=>reqUser._id==item._id)) &&
    <>
    <button disabled={
     loadConnection
     }  className={`cursor-pointer ${loadConnection ? "cursor-not-allowed":'cursor-pointer'}  w-full h-full flex justify-center items-center active:scale-95 transition-all duration-300   `} onClick={()=>{

     connectionRequest(item._id)
    }}>
      <Plus className=''/>
    </button>
           <div className='absolute group-hover:flex hidden bg-gray-700 w-30 text-center top-12 duration-1000 transition-all text-white rounded-lg px-2 py-1'>Send Request</div>
    </>
   
     }
      {
     
     sentRequest.some((reqUser)=>reqUser._id===item._id) &&
    <>
    <button  className=' relative w-full cursor-pointer   flex justify-center active:scale-95 transition-all duration-300  group ' onClick={()=>{
   
    }}>
    <Loader  className='animate-spin '/>

    </button>
       <div className='absolute group-hover:flex hidden bg-gray-700 top-12 w-35
        text-center duration-1000 transition-all text-white rounded-lg px-2 py-1'>
    Pending Request
   </div>
    </>
   
     }
      {
   connections.some((reqUser)=>reqUser._id==item._id) &&
    <>
    <button  className=' relative w-full cursor-pointer flex h-full items-center rounded-lg justify-center active:scale-95 transition-all group duration-300 bg-green-600 ' onClick={()=>{
   
    }}>
    <Check  className='text-white font-bold'/>
   
    </button>
        <div className='absolute group-hover:flex hidden bg-gray-700 text-center top-12 duration-1000 transition-all text-white rounded-lg px-2 py-1 z-100'>
Connected
   </div>
    </>
   
     }
     {
   pendingConnections.some((reqUser)=>reqUser._id==item._id) &&
    <>
    <button disabled={
      loadConnection
     }   className={`group relative w-full cursor-pointer  ${loadConnection ? "cursor-not-allowed":'cursor-pointer'} flex h-full items-center  active:scale-95 transition-all duration-300  text-center justify-center rounded-lg bg-green-600 text-sm truncate text-white`} onClick={()=>{
      setLoadConnection(true)
   handleAccept(item._id
   )
    }}>
   Accept
   
    </button>
           <div className='absolute group-hover:flex hidden bg-gray-700 top-12 w-35 duration-1000 transition-all text-white rounded-lg px-2 py-1'>
   Accept Request
   </div>
    </>
     }
   </div>
   
   
   
   
   
   
         </div>
         {
   connections.some((reqUser)=>reqUser._id==item._id) &&
    <>
    <button disabled={
      loadConnection
     }    className={` relative w-full cursor-pointer flex py-1.5 px-2  ${loadConnection ? "cursor-not-allowed":'cursor-pointer'} items-center rounded-lg justify-center  bg-red-600 active:scale-95  transition-all duration-300 text-white `} onClick={()=>{
   handleDisconnect(item._id)
    }}>
Disconnect
   
    </button>
     
    </>
   
     }
       {
    following.some((uFollowing)=>uFollowing._id==item._id) &&  followers.some((uFollowers)=>uFollowers._id==item._id) && <p className='text-gray-500 text-sm'>You both followed eachother.</p>
  }
      </div>
   
       
    )
}

export default Card
