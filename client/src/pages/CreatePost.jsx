import React, { useEffect, useRef, useState } from 'react'
import { BadgeCheck, Captions, Image, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import api from '../api/axois'
import { getToken, useAuth } from '@clerk/react'
import { useNavigate } from 'react-router'
const CreatePost = () => {

const [load, setLoad] = useState(false);
const [captionWithHastag, setCaptionWithHastag] = useState("");
const caption=useRef('')
const [url, setUrl] = useState([])
const {getToken}=useAuth()
const [image, setImage] = useState([])


const user=useSelector((state)=>state.user.value)
const navigate=useNavigate()
const handlePost=async()=>{
  if(image.length>=5) {
    toast.error("Cannot add more than 4 photos");
    return
  }
  setLoad(true)
  const token=await getToken()
  let content=""
  let post_type=""
 try{
let text=caption.current.value.trim()

  if(text)
  {
    content=caption.current.value;
  }
  if(url.length==0 && !content)
  {
   return toast.error("Cannot add empty post.")
  }
  if(content && url.length>0)
  {
    post_type="text_with_image"
  }
  else if(content && url.length==0)
    
  {
  
    post_type="text"
  }
  else{
    post_type="image"
  }


  const post=new FormData()
 post.append('content',content)
 post.append('post_type',post_type)

 for(const val of image)
 {
  post.append('images',val)
 }

 const {data}=await api.post('/api/post/add',post,
  {
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
 )
 if(data.success)
 {
  toast.success(data.message);
  navigate('/')
  
 }
 else{
  toast.error(data.message)
 }
  

}
catch(err)
{
  toast.error(err.message)
}
finally{
  setLoad(false)
}
}

  return (



      <div className='md:p-10 p-3 w-full overflow-x-hidden'>
  <h1 className='text-2xl font-bold dark:text-white'>Create Post</h1>
  <p className=' text-gray-500 mt-4 dark:text-gray-400'>Share your thoughts to the world.</p>
  
  <div className='w-full max-md:w-full p-3 dark:bg-gray-900 dark:text-white rounded-lg shadow flex flex-col  gap-3 '>

{
  
      <div className='flex flex-col  rounded-lg   gap-4'>
    <img  className='w-15 h-15 object-cover rounded-full' src={user?.profile_picture} alt="profile-picture" />
    <div>

   
    <h1 className='font-semibold flex gap-1'>{user?.full_name}{user?.is_verified && <BadgeCheck className='fill-blue-600 text-white'/>}</h1>
    <p className='text-gray-500'>@{user?.username}</p>


  </div>
  </div>
}
<div className='  mb-10 '>

<textarea ref={caption} onInput={(e)=>{
setCaptionWithHastag(e.target.value.replace(/(#\w+)/g,`<span class="text-indigo-600">$1</span>`))
}}  placeholder='What happening?' className='resize-none w-full mt-3 p-2 dark:outline-gray-700 outline-1 outline-gray-300 rounded-lg ' />
{
  ( url.length>=1 || captionWithHastag!=="") &&

<div className='w-full rounded-lg shadow p-3 '>


<p className='w-full  p-2 text-gray-700 dark:text-gray-300 rounded-lg top-0'  dangerouslySetInnerHTML={{
  __html:captionWithHastag
}}/>
<div className='w-full min-h-full flex gap-2 flex-wrap justify-center items-center'>
  {
    url.length>=1 && <div className='relative border dark:border-gray-700 border-gray-300 rounded-lg p-3   items-center grid w-full grid-cols-3 gap-2 content-center justify-center  '>

{
url.length==1 && 
<div className='col-span-3 relative w-96 h-96 '>

    <img className='w-full h-full object-cover ' src={url} alt="" />
    <X onClick={()=>{
  setUrl([])
  setImage([])
}} className='absolute rounded-full top-0 right-0 cursor-pointer  bg-gray-500   shadow  w-8 h-8 flex items-center  text-white active:scale-95 transition-all duration-200'/>
</div>
    
}
{
  url.length>1 &&(
    
    url.map((item,index)=>(

      <div key={index} className=' relative'>
            <X onClick={()=>{

setUrl(url.filter(link=>link!==item))


setImage(image.filter((_,i)=>i!==index))

}} 
 className='absolute top-0 right-0 cursor-pointer  shadow w-8 h-8 rounded-full bg-gray-400  flex items-center text-white active:scale-95 transition-all duration-200'/>
 <img className='w-full  max-w-96 max-h-96   object-cover' src={item} alt="" />
 </div>
    ))

     
  )
}

    </div>
  }
</div>
</div>}
<div>


</div>
</div>
<hr  className='text-gray-300 dark:text-gray-700 w-full'/>
<div className='flex justify-between items-center w-full  max-md:flex-col gap-5'>

     <label  className={`gap-4`}>
        <input onChange={(e)=>{
                  const link=e.target.files?.[0];
  if(!link) return;
               setUrl((items=>[...items,URL.createObjectURL(link)]))
               setImage(images=>[...images,link])
                
        }}  accept='image/*,videos/*' className='hidden ' type="file" name="" id="" />
<Image  className='cursor-pointer hover:scale-95 dark:text-gray-400 transition-all duration-200 shadow'/>
      </label>
   <div  className="flex flex-col gap-6 max-md:w-full  relative z-10">
  <button disabled={load} onClick={()=>{
    handlePost()
  }}
    className={`group relative px-5  py-3 text-white rounded-md flex justify-center items-center backdrop-blur-xl    bg-gradient-to-r from-indigo-500 to-purple-600  ${load && 'opacity-50'}  shadow-2xl   hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer  overflow-hidden`}>
    <div className="absolute  inset-0 bg-gradient-to-r from-transparent via-white  to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
    ></div>

  
Publish Post

  </button>
</div>
  </div>


  </div>
  </div>)
 
  }

export default CreatePost
