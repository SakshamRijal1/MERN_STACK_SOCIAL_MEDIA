import { useAuth } from '@clerk/react';
import React from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router'
import api from '../api/axois';

const Hashtag = () => {
  const {input}=useParams();
  const {getToken}=useAuth()
  useEffect(()=>{
    const fetchData=async()=>{
    const token=await getToken()
    try{
  const {data}=await api.post('/api/post/hastag',{
    input
  },{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  if(data.success)
  {
    console.log(data)
  }
    }
    catch(err)
    {
      toast.error('Something went wrong');
      return;
    }
    }
  })
  return (
    <div>
      i am {input}
    </div>
  )
}

export default Hashtag
