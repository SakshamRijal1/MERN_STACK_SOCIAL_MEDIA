import React from 'react'

const ConntectionState = ({number,parameter}) => {
  return (
    <div className='w-40 h-20 dark:bg-gray-900 dark:text-white   max-sm:w-full shadow flex flex-col rounded-lg justify-center items-center gap-2'>
      <h1 className='font-bold'>{number}</h1>
      <p className='text-gray-600 font-medium '>{parameter}</p>
    </div>
  )
}

export default ConntectionState
