import { ArrowBigLeft, ArrowLeft, Star, StarIcon, StarsIcon, Text, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
const Storymodel = ({setShowModal,fetchStories}) => {
 const [mode, setMode] = useState("text");
 const [text, setText] = useState("");
 const bgColors=["#4f46e5","#7c3aed","#db2777","#e11d48","#ca8a04","#0d9488"]
 const [background, setBackground] = useState(bgColors[0])
 const [media, setMedia] = useState(null)
 const [previewUrl, setPreviewUrl] = useState(null)
 const handleUploadImage=(e)=>{
  const file=e.target.files?.[0];
 if(file)
 {
  setMedia(file);
  setPreviewUrl(URL.createObjectURL(file));
 }
 }
 const handleStoryAdd=async()=>{

 }
 const notify=()=>{
  toast("Sucessfully added story")
 }
  return (
    <div className='h-screen inset-0 p-2 z-110 fixed  bg-black/80 backdrop-blur flex justify-center items-center'>
   
   <div className=' w-full  max-w-md  '>
    <div className='text-white flex gap-10 text-center  justify-between'>
       <button  onClick={()=>{
        setShowModal(false)
       }} className='text-lg cursor-pointer'> <ArrowLeft/></button>
     <h1 className=''>Create Story</h1>
     <span className='w-10'></span>
     </div>
     <div style={{background:background}} className='mt-5 h-96 w-full flex justify-center items-center rounded-lg '>


     {
      mode=="text" &&
      <textarea onChange={(e)=>{
        setText(e.target.value)
      }} className='w-full max-h-full h-full p-3  resize-none font-extralight text-gray-200 outline-none border-none'
      placeholder="What's on your mind?"></textarea>
      
     }
     {
      mode==="media" &&  previewUrl &&( media?.type.startsWith('image') ?(
        <img className='object-contain max-h-full' src={previewUrl} alt="" />
      ):
      (
        <video className='object-contain max-h-full' src={previewUrl}/>)
      )
     }

     </div>

     <div className='flex gap-3 mt-5'>

      {
        bgColors.map((color)=>(
          <div onClick={()=>{
            setBackground(color)
          }} key={color} className={`w-8 cursor-pointer transition-all duration-100 h-8 rounded-full  ${background==color?"border-2":"border"} border-amber-50`} style={{background:color}}></div>
        ))
      }
     </div>
     <div className='mt-5 grid grid-cols-2 items-center content-center justify-center gap-4'>
      <button onClick={()=>{
        setMode("text");
        setMedia(null);
        setPreviewUrl(null)
      }} className={`${mode=="text"?"bg-gray-200 text text-slate-900":"bg-slate-900  text-gray-200"} py-2  justify-center transition-all duration-200 items-center cursor-pointer flex rounded-lg gap-4`}>
      <Text/>
      Text
      </button>

      <label onClick={()=>{
        setMode("media")
       
      }} className={` ${mode=="media"?"bg-gray-200 transition-all duration-200  text-slate-900":"bg-slate-900 text-gray-200"} py-2 rounded-lg justify-center cursor-pointer items-center flex gap-4`}>
        <input onInput={(e)=>{
          handleUploadImage(e)
        }} accept='image/*,videos/*' className='hidden' type="file" name="" id="" />
        <Upload/>
        Photos/Videos
      </label>
     </div>
<div className='flex justify-center items-center mt-5 '>

  <button onClick={()=>{
  toast.promise(  handleStoryAdd(),{
      loading:"Adding..",
      success:<p>Story added sucessfully</p>,
      error:(e)=><p>{e.message}  </p>


    }
  )}} className='flex bg-indigo-600 w-full justify-center items-center text-white rounded-lg py-2 cursor-pointer gap-2'>
<StarsIcon/>
    Create Story
    </button>
</div>
   </div>
    </div>
  )
}

export default Storymodel
