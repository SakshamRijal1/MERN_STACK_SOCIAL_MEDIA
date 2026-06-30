
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { ArrowUp, AwardIcon, BadgeCheck, Check, CheckCheck, ImagePlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { dummyMessagesData } from "../assets/assets";
import { useAuth } from "@clerk/react";
import api from "../api/axois";
import { addMessage, fetchMessages, resetMessage } from "../features/messages/messagesSlice";

const ChatBox = () => {
  const { userId } = useParams();
const [user, setUser] = useState(null)
  const connections=useSelector((state)=>state.connections.connections)
    const currentUser = useSelector((state) => state.user.value);

  const [loading] = useState(false);
const message = useRef(null);
const show=useRef(null)
  const [image, setImage] = useState(null)
  const bottomRef = useRef(null);
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
    if(!message.current.value.trim()) return;
const token=await getToken();
const formData=new FormData();
formData.append('to_user_id',userId);
formData.append('text',message.current.value);
image && formData.append('image',image)

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
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-violet-100">

      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200 px-5 h-16 flex items-center justify-between">
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
                      src={item.media_url}
                      alt=""
                      className="w-72 h-72 rounded-t-3xl object-cover"
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
        className="border-t border-gray-200 bg-white p-4"
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="w-11 h-11 rounded-full hover:bg-gray-100 flex justify-center items-center"
          >
            <ImagePlus/>
          </button>

          <input

         ref={message}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-300 px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 transition text-white flex justify-center items-center"
          >
            <ArrowUp size={20}/>
          </button>
        </div>
      </form>

    </div>
  


};

export default ChatBox;
