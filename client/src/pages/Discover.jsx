import { AwardIcon, BadgeCheck, Check, Dice1, Loader, MapPin, Plus, Search } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { dummyConnectionsData } from '../assets/assets'
import api from '../api/axois'
import { getToken, useAuth } from '@clerk/react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../features/user/userSlice'
import { fetchConnection } from '../features/connections/connectionSlice'
import Card from '../components/Card'


const Discover = () => {
  const user=useSelector((state)=>state.user.value)
  const {getToken}=useAuth()
  const discoverFactor = useRef(null);
  // const [following, setFollowing] = useState(user.following);


const dispatch=useDispatch();

  
  const [discover, setDiscover] = useState([]);
 const {connections,pendingConnections,followers,following,sentRequest}=useSelector((state)=>state.connections);

 

  const fetchDefault=async()=>{

  try{
const {data}=await api.get('/api/user/default',{
  headers:{
    Authorization:`Bearer ${await getToken()}`
  }

})

if(data.success)
{

  setDiscover(data.users);



}
else{

  setDiscover([])
  


}


  }
  catch(err)
  {
toast.error(err.message)
setDiscover([])
  }
}
useEffect(()=>{

fetchDefault()

}
,[])
const discoverPeople=async(e)=>{
  e.preventDefault()
  if(discoverFactor.current.value=="")
  {

fetchDefault()
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
    toast.success(data.message)
  setDiscover(data.users);

}
else{
  toast(data.message)
  setDiscover([])
}


  }
  catch(err)
  {
toast.error(err.message)
setDiscover([])
  }
}

  return (
      <div className='md:p-10 p-3 w-full overflow-x-hidden'>
  <h1 className='text-2xl font-bold dark:text-white'>Connections</h1>
  <p className=' text-gray-500 mt-4 dark:text-gray-400'>Connect with amazing people and grow your network.</p>
  <div className='w-full p-4 shadow rounded-lg mt-5 flex items-center justify-center'>
    <form onSubmit={(e)=>{
      discoverPeople(e)
    }} className='w-full  relative'>
<Search className='absolute rounded-lg py-2 w-10 h-10  text-gray-500 '/>
 
<input ref={discoverFactor} placeholder='Search by name,username,bio,or location...' className='w-full dark:outline-gray-700 dark:text-gray-300 indent-14 border-none  outline outline-gray-300 py-2 rounded-lg'  type="text" name="" id="" />

   </form>
  </div>
  <div className='flex gap-5  flex-wrap max-md:flex-col items-center justify-center'>
   {
    discover.map((item,index)=>(
     <Card discover={discover} setDiscover={setDiscover} key={index} item={item}/>

    

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
