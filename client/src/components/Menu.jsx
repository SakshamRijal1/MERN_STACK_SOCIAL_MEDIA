import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router'

const Menu = ({setSideBarOpen}) => {

  return (
    <div className='px-6 text-gray-600 space-y-1 font-medium'>
      {
        menuItemsData.map(({to,label,Icon,isNew})=>(
   
          <NavLink key={to} to={to} end={to ==='/'} onClick={()=>{
            setSideBarOpen(false)
          } } className={({isActive})=>`px-3.5 py-2 flex items-center gap-3 rounded-xl ${isActive?'bg-indigo-50 dark:bg-gray-300 text-indigo-700 ':'hover:bg-gray-50 dark:hover:bg-gray-800 dark:opacity-80'}`}>
          <Icon className={'w-5 h-5'}/>
          {label}
{isNew &&<span className="rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
  New
</span>}
          </NavLink>
        
        ))
      }
    </div>
  )
}

export default Menu
