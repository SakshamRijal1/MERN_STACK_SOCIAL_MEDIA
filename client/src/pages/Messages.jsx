import React from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { BadgeCheck, ChartArea, Eye, MessageCircle, MessageCircleCheck, MessageCircleDashed, MessageCircleHeart, MessageCircleMoreIcon, MessageCircleOff, MessageCircleQuestion, MessageCircleReply, MessageCircleWarning, MessageCircleX } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'

const Messages = () => {
  const navigate=useNavigate();
  const {connections}=useSelector((state)=>state.connections)

  return (
    <div className='md:p-10 p-3 w-full overflow-x-hidden'>
  <h1 className='text-2xl font-bold'>Messages</h1>
  <p className=' text-gray-500 mt-4'>Talk to your friends and family</p>


  <div className='flex flex-wrap items-center gap-4 w-full mt-10 shadow rounded-lg md:p-3 justify-center'>
   
{
  connections.length === 0 && (
    <div className="flex flex-col items-center justify-center w-full py-20 text-center">
      <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
        <MessageCircleX className="w-12 h-12 text-indigo-600" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-gray-800">
        No conversations yet
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        You don't have any connections to chat with. Search for people,
        send connection requests, and once they're accepted, you can start
        messaging instantly.
      </p>

      <button
        onClick={() => navigate("/discover")}
        className="mt-6 px-6 py-3 rounded-lg bg-indigo-600 cursor-pointer text-white hover:bg-indigo-700 transition"
      >
        Discover People
      </button>
    </div>
  )
}
  
    {
      connections.map((item,index)=>(
        
              <div className='flex flex-col max-w-72 rounded-lg p-4  min-w-60 shadow mt-8  items-center gap-4'>
               <img onClick={()=>{
                navigate(`/profile/${item._id}`)
               }}  className='w-15 h-15 object-cover rounded-full cursor-pointer' src={item.profile_picture} alt="" />
               <div>
           
              
               <h1 className='font-semibold flex gap-1'>{item.full_name}{item.is_verified && <BadgeCheck className='fill-blue-600 text-white'/>}</h1>
               <p className='text-gray-500 text-center'>@{item.username}</p>
           
            </div>
               <p className=' text-gray-600 text-sm'>{item.bio}</p>
           
           
            
             
           <div className='flex w-full items-center  content-around gap-3 my-1 flex-wrap'>
           
           
        
           
             <button   onClick={()=>{
             navigate(`${item._id}`)
        
             }}
               className={`group relative cursor-pointer  flex justify-center items-center active:scale-95 transition-all duration-300   gap-2  w-full text-sm py-2 $ bg-green-600 text-white  rounded-lg`}>
               <MessageCircle/>
           Message
         
           
             </button>
             
              
             
           
                
            <button  onClick={()=>{
        
        navigate(`/profile/${item._id}`)
            }} 
               className={`group cursor-pointer relative flex justify-center items-center text-sm gap-2 active:scale-95 transition-all duration-300   w-full  py-2   bg-slate-500    text-white shadow  rounded-lg`}>
                 
            <Eye/>
         View Profile
           
             </button> 
           
           
        
           
           
           
           
           
                 </div>
              </div>
  ))
  }


  </div>
</div>


)}



export default Messages
