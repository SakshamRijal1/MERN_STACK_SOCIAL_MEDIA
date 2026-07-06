import { createBrowserRouter, Navigate, useLocation } from "react-router"

import { RouterProvider } from "react-router"
import Login from "./pages/Login.jsx"
import Feed from "./pages/Feed.jsx"
import Messages from "./pages/Messages.jsx"
import ChatBox from "./pages/ChatBox.jsx"
import Connections from "./pages/Connections.jsx"
import Discover from "./pages/Discover.jsx"
import CreatePost from "./pages/CreatePost.jsx"
import { useUser ,useAuth} from "@clerk/react"
import Layout from "./pages/Layout.jsx"
import { useEffect, useRef, useState } from "react"
import Profile from "./pages/Profile.jsx"
import Loading from "./components/Loading.jsx"
import {Toaster} from 'react-hot-toast'
import Seepost from "./components/Seepost.jsx"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "./features/user/userSlice.js"
import { fetchConnection } from "./features/connections/connectionSlice.js"
import Setting from "./pages/Setting.jsx"
import { addMessage } from "./features/messages/messagesSlice.js"
import NotFound from "./components/NotFound.jsx"
function App() {
const theme = useSelector((state) => state.theme.value);


const {user,isLoaded}=useUser();
useEffect(() => {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme","dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}, [theme]);
const {getToken}=useAuth();


const dispatch=useDispatch()
useEffect(() => {
  if (!user) return;

  let cancelled = false;

  const loadUser = async () => {
    const token = await getToken();

    for (let i = 0; i < 10 && !cancelled; i++) {
      const result = await dispatch(fetchUser(token));

      if (fetchUser.fulfilled.match(result)) {
        dispatch(fetchConnection(token));
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  loadUser();

  return () => {
    cancelled = true;
  };
}, [user, getToken, dispatch]);

if(!isLoaded)
{
  return <Loading/>
}

  


  const router=createBrowserRouter([
{
  path:"/",
  element:!user?<Login/>:<Layout user={user}/>,
  children:[
    {
index:true,
  element:<Feed/>

},
{
  path:'messages',
  element:<Messages/>

},
{
  path:"messages/:userId",
  element:<ChatBox/>
},
{
  path:"connections",
  element:<Connections/>
},
{
  path:"discover",
  element:<Discover/>
},
{
  path:"profile/:id",
  element:<Profile/>
}
,
{
  path:"profile",
  element:<Profile/>
}
,
{
  path:'setting',
  element:<Setting/>
},
{
  path:'*',
  element:<NotFound/>
},

{
  path:"createpost",
  element:<CreatePost/>,
}]
,

},
{
  path:"/seepost/:id",
  element:<Seepost/>
}
,
{
  path:'*',
  element:<NotFound/>
},

  ])



  return (
    <>   
    <Toaster/>
 <RouterProvider router={router}>

         </RouterProvider>

    
    </>
  )
}

export default App