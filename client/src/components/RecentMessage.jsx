import React, { useEffect, useState } from 'react'
import {  dummyRecentMessagesData } from '../assets/assets'
dummyRecentMessagesData
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import api from '../api/axois';
import { getToken, useAuth, useUser } from '@clerk/react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const RecentMessage = () => {
  const {getToken}=useAuth()
  const [message, setMessage] = useState([])
  const user=useUser()
  const navigate=useNavigate()
dayjs.extend(relativeTime);

  useEffect(()=>{
const fetch=async()=>{
  try{
    const {data}=await api.get('/api/user/recent-messages',
      {
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      }
    )


    if(data.success)
    {
      const groupMessages=data.messages.reduce((acc,message)=>{
        const senderId=message.from_user_id._id;
        if(!acc[senderId]||new Date(message.createdAt)>new Date(acc[senderId].createdAt))
        {
          acc[senderId]=message;
        }
        return acc;
      },{})
      //sort
      const sortedMessages=Object.values(groupMessages).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
      
      setMessage(sortedMessages)
     

    }
    else{
return
    }

  }

  catch(err)
  {
return
  }
}

  fetch();
  const interval=setInterval(fetch,30000)
  return ()=>{
    clearInterval(interval)
  }



  },[user])

  return (
    <div  className='shadow hadow bg-white dark:bg-gray-900 dark:text-white p-2 rounded-lg  '>
      <h1 className='font-semibold'>Recent messages</h1>
      <div className='flex flex-col gap-5 mt-5 justify-center '>
{
message.map((item,index)=>(
  <div onClick={()=>{
    navigate(`/messages/${item.from_user_id._id}`)
  }} key={item._id} className='flex gap-2 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300 rounded-lg p-2 transition-all duration-200 ' key={index}>
<div >
 <img className='w-10 h-10 rounded-full object-cover' src={item.from_user_id.profile_picture
} alt="" />
</div> 
<div className='flex flex-col dark:text-gray-100 w-50 text-slate-950'>
  <h1>{item.from_user_id.full_name}</h1>
  
<p className={`whitespace-nowrap transition-all duration-200 text-sm text-gray-600  dark:text-gray-400 truncate ${item.seen ?"" :" text-gray-950 font-semibold "}`}  >{item.message_type=="text"? item.text :'Media'}</p>
  
</div>
 
<div className='flex flex-col items-center gap-2'>
<p className='text-sm truncate text-gray-500 '>{dayjs(item.updatedAt).fromNow()}</p>
{
  !item.seen && <div className='w-5 flex justify-center items-center h-5 rounded-full bg-indigo-600 text-white'>1</div>
}
</div>
 </div>
))
}
{
  message?.length==0 && <p className='text-center text-gray-500  text-sm'>No recent message found!</p>
}


      </div>
    </div>
  )
}

export default RecentMessage
