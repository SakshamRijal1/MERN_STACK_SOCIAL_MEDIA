import React, { useState } from "react";
import { BadgeCheck, UserRound, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/react";
import { fetchUser } from "../features/user/userSlice";
import { fetchConnection } from "../features/connections/connectionSlice";
import toast from "react-hot-toast";
import api from "../api/axois";

const FollowModel = ({
  title,
  users,
  setFollowModel,

}) => {
  
  const navigate = useNavigate();
  const currentUser=useSelector((state)=>state.user.value)
  const [loadFollow, setLoadFollow] = useState(false)
   const {getToken}=useAuth()
   const dispatch=useDispatch()
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

  return (
    <div className="fixed inset-0 z-100 flex justify-center p-5 bg-black/80 backdrop-blur">
      <X
        onClick={() => setFollowModel(false)}
        className="absolute top-2 z-120 right-2 w-8 h-8 rounded-full bg-gray-500 text-white p-1 cursor-pointer active:scale-95"
      />

      <div className="bg-white dark:bg-gray-900 dark:text-white max-sm:w-full w-[600px] max-sm:h-full rounded-lg overflow-y-auto no-scrollbar">

        <h1 className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 p-4 text-2xl font-bold">
          {title}
        </h1>

        {users.length === 0 ? (
          <div className="h-[450px] flex flex-col justify-center items-center">

            <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex justify-center items-center">
              <UserRound className="w-12 h-12 text-indigo-500" />
            </div>

            <h2 className="mt-5 text-2xl font-semibold">
              No {title}
            </h2>

            <p className="text-gray-500 mt-2">
              Nothing to show here.
            </p>

          </div>
        ) : (
          <div className="p-3 space-y-2">

            {users.map((user) => (
              <div
                key={user._id}
               
                className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition "
              >
                <div className="flex items-center gap-3">

                  <img  onClick={() => 
                  {if(currentUser._id==user._id)
{

navigate(`/profile`)
}
else{

navigate(`/profile/${user._id}`)
}

                  setFollowModel(false)
                  }}
                    src={user.profile_picture}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200 cursor-pointer dark:ring-gray-700"
                  />

                  <div>
                    <div className="flex items-center gap-1">
                      <h2 className="font-semibold">
                        {user.full_name}
                      </h2>

                      {user.is_verified && (
                        <BadgeCheck className="w-5 h-5 fill-blue-500 text-white" />
                      )}
                    </div>

                    <p className="text-sm text-gray-500">
                      @{user.username}
                    </p>
                  </div>
                </div>

                <div className=" rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex justify-center items-center">
       
                     { !(currentUser._id==user._id) &&
                     <>
                     {

   currentUser.following.includes(user._id) ?
   
    <button   onClick={()=>{
  
       handleUnFollow(user)
     }}
       className={`group relative cursor-pointer   w-full text-sm  active:scale-95 transition-all duration-300 px-4    py-2 bg-slate-500 text-white  rounded-lg`}>
         
     Unfollow
   
   
     </button> :
   
     <button  onClick={()=>{
  
handleFollow(user)
     
     }}
       className={`group relative cursor-pointer   w-full text-sm  active:scale-95 transition-all duration-300 px-4    py-2 bg-indigo-600 text-white  rounded-lg`}>
     
   
     Follow
   
   
     </button>
     
      
     
   
     }</>
   
   }
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default FollowModel;