
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { ArrowUp, AwardIcon, BadgeCheck, Check, CheckCheck, ImagePlus, TurkishLira, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { dummyMessagesData } from "../assets/assets";
import { useAuth } from "@clerk/react";
import api from "../api/axois";
import { addMessage, fetchMessages, resetMessage, setMessage } from "../features/messages/messagesSlice";
import { div } from "three/src/nodes/math/OperatorNode.js";
import ShowProfile from "../components/ShowProfile";

const ChatBox = () => {
  const { userId } = useParams();
const [user, setUser] = useState(null)
  const connections=useSelector((state)=>state.connections.connections)
    const currentUser = useSelector((state) => state.user.value);
    const [load, setLoad] = useState(false)

  const [loading] = useState(false);
const message = useRef(null);
const show=useRef(null)
  const [image, setImage] = useState(null)
  const [showProfile,setShowProfile]=useState(false)
  const [imageUrl, setImageUrl] = useState(null)
const [viewImage, setViewImage] = useState(null)

  const bottomRef = useRef(null);
  const handleChangeImage=(e)=>{
    const file=e.target.files[0];
    if(file)
    {
      setImage(file);
      setImageUrl(URL.createObjectURL(file))
    }

  }
  const fetchUserMessges=async()=>{
    try{
      const token=await getToken();
      dispatch(fetchMessages({token,userId}))

    }
    catch(error)
    {

    }
  }
  const messages=useSelector((state)=>state.messages.messages)
const {getToken}=useAuth();
const dispatch=useDispatch()

useEffect(() => {
  if (connections.length > 0) {
    const foundUser = connections.find(
      (connection) => connection._id == userId
    );

    if (foundUser) {
      setUser(foundUser);
    }
  }
}, [connections, userId]);

  const handleSend = async()=>{
    if(!message.current.value.trim() && !image) return;
    setLoad(true)
const token=await getToken();
const formData=new FormData();
formData.append('to_user_id',userId);
formData.append('text',message.current.value);
console.log(image)
image && formData.append('image',image)
try{
const {data}=await  api.post('/api/message/send',formData,{
  headers:{
    Authorization:`Bearer ${token}`
  }
})
if(data.success)
{
message.current.value=""
  setImage(null);
  dispatch(addMessage(data.message));
  console.log("Date is ",data)


}
else{
  throw new Error(data.message)
}
}
catch(err)
{
  toast.error(err.message)
}
finally{
  setMessage(null);
  setImageUrl(null);
  setImage(null)
  setLoad(false)
}

  }
  useEffect(()=>{
   
fetchUserMessges();
return ()=>{
  dispatch(resetMessage())
}
  },[userId])
  useEffect(() => {
  requestAnimationFrame(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  });
}, [messages]);

  if(loading ) return <Loading/>;


  return    user && 
    <div className="h-dvh flex flex-col dark:bg-gray-800 ">

      <header className="sticky top-0 z-20 dark:bg-gray-900 dark:text-white dark:border-gray-700 bg-white/80 backdrop-blur border-b border-gray-200 px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={user.profile_picture} className="w-11 h-11 rounded-full object-cover" alt="" />
          <div>
            <div className="flex items-center gap-1 font-semibold">
              {user.full_name}
              {user.is_verified && <BadgeCheck size={16} className="fill-blue-600 text-white"/>}
            </div>
            <p className="text-xs text-green-600">● Active now</p>
          </div>
        </div>
      </header>

   <div className="flex-1 overflow-y-auto min-h-0 px-4 py-5 space-y-4">
        {messages.map((item,index)=>{

const isMine = item.from_user_id === currentUser._id;
          return (
            <div key={index} className={`flex ${isMine?"justify-end":"justify-start"}`}>
              {!isMine && (
                <img
                  src={user.profile_picture}
                  className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                  alt=""
                />
              )}

              <div className={`max-w-[72%] shadow
                ${isMine
                  ? "bg-indigo-600 text-white rounded-3xl rounded-br-md"
                  : "bg-white border border-gray-200 text-gray-900 rounded-3xl rounded-bl-md"
                }`}>

                {item.message_type==="image" ? (
                  <>
                    <img
                    onClick={()=>{
                setShowProfile(true)
             setViewImage(item.media_url)
                    }}
                      src={item.media_url}
                      alt=""
                      className="w-72 cursor-pointer h-72 rounded-t-3xl object-cover"
                    />
                    <div className="px-3 py-2 flex justify-end items-center gap-1">
                      <span className={`text-xs ${isMine?"text-indigo-100":"text-gray-500"}`}>
                        {new Date(item.createdAt).toLocaleTimeString([],{
                          hour:"2-digit",
                          minute:"2-digit"
                        })}
                      </span>

                      {isMine && (
                        item.seen
                          ? <CheckCheck size={14} className="text-cyan-300"/>
                          : <Check size={14} className="text-indigo-100"/>
                      )}
                    </div>
                  </>
                ):(
                  <div className="px-4 py-3">
                    <p className="break-words">{item.text}</p>

                    <div className="flex justify-end items-center gap-1 mt-2">
                      <span className={`text-xs ${isMine?"text-indigo-100":"text-gray-500"}`}>
                        {new Date(item.createdAt).toLocaleTimeString([],{
                          hour:"2-digit",
                          minute:"2-digit"
                        })}
                      </span>

                      {isMine && (
                        item.seen
                          ? <CheckCheck size={14} className="text-cyan-300"/>
                          : <Check size={14} className="text-indigo-100"/>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )
        })}
        <div className="" ref={bottomRef}></div>
    
      </div>

      <form
        onSubmit={(e)=>{
          e.preventDefault();
          handleSend();
        }}
        className="border-t  dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-200 bg-white p-4 w-full relative"
      >
        {
          imageUrl && <div className="w-30 h-30 relative ">

<X onClick={()=>{
  setImage(null);
  setImageUrl(null)
}} className="absolute top-0 right-0 rounded-full w-5 h-5 text-white bg-gray-700 cursor-pointer"/>
            <img className="w-full h-full object-cover" src={imageUrl} alt="" />
          </div>
        }
        <div className="flex items-center   gap-3 ">
     <label className="cursor-pointer relative    flex justify-center items-center">
   <input onChange={(e)=>{
    handleChangeImage(e);
   }}
            type="file"
            accept="image/*"
            className=" w-full hidden h-full rounded-full hover:bg-gray-100  z-10 justify-center items-center "/>
          
            <ImagePlus className=" inset-0"/>
        
     </label>
       

          <input

         ref={message}
            placeholder="Type a message..."
            className="flex-1  rounded-full border border-gray-300 px-5 max-sm:px-2 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button disabled={load}
            className={`w-12 h-12  max-sm:w-10 max-sm:h-10 rounded-full max-sm:rounded-lg cursor-pointer ${load && 'opacity-50 cursor-not-allowed'} bg-indigo-600 hover:bg-indigo-700 transition text-white flex  justify-center items-center`}
          >
            <ArrowUp />
          </button>
        </div>
      </form>
{
  showProfile &&    <div className='bg-black/80 backdrop-blur-lg w-full h-screen  fixed left-0 top-0 z-200  items-center flex flex-col gap-2 justify-center overflow-auto'>
  

      
<img className=' w-130  max-sm:w-full
  object-cover'  src={viewImage} alt="" />

<button onClick={()=>{
  setShowProfile(false)
  setViewImage(null)
}} className=' cursor-pointer hover:scale-95 duration-300 transition-all  shadow bg-red-600 px-4 py-1 rounded-md text-white'>Close</button>

    </div>

}

    </div>
    
  


};

export default ChatBox;
