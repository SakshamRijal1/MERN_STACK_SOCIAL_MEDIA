import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from './Loading'
import { BadgeCheck, Dot, Heart, IndianRupee, MessageCircle, Share } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from 'react-router'
import Seepost from './Seepost'
dayjs.extend(relativeTime);
const Post = ({item}) => {

  const [like,setLike]=useState(false);
  const handleLike=()=>async()=>{
    
  }
  const navigate=useNavigate()

 const postWithHastags=item.content.replace(/(#\w+)/g,'<span class="text-indigo-600 hover:underline">$1</span>')
return (

 
 <div className=" bg-white rounded-lg  p-5 lg:p-10 flex justify-center  flex-col ">

      <div className='flex gap-4 '>
    
      <img className='w-13  rounded-full object-cover relative bottom-5 h-13' src={item.user.cover_photo} alt="cover-photo" />
      <div className='flex  relative flex-col bottom-5'>
    <h1 className='font-semibold flex gap-1'>{item.user.full_name}{item.user.is_verified && <BadgeCheck className='fill-blue-600 text-white'/>}</h1>
      <p className='text-gray-700 text-sm font-light flex gap-0.5'>@{item.user.username} <Dot/> {dayjs(item.createdAt).fromNow()} </p>
      </div>
          
      </div>
  

   
{  item.content &&    <p className='w-full text-wrap  mb-3 font-light'dangerouslySetInnerHTML={{__html : postWithHastags}} /> 
}
<div  className='grid grid-cols-2 gap-2 cursor-pointer active:scale-98 transition-all duration-200 '>
   {   item.image_urls && item.image_urls.map((image,index)=>(
 <img  onClick={()=>{
  navigate(`/seepost/${item._id}`)
 }}
      key={index}  src={image}
        alt="photo"
        className={`w-full   rounded-lg min-h-[250px] md:min-h-[350px] lg:min-h-[450px] object-cover ${item.image_urls.length==1 && 'col-span-2 h-auto'}`}
      />
    ))
   }  
   </div>

 
   

<div className='flex mt-5 gap-10 border-t border-t-gray-400 p-4'>
<div className=''> 
    <Heart onClick={()=>
setLike(true)
   } className={`cursor-pointer ${like? 'fill-red-600 duration-150 text-red-600 transition-all':''} `}/>
   {like? <p className='font-semibold duration-150 transition-colors '>{item.likes_count.length+1} like</p>:null}
       </div>
 <MessageCircle className='cursor-pointer'/>
 <Share className='cursor-pointer'/>
        </div>
        </div>
    


   

) }

export default Post;
