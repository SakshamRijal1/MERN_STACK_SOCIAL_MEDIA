import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router'
import { dummyPostsData } from '../assets/assets'
import Loading from './Loading';
import { ArrowLeft, ArrowRight, BadgeCheck, Cross, Dot, Home, X } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { getToken, useAuth, useUser } from '@clerk/react';
import api from '../api/axois';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
const Seepost = () => {
  dayjs.extend(relativeTime)
  const [post, setPost] = useState(null);
  const [load, setLoad] = useState(true);
  const [curr, setCurr] = useState(0)
  const {id}=useParams();
  const currentUser=useSelector(state=>state.user.value)

const {user}=useUser();
if(!user || !id)
{
  return <Navigate to={'/'}/>
}
    
const fetchPost=async(id)=>{
const token=await getToken();

try{
const {data}=await api.post('/api/post/onepost',{
  id
},
{
headers:{
  Authorization:`Bearer ${token}`
}})

if(data.success)
{

  setPost(data.post)
}
else {

navigate('*')
return
}
}
catch(err)
{

navigate('*')
return
}
setLoad(false)
}

 useEffect(()=>{
fetchPost(id)
 },[id])
 
const navigate=useNavigate()

  if(load)
  {
    return <Loading/>
  }
    const postWithHastags=post.content.replace(/(#\w+)/g,'<span class="text-indigo-600 hover:underline">$1</span>')
  return (
    <div className='w-full h-screen  overflow-x-hidden backdrop-blur dark:text-white dark:bg-gray-950 bg-gray-50 flex p-4'>

       <button onClick={()=>{
navigate(-1);
    
      }} className='w-10 h-10   rounded-lg  p-2 hover:bg-red-600 hover:border-none hover:text-white dark:bg-gray-800 bg-gray-50 absolute  cursor-pointer z-50 left-2 shadow '><X/></button>
             <button onClick={()=>{
navigate('/')
    
      }} className='  rounded-lg  p-2 hover:bg-indigo-600 hover:border-none hover:text-white dark:bg-gray-800 bg-gray-50 absolute  cursor-pointer z-50 right-2 shadow '><Home/></button>
        
      <div  className='bg-white rounded-lg  shadow border dark:text-white  dark:bg-gray-900 border-gray-300 w-full max-lg:h-1/2  max-lg:gap-4 flex flex-wrap '>
    
       
        <div className='w-9/12 max-lg:w-full dark:border-r-gray-700 relative h-full transition-all duration-300 border-r p-4 border-r-gray-300 flex justify-center  group'>

     
   <img   className='rounded max-md:object-cover w-full  transition-all duration-300 object-contain' src={post.image_urls[curr]} alt="" />
{( post.image_urls.length>1 && curr<(post.image_urls.length-1) ) &&
  <div onClick={()=>{
    setCurr((curr)=>curr+1);
  }}   className='absolute active:scale-95 transition-all duration-200 animate-pulse text-white max-md:hidden top-[50%] right-0 p-3 rounded-full bg-gray-600  z-110  hidden group-hover:flex cursor-pointer'>
      
         <ArrowRight  
       className=' '/>
       
        </div>
}
   {  curr>0 &&   <div onClick={()=>{
    setCurr((curr)=>curr-1);
  }}   className='absolute active:scale-95 transition-all duration-200 animate-pulse text-white max-md:hidden top-[50%] left-0 p-3 rounded-full bg-gray-600 z-110  hidden group-hover:flex cursor-pointer'>
      
         <ArrowLeft 
       className=' '/>
       
        </div>
}



      </div>
<div className='w-3/12 rounded-lg  shadow dark:text-white dark:bg-gray-900 bg-white max-lg:w-full p-4 '>
<div className='flex flex-col  justify-center items-center'>


    <div className='flex w-full gap-4 mt-4 '>
  
      <img onClick={()=>{
if(post.user._id ===currentUser._id)
{
  navigate('/profile');

}
else {
  navigate(`/profile/${post.user._id}`)
}
      }}  className='w-13 cursor-pointer  rounded-full object-cover relative bottom-5 h-13 ' src={post.user.profile_picture} alt="cover-photo" />
      <div className='flex  relative flex-col bottom-5 flex-wrap' >
    <h1 className='font-semibold flex gap-1 items-center'>{post.user.full_name}{post.user.is_verified && <BadgeCheck  className='fill-blue-600 size-4 text-white'/>}</h1>
      <p className='text-gray-700 text-sm font-light flex flex-wrap gap-0.5 dark:text-gray-500'>@{post.user.username} <Dot/> {dayjs(post.createdAt).fromNow()} </p>
      </div>
     
          </div>
             {  post.content &&    <p className='w-full   text-wrap   font-light'dangerouslySetInnerHTML={{__html : postWithHastags}} /> 

} 
   </div>
   <hr  className='text-gray-300 mt-4 dark:text-gray-700'/>
  
</div>
      </div>
    </div>
  )
}

export default Seepost
