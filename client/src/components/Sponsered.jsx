import React from 'react'
import sponsered from "../assets/sponsored_img.png"
const Sponsered = () => {
  return (
    <div className='shadow bg-white dark:bg-gray-900 dark:text-white p-3 rounded-lg'>
      <h1 className='font-semibold'>Sponsored</h1>
      <div className='p-2'>
        <img  className='rounded-lg shadow ' src={sponsered} alt="" />
      </div>
      <p className='text-gray-700'>Email marketing</p>
      <p className='text-gray-400 font-light text-sm'>Supercharge your marketing with a powerful,easy-to-use platform built for results.</p>
    </div>
  )
}

export default Sponsered
