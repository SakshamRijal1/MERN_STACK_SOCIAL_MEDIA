import { createBrowserRouter, Navigate } from "react-router"

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
import { useEffect, useState } from "react"
import Profile from "./pages/Profile.jsx"
import Loading from "./components/Loading.jsx"
import {Toaster} from 'react-hot-toast'
import Seepost from "./components/Seepost.jsx"
import { useDispatch } from "react-redux"
import { fetchUser } from "./features/user/userSlice.js"
import { fetchConnection } from "./features/connections/connectionSlice.js"

function App() {
const {user,isLoaded}=useUser();

const {getToken}=useAuth();
const dispatch=useDispatch()
useEffect(()=>{
const fetchData=async()=>{

if(user)
  {
    const token=await getToken();
    dispatch(fetchUser(token))
    dispatch(fetchConnection(token))
    
  }

}
  fetchData();
  
},[getToken,dispatch,user])
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
  path:"messages/:id",
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