import React, { useEffect, useRef, useState } from 'react'
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
  const dispatch=useDispatch();
 const load = useRef(false)
 const [loading, setLoading] = useState(false)


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
      name:"Connection",
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

   const acceptConnection=async(userId)=>{
  if(load.current) return;
  load.current=true
  setLoading(true)
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
    finally{
     load.current=false
     setLoading(false)
    }
  }
     const cancelConnection=async(userId)=>{
      if(load.current) return
      load.current=true
      setLoading(true)
    try{
const {data}=await api.post('/api/user/cancel',{
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
    finally
    {
load.current=false
setLoading(false)
    }
  }


  return (
   <div className='md:p-10 p-3 w-full   overflow-x-hidden'>
  <h1 className='text-2xl font-bold dark:text-white'>Connections</h1>
  <p className=' text-gray-500 dark:text-gray-400 mt-4'>Manage your network and discover new connections.</p>
<div className='flex gap-4 rounded-lg flex-wrap mt-10 overflow-x-hidden'>
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
   <ConntectionState number={connections.length} parameter={'Connection'}/>
  }
  </div>
  <div className='max-md:w-full  dark:bg-gray-900 dark:text-white w-fit flex max-md:gap-1 max-sm:gap-2  gap-6 mt-5 items-center justify-between  py-2 shadow rounded-lg '>



    {
      list.map((item,index)=>(
<div onClick={()=>{
  setStatus(item.name)
}} key={index} className={`flex flex-wrap gap-1 py-2 px-4 max-sm:px-2 justify-center items-center transition-all text-sm duration-200 cursor-pointer rounded-lg ${status==item.name? ' bg-indigo-600  text-white':"text-gray-500 "}`}>
{item.icon}
  <span>{item.name}</span>
</div>
      ))
    }
    </div>

    <div className='flex gap-5 mt-3 flex-wrap max-md:flex-col max-md:w-full justify-center items-center'>

{
  status=="Followers"&&


  <>
{
  
  followers.map((item,index)=>(
   
<Card key={item._id} item={item}/>


  

  ))}
  {
    followers.length==0 &&<p className='my-5 text-gray-600 text-sm'>No followers found.</p>
  }
    </>


}






{
  status=="Following" &&
  
  <>
  {
  following.map((item,index)=>(
<Card key={item._id} item={item}/>

   

 
  ))}
  {  following.length===0 && <p className='my-5 text-gray-600 text-sm'>No following found.</p>

  }
   </>}



  
 
{
  status=="Connection" &&
  
  
  <>
  {connections.map((item,index)=>(
      
    <Card key={item._id} item={item}/>

 
  ))
}{
   connections.length===0 && <p className='my-5 text-gray-600 text-sm'>No connections found.</p>
}
  </>
  }

{
  status=="Pending" &&
  <>
  {
  pendingConnections.map((item,index)=>(

      <div className='flex flex-col  dark:bg-gray-900 dark:text-white max-w-72 rounded-lg p-4  min-w-60 shadow mt-8  items-center gap-2'>
       <img onClick={()=>{
        navigate(`/profile/${item._id}`)
       }}  className='w-15 h-15 object-cover rounded-full cursor-pointer' src={item.profile_picture} alt="" />
       <div className=' flex items-center flex-col'>
   
      
       <h1 className='font-semibold flex gap-1'>{item.full_name}{item.is_verified && <BadgeCheck className='fill-blue-600 text-white size-4'/>}</h1>
       <p className='text-gray-500 text-center'>@{item.username}</p>
   
    </div>
       <p className=' text-gray-600 text-sm'>{item.bio}</p>
   
   
    
     
   <div className='flex w-full items-center  content-around gap-3 my-1 flex-wrap'>
   
   

   
     <button disabled={loading}   onClick={()=>{
  
      acceptConnection(item._id)
     }}
       className={`group relative cursor-pointer  w-full text-sm py-2 ${loading && 'opacity-50'} bg-green-600 text-white  active:scale-95 transition-all duration-300   rounded-lg`}>
     
   Accept
   
   
     </button>
     
      
     
   
        
    <button disabled={loading}  onClick={()=>{

      cancelConnection(item._id)
    }} 
       className={`group ${loading && 'opacity-50'} cursor-pointer relative  w-full  py-2   bg-slate-500 active:scale-95 transition-all duration-300     text-white shadow  rounded-lg`}>
         
    
   Cancel
   
     </button> 
   
   

   
   
   
   
   
         </div>
      </div>
 
  ))}
  {
 pendingConnections.length===0 && <p className='my-5 text-gray-600 text-sm'>No pending connections found.</p>
  }
  </>} 
  
</div>
</div>
  )}
export default Connections
