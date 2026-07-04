import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import {  useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../features/messages/messagesSlice";

import { useUser } from "@clerk/react";
import api from "../api/axois";
import toast from "react-hot-toast";

import MessageNotification from "../components/MessageNotification";
import { ColorSpaceNode } from "three/src/nodes/Nodes.js";

const Layout = () => {
     const {user}= useUser();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messageUser = useSelector((state) => state.user.value);

  const navigate=useNavigate()

  const dispatch = useDispatch();

  const location = useLocation();
  const pathnameRef = useRef(location.pathname);



  useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location.pathname]);


  useEffect(() => {

    if (!messageUser) return;
    

    const eventSource = new EventSource(
      `${import.meta.env.VITE_BASEURL}/api/message/${messageUser._id}`
    );

    eventSource.onmessage = (event) => {
  

      const message = JSON.parse(event.data);
console.log('Notification comes')
      if (pathnameRef.current === `/messages/${message.from_user_id._id}`) {
        dispatch(addMessage(message));
        console.log('Notification enter if block')

        
  
      } else{
        console.log('Notification enter else block')
        toast.custom((t)=>(
               
          <MessageNotification t={t} navigate={navigate} message={message}/>
        ),{position:'bottom-right'})
    



      }
    };

    return () => {
      eventSource.close();
    };
  }, [messageUser, dispatch]);
  if (!user) return <Loading />;
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950">
      <div className="mx-auto flex max-w-[1600px] w-full h-dvh dark:bg-gray-950">

        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main */}
        <main className="flex-1 dark:bg-gray-950 min-h-dvh overflow-x-hidden no-scrollbar">
          <Outlet />
        </main>

        {/* Mobile Menu */}
        {sidebarOpen ? (
          <X
            onClick={() => setSidebarOpen(false)}
            className="fixed top-4 right-4 z-50 h-11 w-11 rounded-xl bg-white p-2 shadow-lg sm:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 right-4 z-50 h-11 w-11 rounded-xl bg-white p-2 shadow-lg sm:hidden cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Layout;