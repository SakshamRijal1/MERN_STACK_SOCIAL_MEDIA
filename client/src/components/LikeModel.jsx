import React, { useEffect, useState } from 'react'

import api from '../api/axois'
import { useAuth } from '@clerk/react'
import { BadgeCheck, HeartCrack, HeartHandshakeIcon, HeartOff, X } from 'lucide-react'
import { div } from 'three/src/nodes/math/OperatorNode.js'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const LikeModel = ({id,setLikeModel}) => {
  
const navigate=useNavigate()
  const [likes, setLikes] = useState([])
  const user=useSelector((state)=>state.user.value)
  const {getToken}=useAuth()
  useEffect(()=>{
const fetchLike=async()=>{
  const token=await getToken()
  try{
const {data}=await api.post('/api/post/likecount',{
  id
},{
  headers:{
    Authorization:`Bearer ${token}`
  }
})

if(data.success)
{
  setLikes(data.post.likes_count)
}
else{
  setLikes([])
}
  }

  catch(err)
  {
setLikes([])
  }
}
fetchLike()
  },[getToken,id])
  return (
    <div className='w-screen h-screen fixed top-0  right-0 bg-black/80 inset-0 backdrop-blur z-100 flex justify-center p-5'>
      
        <X  onClick={()=>{
          setLikeModel(false)
        }}
 className='absolute top-1 right-1 cursor-pointer  shadow w-8 h-8 rounded-full bg-gray-400  flex items-center text-white active:scale-95 transition-all duration-200 z-120'/>
      
    <div className='bg-white dark:text-white dark:bg-gray-900 flex flex-col gap-3  max-sm:w-full sm:rounded-lg   w-150 max-sm:h-full  no-scrollbar min-h-full overflow-y-auto relative '>
      


<h1 className='text-2xl  border-b bg-white w-full border-b-gray-300 font-bold p-3 z-50 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 text-gray-800 sticky top-0'>Likes Count</h1>
  

{
  likes.length === 0 && (
    <div className="flex flex-col items-center justify-center w-full h-[450px] rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">

      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30">
        <HeartOff className="w-12 h-12 text-red-500" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
        No Likes Yet
      </h2>

      <p className="mt-2 max-w-sm text-center text-gray-500 dark:text-gray-400">
        This post hasn't received any likes yet.
        Share it with more people and they'll start showing some love ❤️
      </p>

    </div>
  )
}
{
  likes.length>0 &&
  <div className='p-2'>
  
  {
   


<div  className="p-3 space-y-2">
  {likes.map((likeUser) => (
    <div onClick={()=>{
if(user._id==likeUser._id)
{

navigate(`/profile`)
}
else{

navigate(`/profile/${likeUser.user._id}`)
}
}}
      key={likeUser._id}
      className="
      flex
      items-center
      justify-between
      p-3
      rounded-xl
      hover:bg-gray-100
      dark:hover:bg-gray-800
      transition-all
      duration-200
      cursor-pointer
      "
    >
      <div className="flex items-center gap-3">

        {/* Profile */}
        <img
          src={likeUser.profile_picture}
          alt={likeUser.full_name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
        />

        {/* Name */}
        <div>
          <div className="flex items-center gap-1">

            <h2 className="font-semibold text-gray-900 dark:text-white">
              {likeUser.full_name}
            </h2>

            {likeUser.is_verified && (
              <BadgeCheck
                className="w-5 h-5 fill-blue-500 text-white"
              />
            )}
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{likeUser.username}
          </p>
        </div>
      </div>

      {/* Like Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30">
        <HeartHandshakeIcon className="w-5 h-5 text-red-500 fill-red-500" />
      </div>
    </div>
  ))}
</div>
}

  </div>

}

      </div>
    </div>
  )
}

export default LikeModel
