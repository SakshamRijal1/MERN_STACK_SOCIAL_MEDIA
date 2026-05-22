import { BadgeCheck, MapPin, Plus, Search } from 'lucide-react'
import React from 'react'
import { dummyConnectionsData } from '../assets/assets'

const Discover = () => {

  return (
      <div className='md:p-10 p-3 w-full overflow-x-hidden'>
  <h1 className='text-2xl font-bold'>Connections</h1>
  <p className=' text-gray-500 mt-4'>Connect with amazing people and grow your network.</p>
  <div className='w-full p-4 shadow rounded-lg mt-5 flex items-center justify-center'>
    <div className='w-full  relative'>
<Search className='absolute rounded-lg py-2 w-10 h-10  text-gray-500 '/>
 
<input placeholder='Search by name,username,bio,or location...' className='w-full indent-14 border-none  outline outline-gray-300 py-2 rounded-lg'  type="text" name="" id="" />

   </div>
  </div>
  <div className='flex gap-5  flex-wrap max-md:flex-col items-center justify-center'>
   {
    dummyConnectionsData.map((item,index)=>(
      <div className='flex flex-col max-w-72 rounded-lg p-4 shadow mt-8  items-center gap-4' key={index}>
    <img  className='w-15 h-15 object-cover rounded-full' src={item.profile_picture} alt="" />
    <div>

   
    <h1 className='font-semibold flex gap-1'>{item.full_name}{item.is_verified && <BadgeCheck className='fill-blue-600 text-white'/>}</h1>
    <p className='text-gray-500'>@{item.username}</p>

 </div>
    <p className=' text-gray-600 text-sm'>{item.bio}</p>


    <div className='flex gap-2 justify-center items-center'>
      <button className='rounded-2xl justify-center items-center text-sm  border-gray-300 border py-0.5 flex  text-gray-600  px-4 shadow'><MapPin className='w-5 h-5'/>{item.location}</button>
       <button  className='rounded-2xl text-sm  px-4 py-0.5 justify-center shadow text-gray-600 border-gray-300  border flex'>{item.followers.length} Followers</button>
    </div>
    <div>
     
    </div>
<div className='flex w-full items-center  content-around gap-3'>



  <button
    className="group relative  w-full  py-3 text-white rounded-md flex justify-center items-center backdrop-blur-xl border-2   bg-linear-to-r from-purple-500 to-pink-500 shadow-2xl   hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer  hover:bg-linear-to-r hover:from-pink-500 hover:to-purple-500 overflow-hidden">
    <div class="absolute  inset-0 bg-gradient-to-r from-transparent via-white  to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
    ></div>

  Follow


  </button>
<button className='w-20 h-12 border border-gray-500 cursor-pointer hover:shadow  transition-all duration-150 text-gray-500 rounded-lg flex justify-center items-center'>
  <Plus className=''/>
</button>



      </div>
      </div>

    

    ))
   }
  </div>

  </div>
  )
}

export default Discover
