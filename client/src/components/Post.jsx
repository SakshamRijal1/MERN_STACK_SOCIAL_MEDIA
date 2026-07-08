import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from './Loading'
import { BadgeCheck, Dot, Edit, Heart, IndianRupee, MessageCircle, Share, Trash, Trash2, TurkishLira } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from 'react-router'
import Seepost from './Seepost'
import { useDispatch, useSelector } from 'react-redux'
import api from '../api/axois'
import { useAuth } from '@clerk/react'
import toast from 'react-hot-toast'
import CommentModel from './CommentModel'
import LikeModel from './LikeModel'
import EditPost from './EditPost'
import { fetchUser } from '../features/user/userSlice'
dayjs.extend(relativeTime);
const Post = ({item,setFeeds}) => {
  const [editPost, setEditPost] = useState(false)

const [likeModel, setLikeModel] = useState(false)
const [load, setLoad] = useState(false)
  const user=useSelector((state)=>state.user.value)
const [comment, setComment] = useState(false);
const [userComments, setUserComments] = useState([]);
const dispatch=useDispatch()
const postShare=async(req,res)=>{
  const postUrl=`${window.location.origin}/seepost/${item._id}`
  if(navigator.share)
  {
  try{

    await navigator.share({
      title:item.content||"Check out this post",
      url:postUrl
    })
  }

  catch(err)
  {
toast.error("Something went wrong.")
return;
  }
}
else{
  await navigator.clipboard.writeText(postUrl);
  toast.success('Url copied')
}
}
const {getToken}=useAuth()
  const [like,setLike]=useState(item.likes_count);
const handleDelete=async(req,res)=>
{
  const token=await getToken()
  try{
const {data}=await api.post('/api/post/delete',{
  postId:item._id,

},
{
  headers:{
    Authorization:`Bearer ${token}`
  }
})
if(data.success)
{

  
  setFeeds((prev)=>prev.filter((post)=>post!=item))

  toast.success(data.message);

  return
}
else{
  toast.error(data.message)
}

  }
  catch(err)
  {
    return
  }
}
  const handleLike=async()=>{
  if(load) return;
  setLoad(true)
try{
    const token=await getToken()
    const {data}=await api.post('/api/post/like',
      {
        postId:item._id,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    
    )
    if(data.success)
    {
      toast.success(data.message);
    setLike(prev=>{
      if(prev.some((likedUser)=>likedUser._id==user._id))
      {
        return prev.filter(likedUser=>likedUser._id!==user._id)
      }
      else{
        return [...prev,user]
      }
    })

    }
    else{
      toast.success(data.message)
  
    }
  }
  catch(err)
{
  return;
}
finally{
  setLoad(false)
}

}


  useEffect(()=>{
    setComment(false)
    const fetchComment=async()=>{
      const token=await getToken();
      try{
      const {data}=await api.post('/api/comment/get',{
        postId:item._id,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(data.success)
      {
  
        setUserComments(data.comment)
      }
    }


  catch(err)
  {
toast.error("Something went wrong.")
  }  }
  fetchComment();
  },[item])
  const currentUser=useSelector((state)=>state.user.value)
  const navigate=useNavigate()

 const postWithHastags=item.content.replace(/(#\w+)/g,'<span class="text-indigo-600 hover:underline">$1</span>')
return (
<>
 
 <div className=" bg-white  dark:bg-gray-900 dark:text-white rounded-lg p-6  max-sm:px-2  lg:p-10 w-full
 max-md:w-full flex justify-center  flex-col relative">
<div className='flex justify-between items-center '>
  
      <div className='flex gap-4 max-lg:my-3 max-sm:gap-5 '>
    
      <img onClick={()=>{
        if(item.user._id===user._id)
        {
          navigate('/profile')
        }
        else
        {
          navigate(`/profile/${item.user._id}`)
        }
      }} className='w-13  rounded-full object-cover  relative bottom-5 h-13 cursor-pointer' src={item.user.profile_picture} alt="cover-photo" />
      <div className='flex  relative flex-col bottom-5 '>
    <h1 className='font-semibold flex gap-1  items-center'>{item.user.full_name}{item.user.is_verified && <BadgeCheck className='fill-blue-600 text-white size-4'/>}</h1>
      <p className='text-gray-700  dark:text-gray-500 text-sm font-light flex flex-wrap gap-0.5'>@{item.user.username} <Dot/> {dayjs(item.createdAt).fromNow()} </p>
      </div>
          
      </div>
    
    {  user._id ===item.user._id && <div className=' flex gap-5 relative'>
      <div className='group'>

  
<Trash2 onClick={()=>{
  handleDelete()
}} className='b shadow  text-amber-700 rounded-lg  font-bold size-4 active:scale-95 cursor-pointer  '/>
<div className= 'hidden  top-6 w-25 right-4  absolute sm:group-hover:flex text-white text-sm bg-gray-800 rounded-lg p-2 '>Delete Post</div>
    </div>
    <div className='group'>

<Edit onClick={()=>{
setEditPost(true)
}} className='size-4 active:scale-95 text-cyan-600 shadow cursor-pointer'/>
      <div className= 'hidden transition-all dur absolute w-20 top-6 text-white sm:group-hover:flex left-4 bg-gray-800 rounded-lg p-2 text-sm '>Edit Post</div>
    </div>
      </div>
  
}
  

</div>
   
{  item.content &&    <p className='w-full text-wrap  mb-3 font-light'dangerouslySetInnerHTML={{__html : postWithHastags}} /> 
}
<div  className='grid grid-cols-2 gap-2 cursor-pointer active:scale-98 transition-all duration-200 '>
   {   item.image_urls && item.image_urls.map((image,index)=>(
 <img   onClick={()=>{
  navigate(`/seepost/${item._id}`)
 }}
      key={index}  src={image}
        alt="photo"
        className={`w-full   rounded-lg min-h-[250px] md:min-h-[350px] lg:min-h-[450px] object-cover ${item.image_urls.length==1 && 'col-span-2 h-auto'}`}
      />
    ))
   }  
   </div>

 
   

<div className='flex mt-5 gap-10 border-t dark:border-t-gray-700  border-t-gray-400 p-4'>
<div className=''> 
    <Heart onClick={()=>{
     
     handleLike()
    }} className={`cursor-pointer ${like.some(liked=>liked._id==user._id)? 'fill-red-600 duration-150 text-red-600 transition-all':''} `}/>

   <p onClick={()=>{
    setLikeModel(true)
   }} className='font-semibold duration-150 transition-colors hover:underline cursor-pointer '> {like.length}  likes</p>
   <div className='flex'>
    
    {
  like.map((likedUser,index)=>(
        <div key={likedUser._id}>

        {

          index <3 &&

        <img  className='w-4 h-4 object-cover rounded-full' src={likedUser.profile_picture} alt="" />
}
        </div>
        
      ))
    }
   </div>
       </div>
       <div>
 <MessageCircle onClick={()=>{
  if(comment)
  {

  
  setComment(false)
  }
  else{
 setComment(true)
  }
 }} className='cursor-pointer'/>
  <p className='font-semibold duration-150 transition-colors '> {userComments.length}</p>
 </div>
 <Share onClick={()=>{
postShare()
 }} className='cursor-pointer'/>
        </div>

          {
          comment && <CommentModel  setComment={setComment} setUserComments={setUserComments} comments={userComments} post={item}/>
        }

        </div>
        {
          likeModel && <LikeModel setLikeModel={setLikeModel} id={item._id} />
        }
        {
          editPost && <EditPost setEditPost={setEditPost} item={item} />
        }
         
      </>
    


   

) }

export default Post;
