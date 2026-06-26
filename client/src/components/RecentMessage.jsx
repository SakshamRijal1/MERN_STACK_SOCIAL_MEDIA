import React, { useEffect, useState } from 'react'
import {  dummyRecentMessagesData } from '../assets/assets'
dummyRecentMessagesData
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";

const RecentMessage = () => {
  const [message, setMessage] = useState([])
dayjs.extend(relativeTime);
  useEffect(()=>{
    const messages=dummyRecentMessagesData;
   setMessage(messages);

  },[])

  return (
    <div className='shadow hadow bg-white dark:bg-gray-900 dark:text-white p-2 rounded-lg'>
      <h1 className='font-semibold'>Recent messages</h1>
      <div className='flex flex-col gap-5 mt-5 justify-center '>
{
message.map((item,index)=>(
  <div className='flex gap-2 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300 rounded-lg p-2 transition-all duration-200 ' key={index}>
<div >
 <img className='w-10 h-10 rounded-full object-cover' src={item.from_user_id.profile_picture
} alt="" />
</div> 
<div className='flex flex-col dark:text-gray-100 w-50 text-slate-950'>
  <h1>{item.from_user_id.full_name}</h1>
  {
    item.message_type=="text" &&<p className={`whitespace-nowrap transition-all duration-200 text-sm text-gray-600  dark:text-gray-400 truncate ${item.seen ?"" :"text-gray-950 font-semibold "}`}  >{item.text}</p>
  }
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


      </div>
    </div>
  )
}

export default RecentMessage
