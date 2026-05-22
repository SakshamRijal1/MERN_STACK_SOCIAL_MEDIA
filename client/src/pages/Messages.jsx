import React from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { BadgeCheck, ChartArea, Eye, MessageCircle, MessageCircleCheck, MessageCircleDashed, MessageCircleHeart, MessageCircleMoreIcon, MessageCircleOff, MessageCircleQuestion, MessageCircleReply, MessageCircleX } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'

const Messages = () => {
  const navigate=useNavigate()

  return (
    <div className='md:p-10 p-3 w-full overflow-x-hidden'>
  <h1 className='text-2xl font-bold'>Messages</h1>
  <p className=' text-gray-500 mt-4'>Talk to your friends and family</p>


  <div className='flex flex-wrap items-center gap-4 w-full mt-10 shadow rounded-lg md:p-3'>
   

    {
      dummyConnectionsData.map((item,index)=>(
        <div className='flex gap-4  max-md:w-full shadow p-5 sm:justify-between' key={index}>
      
    <div className=''>
      <img className='w-15 h-15 rounded-full' src={item.profile_picture} alt="" />
    
    </div>
    <div className='w-40 sm:w-50'>
      <h1 className='font-semibold flex gap-1'>{item.full_name}{item.is_verified && <BadgeCheck className='fill-blue-600 text-white'/>}</h1>
      <p className='text-gray-500 '>@{item.username}</p>
      <p className='truncate  text-gray-600 text-sm '>{item.bio}</p>
    </div>
    <div className='flex flex-col gap-5 ' >
      <button onClick={()=>{
        navigate(`/messages/${item._id}`)
      }} className='w-10 cursor-pointer hover:bg-gray-300 transition-all duration-200 h-10 flex justify-center items-center rounded-lg shadow '><MessageCircle/></button>
      <button className='w-10 cursor-pointer hover:bg-gray-300 transition-all duration-200 h-10 flex justify-center items-center rounded-lg shadow'><Eye/></button>
      
    </div>
        </div>
      ))
    }
  </div>
    </div>
  )





}

export default Messages
