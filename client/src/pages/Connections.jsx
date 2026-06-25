import React, { useEffect, useState } from 'react'
import ConntectionState from '../components/ConntectionState'

import { AwardIcon, BadgeCheck, Clock, Eye, Handshake, MapPin, MapPinIcon, Network, Plus, User, UserCheck } from 'lucide-react'
import Shimmer from '../components/Shimmer'
import { useDispatch, useSelector } from 'react-redux'
import { useFormStatus } from 'react-dom'
import { useAuth } from '@clerk/react'
import { fetchConnection } from '../features/connections/connectionSlice'
import api from '../api/axois'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { fetchUser } from '../features/user/userSlice'
import Card from '../components/Card'

const Connections = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch()
const user=useSelector(state=>state.user.value)
 const {connections,pendingConnections,followers,following}=useSelector((state)=>state.connections)

  const list=[
    {
      name:"Followers",
      icon:<User/>
    },
    {
      name:"Following",
      icon:<UserCheck/>
    },
    {
      name:"Pending",
      icon:<Clock/>
    },
    {
      name:"Connections",
      icon:<Handshake/>
    }
  ]
  
   const [status, setStatus] = useState(list[0].name)
  const {getToken}=useAuth();
   useEffect(()=>{
  const fetch=async()=>{
  dispatch(fetchConnection(await getToken()))
  }

 },[])
  useEffect(()=>{
getToken().then((token)=>{

  dispatch(fetchConnection(token))
})
  },[])
  const handleUnfollow=async(item)=>{
    try{
const {data}=await api.post('/api/user/unfollow',{
  id:item._id
},{
  headers:{
    Authorization:`Bearer ${await getToken()}`
  }
})
if(data.success)
{
  toast.success(data.message)
  dispatch(fetchConnection(await getToken()))
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
   const acceptConnection=async(userId)=>{
    try{
const {data}=await api.post('/api/user/accept',{
  id:userId
},{
  headers:{
    Authorization:`Bearer ${await getToken()}`
  }
})
if(data.success)
{
  toast.success(data.message)
  dispatch(fetchConnection(await getToken()))
  dispatch(fetchUser(await getToken()))
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
   <div className='md:p-10 p-3 w-full overflow-x-hidden'>
  <h1 className='text-2xl font-bold'>Connections</h1>
  <p className=' text-gray-500 mt-4'>Manage your network and discover new connections.</p>
<div className='flex gap-4  flex-wrap mt-10 overflow-x-hidden'>
  {
   <ConntectionState  number={followers.length} parameter={'Followers'}/>
  }
    {
   <ConntectionState number={following.length} parameter={'Following'}/>
  }
      {
   <ConntectionState number={pendingConnections.length} parameter={'Pending'}/>
  }
    {
   <ConntectionState number={connections.length} parameter={'Connections'}/>
  }
  </div>
  <div className='max-md:w-full  w-fit flex max-md:gap-3  gap-6 mt-5 items-center justify-between shadow max-md:p-2 p-3 shadow-gray-400 rounded-lg '>



    {
      list.map((item,index)=>(
<div onClick={()=>{
  setStatus(item.name)
}} key={index} className={`flex flex-wrap gap-1 justify-center items-center transition-all text-sm duration-200 cursor-pointer ${status==item.name? 'border-b-2 border-b-indigo-600 text-indigo-600':"text-gray-500 "}`}>
{item.icon}
  <span>{item.name}</span>
</div>
      ))
    }
    </div>

    <div className='flex gap-5 mt-3 flex-wrap max-md:flex-col max-md:w-full'>

{
  status=="Followers"&& followers.map((item,index)=>(
  
<Card key={item._id} item={item}/>
  ))
}






{
  status=="Following" && following.map((item,index)=>(
<Card key={item._id} item={item}/>

    

 
  ))}



  
 
{
  status=="Connections" && connections.map((item,index)=>(
      
    <Card key={item._id} item={item}/>

 
  ))}

{
  status=="Pending" && pendingConnections.map((item,index)=>(
      
    <Card key={item._id} item={item}/>

 
  ))}
</div>
</div>
  )}
export default Connections
