import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router'
import { dummyPostsData } from '../assets/assets';
import Loading from '../components/Loading';
import Stories from '../components/Stories';
import Post from '../components/Post';
import Sponsered from '../components/Sponsered';
import RecentMessage from '../components/RecentMessage';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Feed = () => {
  const [feeds,setfeeds]=useState([]);
  const [load, setLoad] = useState(true);
const story=useRef(null)
  const fetchFeeds=async()=>{
    setfeeds(dummyPostsData);
    setLoad(false);
  }

  useEffect(()=>{
fetchFeeds();
  },[])
  return!load ? (
    <div className='h-full w-full   overflow-y-auto no-scrollbar  items-start  xl:gap-8  lg:p-10 grid xl:grid-cols-[2fr_1fr] justify-center  content-center relative '>
<div className='truncate  flex-nowrap max-w-4xl'>
 
 
  <Stories/>
  
    <div className="flex justify-center  px-4 flex-col gap-4">


{

  feeds.map((post,index)=>(
    <Post key={index} item={post}/>
  ))
}
</div>

</div>
<div className='py-10 max-xl:hidden  h-screen  w-96 flex flex-col gap-10 '>
<Sponsered/>
<RecentMessage/>
</div>


    </div>


  ):<Loading/>
}

export default Feed
