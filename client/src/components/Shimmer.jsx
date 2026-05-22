import React from 'react'
import { useNavigate } from 'react-router'

const Shimmer = ({link,type}) => {
  const navigate=useNavigate()
  return (
 <div onClick={()=>{
navigate(link)
 }} class="flex flex-col gap-6 max-md:w-full max-w-sm mx-auto relative z-10">
  <button
    class="group relative px-5 max-md:w-full py-3 text-white rounded-md flex justify-center items-center backdrop-blur-xl border-2   bg-linear-to-r from-purple-500 to-pink-500 shadow-2xl   hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer  hover:bg-linear-to-r hover:from-pink-500 hover:to-purple-500 overflow-hidden">
    <div class="absolute  inset-0 bg-gradient-to-r from-transparent via-white  to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
    ></div>

  

{type}
  </button>
</div>

  )
}

export default Shimmer
