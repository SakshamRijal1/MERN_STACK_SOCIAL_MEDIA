import React from 'react'
import { assets, dummyUserData } from '../assets/assets'
import { useNavigate } from 'react-router'
import Menu from './Menu'
import { CirclePlus, DoorClosed, LogOut, MoveLeftIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/react'

const Sidebar = ({sidebarOpen,setSidebarOpen}) => {

const user=dummyUserData;
const {signOut}=useClerk()

  const navigate=useNavigate()
  return (
    <div className={`w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute relative inset-0 z-100 ${sidebarOpen?'translate-x-0':'max-sm:-translate-x-full'} transition-all  ease-in-out duration-300`}>
      <div className='w-full  flex flex-col'>
        <img onClick={()=>{
          navigate('/')
        }} className='w-26 ml-7 my-2 cursor-pointer' src={assets.logo} alt="" />
        <hr className='border-gray-300 mb-8'/>
 <Menu setSideBarOpen={setSidebarOpen}/>
<div onClick={()=>{
  navigate('/createpost')
 }} class="flex flex-col gap-6 mt-5 w-50  mx-auto relative z-10">
  <button
    class="group relative px-5 max-md:w-full py-3 text-white rounded-md flex justify-center items-center backdrop-blur-xl border-2   bg-linear-to-r from-purple-500 to-pink-500 shadow-2xl   hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer  hover:bg-linear-to-r hover:from-pink-500 hover:to-purple-500 overflow-hidden">
    <div class="absolute  inset-0 bg-gradient-to-r from-transparent via-white  to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
    ></div>
Create Post
  


  </button>
</div>
      </div>
       
  
      <div className=' text-gray-800 mb-10 w-full flex items-center justify-around border-t border-t-gray-200'>
<div className='flex gap-2 items-center cursor-pointer'>
  <UserButton/>
  <div>
    <h1 className='text-sm font-medium'>{user.full_name}</h1>
    <p className='text-xs text-gray-500'>@{user.username}</p>
  </div>

</div>
       

   <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition-all cursor-pointer'/>
       </div>
    </div>
  )
}

export default Sidebar
