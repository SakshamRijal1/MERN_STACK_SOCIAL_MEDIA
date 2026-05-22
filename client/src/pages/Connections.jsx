import React, { useState } from 'react'
import ConntectionState from '../components/ConntectionState'
import { dummyConnectionsData, dummyFollowersData, dummyFollowingData, dummyPendingConnectionsData } from '../assets/assets'
import { BadgeCheck, Clock, Handshake, Network, User, UserCheck } from 'lucide-react'
import Shimmer from '../components/Shimmer'

const Connections = () => {
 
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
  
  return (
   <div className='md:p-10 p-3 w-full overflow-x-hidden'>
  <h1 className='text-2xl font-bold'>Connections</h1>
  <p className=' text-gray-500 mt-4'>Manage your network and discover new connections.</p>
<div className='flex gap-4  flex-wrap mt-10 overflow-x-hidden'>
  {
   <ConntectionState  number={dummyFollowersData.length} parameter={'Followers'}/>
  }
    {
   <ConntectionState number={dummyFollowingData.length} parameter={'Following'}/>
  }
      {
   <ConntectionState number={dummyPendingConnectionsData.length} parameter={'Pending'}/>
  }
    {
   <ConntectionState number={dummyConnectionsData.length} parameter={'Connections'}/>
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
  status=="Followers"&& dummyFollowersData.map((item,index)=>(
  
    <div className='flex gap-2 max-md:flex-col  max-md:w-full shadow p-5' key={index}>
      
    <div className=''>
      <img className='w-15 h-15 rounded-full' src={item.profile_picture} alt="" />
    
    </div>
    <div className='w-full md:w-40'>
  <h1 className='font-semibold flex gap-1'>{item.full_name}{item.is_verified && <BadgeCheck className='fill-blue-600 text-white'/>}</h1>
      <p className='text-gray-500 '>@{item.username}</p>
      <p className='truncate   text-gray-600 text-sm'>{item.bio}</p>
    </div>



<Shimmer link={`/profile/${item._id}`} type={"View Profile"}/>
      
   
    </div>
  ))
}






{
  status=="Following"&& dummyFollowingData.map((item,index)=>(
  
    <div className='flex gap-2 max-md:flex-col  max-md:w-full shadow p-5' key={index}>
      
    <div className=''>
      <img className='w-15 h-15 rounded-full' src={item.profile_picture} alt="" />
    
    </div>
    <div className='w-full md:w-40'>
   <h1 className='font-semibold flex gap-1'>{item.full_name}{item.is_verified && <BadgeCheck className='fill-blue-600 text-white'/>}</h1>
      <p className='text-gray-500 '>@{item.username}</p>
      <p className='truncate text-gray-600 text-sm'>{item.bio}</p>
    </div>



<Shimmer link={`/profile/${item._id}`} type={"View Profile"}/>
      
   
    </div>
  ))
}

  

{
  status=="Pending"&& dummyPendingConnectionsData.map((item,index)=>(
  
    <div className='flex gap-2 max-md:flex-col  max-md:w-full shadow p-5' key={index}>
      
    <div className=''>
      <img className='w-15 h-15 rounded-full' src={item.profile_picture} alt="" />
    
    </div>
    <div className='w-full md:w-40'>
  <h1 className='font-semibold flex gap-1'>{item.full_name}{item.is_verified && <BadgeCheck className='fill-blue-600 text-white'/>}</h1>
      <p className='text-gray-500 '>@{item.username}</p>
      <p className='truncate text-gray-600 text-sm'>{item.bio}</p>
    </div>



<Shimmer link={`/profile/${item._id}`} type={"View Profile"}/>
      
   
    </div>
  ))
}



  

{
  status=="Connections"&& dummyConnectionsData.map((item,index)=>(
  
    <div className='flex gap-2 max-md:flex-col  max-md:w-full shadow p-5' key={index}>
      
    <div className=''>
      <img className='w-15 h-15 rounded-full' src={item.profile_picture} alt="" />
    
    </div>
    <div className='w-full md:w-40'>
  <h1 className='font-semibold flex gap-1'>{item.full_name}{item.is_verified && <BadgeCheck className='fill-blue-600 text-white'/>}</h1>
      <p className='text-gray-500 '>@{item.username}</p>
      <p className='truncate text-gray-600 text-sm'>{item.bio}</p>
    </div>



<Shimmer link={`/profile/${item._id}`} type={"View Profile"}/>
      
   
    </div>
  ))
}
    </div>

</div>
  )}

export default Connections
