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

<div className="rounded-lg w-full bg-white dark:bg-slate-900 dark:text-white overflow-hidden">
  {/* Cover Photo */}
  <div className="h-40 sm:h-52 lg:h-64 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 overflow-hidden">
    {item?.cover_photo && (
      <img
        src={item.cover_photo}
        alt=""
        className="w-full h-full object-cover"
      />
    )}
  </div>

  {/* Profile Section */}
  <div className="px-6 pb-6">
    {/* Profile Picture */}
    <div className="-mt-16 sm:-mt-20">
      <div className="inline-block rounded-full p-1 bg-white dark:bg-slate-900 shadow-xl">
        <img
          onClick={() => setShowProfile(true)}
          src={item?.profile_picture}
          alt=""
          className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>

    {/* Content */}
    <div className="mt-5 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
      {/* Left */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="font-semibold text-2xl flex items-center gap-1">
              {item?.full_name}
              {item?.is_verified && (
                <BadgeCheck className="fill-blue-600 text-white size-5" />
              )}
            </h1>

            <p className="text-gray-500">@{item?.username}</p>
          </div>

          {/* Follow Button */}
          {id && (
            currentUser?.following?.includes(item._id) ? (
              <button
                onClick={() => handleUnFollow(item)}
                className="px-5 py-2 rounded-lg bg-slate-500 text-white hover:bg-slate-600 transition"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => handleFollow(item)}
                className="px-5 cursor-pointer py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Follow
              </button>
            )
          )}
        </div>

        {/* Bio */}
        <p className="text-gray-600 dark:text-gray-400 mt-3">
          {item?.bio}
        </p>

        {/* Info */}
        <div className="flex flex-wrap gap-4 mt-5 text-sm text-gray-600 dark:text-gray-400">
          {item?.location && (
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              {item.location}
            </div>
          )}

          <div className="flex items-center gap-1">
            <Calendar size={16} />
            Joined
            <span className="font-semibold">
              {dayjs(item?.createdAt).fromNow()}
            </span>
          </div>
        </div>

        <hr className="my-5" />

        {/* Stats */}
        <div className="flex flex-wrap gap-6">
          <h1>
            <span className="font-semibold">{posts.length}</span> Posts
          </h1>

          <h1
            onClick={() => setFollowModel(true)}
            className="cursor-pointer hover:underline"
          >
            <span className="font-semibold">{item.followers.length}</span>{" "}
            Followers
          </h1>

          <h1
            onClick={() => setFollowingModel(true)}
            className="cursor-pointer hover:underline"
          >
            <span className="font-semibold">
              {item?.following?.length}
            </span>{" "}
            Following
          </h1>
        </div>
      </div>

      {/* Edit Button */}
      {!id && (
        <div className="w-full lg:w-auto">
          <button
            onClick={() => setEdit(true)}
            className="w-full lg:w-auto flex items-center cursor-pointer justify-center gap-2 px-5 py-2 rounded-lg shadow dark:shadow-gray-700 hover:scale-95 transition"
          >
            <Edit  size={18} />
            Edit
          </button>
        </div>
      )}
    </div>
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
    <Post setFeeds={setPosts}  key={post._id} item={post}/>
  ))
}
</div>
    }
    {
      status=="Media" &&    <div className="flex  p-2 max-w-4xl   flex-wrap gap-2">

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
