import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Moon,
  Sparkles,
  Sun,
  Palette,
  Rocket,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { distance } from "three/src/nodes/math/MathNode.js";
import { setTheme } from "../features/theme/themeSlice.js";
import { div } from "three/src/nodes/math/OperatorNode.js";
import { useAuth } from "@clerk/react";
import api from "../api/axois.js";

import toast from "react-hot-toast";
import { fetchUser } from "../features/user/userSlice.js";


 

const Setting = () => {
   const {getToken}=useAuth()
  const theme=useSelector((state)=>state.theme.value)
  const user=useSelector((state)=>state.user.value)
  const  dispatch=useDispatch()
  const accountAge=(Date.now()-new Date(user?.createdAt))/(1000*60*60*25)




  const verificationRequirements = [
  {
    title: "Verified Email",
    completed: !!user?.email,
    message:`${user?.email} verified`
  },
  {
    title: "Profile Picture Added",
    completed: !!user?.profile_picture,
    message:user?.profile_picture? "Profile Picture added" :"Profile Picture not added"
  },
  {
    title: "Unique Username",
    completed: !!user?.username,
    message:`${user?.username} is verified`
  },
  {
    title: "100+ Followers",
    completed: user?.followers.length >= 100,
    message:`${user?.followers.length} followers completed`
  },
  {
    title: "Account Age 30+ Days",
    completed: accountAge >= 30,
        message:`${Math.floor(accountAge)} days completed`
  },
];
const completed =verificationRequirements.filter((item) => item.completed).length;
const progress=(completed/5)*100;

  const handleVerified=async()=>{
const token=await getToken();
if(verificationRequirements.filter((item)=>item.completed).length==5)
{
const {data}=await api.get('/api/user/verify',{
  headers:{
    Authorization:`Bearer ${token}`
  }
})
if(data.success)
{
  toast.success(`User ${user.full_name} verified successfully. `)
  dispatch(fetchUser(token))
}
else{
  toast.error(data.message)
}
}
else{
  toast('You cannot be verified with this status.')
}

}


  return (
    <div className="max-w-5xl mx-auto transition-all  ease-in-out duration-300 p-6 space-y-8">

      {/* Header */}
      <div className="transition-all  ease-in-out duration-300">
        <h1 className="text-3xl font-bold dark:text-white">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Personalize your experience and explore the latest features of
          SakshaMedia.
        </p>
      </div>

      {/* What's New */}

      <section className="rounded-3xl bg-white dark:bg-slate-900 dark:border dark:border-slate-700 transition-all  ease-in-out duration-300 shadow p-6">

        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="text-indigo-600" />
          <h2 className="text-2xl font-semibold dark:text-white">
            What's New
          </h2>
        </div>

        <div className="grid md:grid-cols-2 transition-all  ease-in-out duration-300 gap-5">

          <div className="rounded-xl dark:border dark:border-slate-700 p-5">
            <BadgeCheck className="text-blue-600 mb-3" />
            <h3 className="font-semibold dark:text-white">
              Verification Badge
            </h3>

            <p className="text-gray-500 mt-2 text-sm">
              Eligible creators can now apply for the official verification
              badge.
            </p>
          </div>

          <div className="rounded-xl dark:border dark:border-slate-700 p-5">
            <Moon className="text-slate-700 dark:text-white mb-3" />
            <h3 className="font-semibold dark:text-white">
              Dark & Light Mode
            </h3>

            <p className="text-gray-500 mt-2 text-sm">
              Switch between beautiful light and dark themes anytime.
            </p>
          </div>

        </div>
      </section>

      {/* Verification */}

      <section className="rounded-3xl bg-white dark:bg-slate-900 dakr:border dark:border-slate-700 shadow p-6">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-semibold dark:text-white flex items-center gap-2">
              <BadgeCheck className="text-blue-600" />
              Verification Badge
            </h2>

            <p className="text-gray-500 mt-1">
              Complete all requirements before submitting your application.
            </p>
          </div>

        {
!user?.is_verified &&
          <span className="rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-sm flex items-center gap-1">
            <Clock3 size={16} />
            In Progress
          </span>
}
      {
user?.is_verified &&
          <span className="rounded-full bg-green-100 text-yellow-700 px-3 py-1 text-sm flex items-center gap-1">
            <Clock3 size={16} />
           Completed
          </span>
}
        </div>

        {/* Progress */}
{ !user?.is_verified &&
      <div className="mt-6">

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">
              Verification Progress
            </span>

            <span className="font-semibold text-green-600">
 {
  (verificationRequirements.filter((item)=>item.completed)).length
 }/5
            </span>
          </div>

          <div className="h-3 rounded-full bg-gray-200 overflow-hidden">

            <div style={{'width':`${progress}%`}} className={` h-full bg-indigo-600 rounded-full`}></div>

          </div>

        </div>
}
{
  user?.is_verified &&
   <div className="mt-6">

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">
              Verification Progress
            </span>

            <span className="font-semibold text-green-600">
              5 / 5 Completed
            </span>
          </div>

          <div className="h-3 rounded-full bg-gray-200 overflow-hidden">

            <div className="w-[100%] h-full bg-indigo-600 rounded-full"></div>

          </div>

        </div>
}

        {/* Criteria */}

     {
<>
       <div className="mt-8 grid dark:text-white md:grid-cols-2 gap-4">


{
!user?.is_verified &&

  verificationRequirements.map((item,index)=>(
    <div className="flex items-center gap-3">
         
         {   item.completed &&
          <CheckCircle2 className="text-green-600" />
         }
            {   !item.completed &&
          <Clock3 className="text-yellow-500" />
         }
          
          

            <div>{item.title}<span className="text-gray-500"> ({item.message}) </span></div>
          
        
       
          </div>

  ))
}
      

        

        </div>

        
        {
          !user?.is_verified &&
          <button onClick={()=>{
          handleVerified()
        }} disabled={verificationRequirements.filter((item)=>item.completed).length<5} className={`mt-8  ${verificationRequirements.filter((item)=>item.completed).length<5 ?"cursor-not-allowed bg-gray-500 " :"cursor-pointer bg-indigo-600 hover:bg-indigo-700"}  transition px-6 py-3 rounded-xl text-white font-medium`}>
          Apply for Verification
        </button>
}
        </>
}
{
   user?.is_verified &&   <div className=" md:grid-cols-2 text-center text-green-600  ">
   You are  verified.

   </div>
}

      </section>

      {/* Theme */}

      <section className="rounded-3xl bg-white dark:bg-slate-900 dark:border dark:border-slate-700 shadow p-6">

        <h2 className="text-2xl font-semibold dark:text-white flex items-center gap-2">

          <Palette className="text-indigo-600" />

          Appearance

        </h2>

        <p className="text-gray-500 mt-2">
          Choose the appearance that feels best for you.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <button onClick={()=>{
    
            dispatch(setTheme("light"))
          }} className={`rounded-2xl  ${theme==="light"? 'border-indigo-600 border-2':'border border-white' }  cursor-pointer hover:scale-95 duration-300  p-6 hover:shadow transition`}>

            <Sun className="mx-auto text-yellow-500" size={35} />

            <h3 className="mt-3 font-semibold dark:text-white">
              Dark Mode
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Bright and clean appearance.
            </p>

          </button>

          <button onClick={()=>{
            dispatch(setTheme("dark"))
          }}  className={`rounded-2xl ${theme=="dark" && 'border-indigo-600 border-2'} border hover:scale-95  duration-300 cursor-pointer p-6 hover:shadow transition`}>

            <Moon className="mx-auto text-slate-700" size={35} />

            <h3 className="mt-3 font-semibold dark:text-white">
              Dark Mode
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Comfortable viewing in low-light environments.
            </p>

          </button>

        </div>

      </section>


    </div>
  );
};

export default Setting

