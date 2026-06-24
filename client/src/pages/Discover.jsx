import { AwardIcon, BadgeCheck, Dice1, MapPin, Plus, Search } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { dummyConnectionsData } from '../assets/assets'
import api from '../api/axois'
import { getToken, useAuth } from '@clerk/react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const Discover = () => {
  const user=useSelector((state)=>state.user.value)
  const {getToken}=useAuth()
  const discoverFactor = useRef(null);
  const [following, setFollowing] = useState(user.following)
  
  const [discover, setDiscover] = useState([])

const discoverPeople=async(e)=>{
  e.preventDefault()
  if(discoverFactor.current.value=="")
  {
toast.error('Please enter valid search.')
setDiscover([])
return
  }

  try{
const {data}=await api.post('/api/user/discover',{
  input:discoverFactor.current.value
},{
  headers:{
    Authorization:`Bearer ${await getToken()}`
  }

})
if(data.success)
{
  setDiscover(data.users);
  toast.success('Found some people.')
}
else{
  toast('Couldnot found people.')
  setDiscover([])
}


  }
  catch(err)
  {
toast.error(err.message)
setDiscover([])
  }
}

const handleFollow=async(item)=>{
  
  try{
    const {data}=await api.post('/api/user/follow',
      {
        id:item._id,
      },{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      }
    )
    if(data.success)
    {
      setFollowing((prev)=>{
        return [item._id,...prev]
      })
      toast.success(`Following ${item.full_name} successfully.`)
    }
    else{
      toast("Cannot follow.")
    }

  }
  catch(err)
  {
toast.error(err.message)
  }
}
const handleUnFollow=async(item)=>{
  
  try{
    const {data}=await api.post('/api/user/unfollow',
      {
        id:item._id,
      },{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      }
    )
    if(data.success)
    {
      setFollowing((prev)=>{
   return prev.filter(user=>user!==item._id)
      })
      toast.success(`Unfollowed ${item.full_name} successfully.`)
    }
    else{
      toast("Cannot unfollow.")
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
  <p className=' text-gray-500 mt-4'>Connect with amazing people and grow your network.</p>
  <div className='w-full p-4 shadow rounded-lg mt-5 flex items-center justify-center'>
    <form onSubmit={(e)=>{
      discoverPeople(e)
    }} className='w-full  relative'>
<Search className='absolute rounded-lg py-2 w-10 h-10  text-gray-500 '/>
 
<input ref={discoverFactor} placeholder='Search by name,username,bio,or location...' className='w-full indent-14 border-none  outline outline-gray-300 py-2 rounded-lg'  type="text" name="" id="" />

   </form>
  </div>
  <div className='flex gap-5  flex-wrap max-md:flex-col items-center justify-center'>
   {
    discover.map((item,index)=>(
      <div className='flex flex-col max-w-72 rounded-lg p-4  min-w-60 shadow mt-8  items-center gap-4' key={index}>
    <img  className='w-15 h-15 object-cover rounded-full' src={item.profile_picture} alt="" />
    <div>

   
    <h1 className='font-semibold flex gap-1'>{item.full_name}{item.is_verified && <BadgeCheck className='fill-blue-600 text-white'/>}</h1>
    <p className='text-gray-500 text-center'>@{item.username}</p>

 </div>
    <p className=' text-gray-600 text-sm'>{item.bio}</p>


    <div className='flex gap-2 justify-center items-center'>
    {item.location &&

     <button className='rounded-2xl justify-center items-center text-sm gap-2  border-gray-300 border py-0.5 flex  text-gray-600  px-4 shadow'><MapPin className='w-5 h-5'/>{item.location}</button>}
       <button  className='rounded-2xl text-sm  px-4 py-0.5 justify-center shadow text-gray-600 border-gray-300  border flex'>{item.followers.length} Followers</button>
    </div>
    <div>
     
    </div>
<div className='flex w-full items-center  content-around gap-3'>


{
following.includes(item._id) ?

 <button onClick={()=>{
    handleUnFollow(item)
  }}
    className="group cursor-pointer relative  w-full  py-3 bg-slate-500 text-white shadow font-bold rounded-lg">
      
  Unfollow


  </button> :

  <button onClick={()=>{
    handleFollow(item)
  }}
    className="group relative cursor-pointer  w-full  py-3 bg-indigo-600 text-white font-bold rounded-lg">
  

  Follow


  </button>
  
   
  

  

}
<button  className='w-20 h-12 border-none cursor-pointer shadow  transition-all duration-150  rounded-lg flex  justify-center items-center'>
  <Plus className=''/>
</button>



      </div>
      </div>

    

    ))
   }
   {
    discover.length==0 &&  <p className='text-gray-600'>Discover people and connect with the world.</p>
   }
  </div>

  </div>
  )
}

export default Discover
