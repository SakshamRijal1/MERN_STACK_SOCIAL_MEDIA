  import React, { useEffect, useRef, useState } from 'react'
  import { dummyConnectionsData, dummyPostsData } from '../assets/assets'
  import { BadgeCheck, Calendar, Edit, GitPullRequestCreateArrowIcon, MapPin } from 'lucide-react'

    import dayjs from 'dayjs'
    import relativeTime from 'dayjs/plugin/relativeTime'
import Post from '../components/Post'
import Loading from '../components/Loading'
import { useNavigate, useParams } from 'react-router'
import EditProfile from '../components/EditProfile'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, useAuth } from '@clerk/react'
import toast from 'react-hot-toast'
import api from '../api/axois.js'
import ShowProfile from '../components/ShowProfile.jsx'
import FollowModel from '../components/FollowModel.jsx'
import { fetchUser } from '../features/user/userSlice.js'
import { fetchConnection } from '../features/connections/connectionSlice.js'
  const Profile = () => {
const {id}=useParams()

const currentUser=useSelector((state)=>state.user.value)  

const [likes, setLikes] = useState(0)
const [edit, setEdit] = useState(false)
const [followModel, setFollowModel] = useState(false)
const [followingModel, setFollowingModel] = useState(false)
const [loadFollow, setLoadFollow] = useState(false)
const [showProfile, setShowProfile] = useState(false)
const dispatch=useDispatch()

const [posts, setPosts] = useState([]);
 const list=[
    "Post",
    "Media",

  ]
    const [status, setStatus] = useState(list[0]);
    const [width, setWidth] = useState(0)
const [load, setLoad] = useState(true);
const progressTimeout = useRef(null);
const progressInterval = useRef(null);
const navigate=useNavigate()
 
const [item, setItem] = useState(null)
    const {getToken}= useAuth()

    const handleFollow=async(item)=>{
if(loadFollow) return
  const token=await getToken()
setLoadFollow(true)
  try{
    const {data}=await api.post('/api/user/follow',
      {
        id:item._id,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )


    if(data.success)
    {
          dispatch(fetchUser(token))
               dispatch(fetchConnection(token))
      // setFollowing((prev)=>{
      //   return [item._id,...prev]
      // })
    

  
      toast.success(`Following ${item.full_name} successfully.`)
    }
    else{
      toast(data.message)
    }
  }
  catch(err)
  {
toast.error(err.message)
  }
  finally{
      setLoadFollow(false)
  }
}
const handleUnFollow=async(item)=>{
  if(loadFollow) return;
     setLoadFollow(true)
  const token=await getToken()

  try{
    const {data}=await api.post('/api/user/unfollow',
      {
        id:item._id,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    if(data.success)
    {
      
  //     setFollowing((prev)=>{
  //  return prev.filter(user=>user!==item._id)
  //     })


          dispatch(fetchUser(token))
          dispatch(fetchConnection(token))
  
  
      toast.success(`Unfollowed ${item.full_name} successfully.`)
    }
    else{
      toast(data.message)
    }

  }
  catch(err)
  {
toast.error(err.message)
  }
  finally{
      setLoadFollow(false)
  }
}



useEffect(()=>{
if(!currentUser)  return
    const fetchUser=async(id)=>{

    const token=await getToken();


    try{
const {data}=await api.post(`/api/user/profiles`,
  {
  id
  },{
  headers:{
    Authorization:`Bearer ${token}`
  }
  

})

  if(data.success)
  {

    setItem(data.profile)
setPosts(data.posts)


  }
  else {
    toast.error("from profile else")
  }
  
    }
    catch(err)
    {
  toast.error("from profile catch")
    }
      setLoad(false);

  }

if(id && id!==currentUser?._id)
{

   fetchUser(id)
}
else{
fetchUser(currentUser?._id)
}



},[id,currentUser])




  dayjs.extend(relativeTime);


    


    return load ? <Loading/> : (
      <>


  <div className='md:p-10 p-3 w-full overflow-x-hidden flex justify-center items-center flex-col gap-5 relative'>


    <div className=' rounded-lg w-full max-h-screen dark:bg-slate-900  dark:text-white bg-white min-h-120 relative '>
<div className="h-64 rounded-t-xl overflow-hidden bg-gradient-to-r max-h-full from-indigo-700 via-purple-700 to-pink-600">
        {
item.cover_photo &&
        
 <img className='w-full h-full object-cover rounded-t-lg' src={item?.cover_photo} alt="" />
        }


      </div>

      <div className='flex  gap-3 mt-5 max-lg:flex-col justify-between  '>
   <div className="absolute top-[150px] ml-6 z-10">
  <div className="rounded-full p-1 bg-white dark:bg-slate-900 shadow-2xl">
    <img
      onClick={() => setShowProfile(true)}
      src={item?.profile_picture}
      alt=""
      className="w-40 h-40 rounded-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
    />
  </div>
</div>
        <div className='max-lg:ml-0 max-lg:mt-15 p-3 ml-50 w-full '>
          <div className='flex justify-between'>
            <div>

            
    <h1 className='font-semibold text-xl items-center flex gap-1'>{item?.full_name}{item?.is_verified && <BadgeCheck className=' fill-blue-600 text-white text-sm size-5 '/>}</h1>
  <p className='text-gray-500'>@{item?.username}</p>
  </div>
  <div>
       {
      id && <>{
   currentUser?.following?.includes(item._id) ?
   
    <button   onClick={()=>{
  
       handleUnFollow(item)
     }}
       className={`group relative cursor-pointer   w-full text-sm  active:scale-95 transition-all duration-300 px-4    py-2 bg-slate-500 text-white  rounded-lg`}>
         
     Unfollow
   
   
     </button> :
   
     <button  onClick={()=>{
  
handleFollow(item)
     
     }}
       className={`group relative cursor-pointer   w-full text-sm  active:scale-95 transition-all duration-300 px-4    py-2 bg-indigo-600 text-white  rounded-lg`}>
     
   
     Follow
   
   
     </button>
     
      
     
   
    }
     </>

   }
  </div>
          </div>
          <div>
            <p className='text-gray-600 text-sm'>{item?.bio}</p>

            <div className='mt-5 flex  gap-4 text-gray-700 dark:text-gray-600 max-sm:flex-col'>
              {
                item.location &&   <button className=' gap-1 flex rounded-xl  items-center justify-center px-3 py-0.5 text-sm ' ><MapPin/>{item?.location}</button>
              }
            
              <button className=' gap-1 flex rounded-xl  items-center justify-center px-3 py-0.5 text-sm ' ><Calendar/> Joined <span className='font-semibold'>{dayjs(item?.createdAt).fromNow()}</span></button>
            </div>
            <hr  className='text-gray-300 mt-5'/>
            <div className='flex gap-4 mt-2 text-gray-800 dark:text-gray-400'>
              <h1 className='flex gap-1'>{posts.length} <span className='font-semibold'>Posts</span></h1>
                <h1  onClick={()=>{
                  setFollowModel(true

                  )
                }} className='flex hover:underline cursor-pointer  gap-1'>{item.followers.length} <span className='font-semibold'>Followers</span></h1>
                  <h1  onClick={()=>{
                  setFollowingModel(true

                  )
                }}  className='flex hover:underline cursor-pointer  gap-1'>{item?.following?.length} <span className='font-semibold'>Following</span></h1>
            </div>
          </div>

        </div>
        <div>

        </div>
{
  !id && <div className=' p-3 max-lg:w-full '>
          <button onClick={()=>{
  setEdit(true)
          }} className='flex max-lg:w-full transition-all duration-200 hover:scale-95 rounded-lg hove:shadow px-4 py-1 shadow  cursor-pointer  gap-2 justify-center items-center dark:shadow-gray-700'> <Edit/>Edit</button>
        </div>
}
       
      </div>
    </div>


    <div className='shadow w-96 p-2 max-sm:w-full dark:bg-gray-900 flex justify-between rounded-lg '>

{
  list.map((item,index)=>(
    <button  onClick={()=>{
      setStatus(item)
    }} className={`cursor-pointer px-5 py-1 rounded-lg  transition-all duration-500 ${item==status ? "bg-indigo-600 text-white":"text-gray-700 dark:text-gray-500"} `} key={item}>
{item}

    </button>
  ))
}
    </div>
    {
      status=="Post" &&     <div className="flex justify-center p-2 max-w-4xl w-full items-center flex-col gap-6">

{
  posts?.length==0 && <p className='text-gray-600 text-sm'>No post found!!</p>
}
{

posts.map((post,index)=>(
    <Post  key={post._id} item={post}/>
  ))
}
</div>
    }
    {
      status=="Media" &&    <div className="flex  p-2 max-w-4xl   flex-col gap-2">

{
  ((posts.length==0)||(
    !posts.some((userPost)=>userPost.post_type=='text_with_image'||userPost.post_type=='image')
  ))  && <p className='text-gray-600 text-sm text-center'>No media found!!</p>
}
{


  posts.map((post,index)=>(

<>
{
  post.image_urls.length==1   &&  <img onClick={()=>{
    navigate(`/seepost/${post._id}`)
  }} className='w-50   h-40 object-cover rounded' key={post} src={post.image_urls[0]} alt="" />
  }
{
  post.image_urls.length>1 && 
  post.image_urls.map((url,index)=>(
    <img onClick={()=>{
    navigate(`/seepost/${post._id}`)
  }} className='w-50   h-40 object-cover rounded' key={url} src={url} alt="" />
  ))
  }
</>
  ))
}
</div>
    }



        
      </div>


      {  edit &&
        <EditProfile  setEdit={setEdit} details={item} />
      }
      {
        showProfile && <ShowProfile image={item.profile_picture} setShowProfile={setShowProfile}/>
      }
         {
        followModel &&  <FollowModel title={'Followers'} setFollowModel={setFollowModel} users={item.followers}/>
      }
          {
        followingModel &&  <FollowModel title={'Following'} setFollowModel={setFollowingModel} users={item.following}/>
      }


      </>
    )
  }

  export default Profile
