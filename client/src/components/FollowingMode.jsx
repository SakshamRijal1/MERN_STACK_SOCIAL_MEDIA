import React from "react";
import { BadgeCheck, UserRound, X } from "lucide-react";
import { useNavigate } from "react-router";

const FollowModel = ({
  title,
  users,
  setFollowingModel,
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-100 flex justify-center p-5 bg-black/80 backdrop-blur">
      <X
        onClick={() => setFollowingModel(false)}
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-500 text-white p-1 cursor-pointer active:scale-95"
      />

      <div className="bg-white dark:bg-gray-900 dark:text-white max-sm:w-full w-[600px] max-sm:h-full rounded-lg overflow-y-auto no-scrollbar">

        <h1 className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 p-4 text-2xl font-bold">
          {title}
        </h1>

        {users.length === 0 ? (
          <div className="h-[450px] flex flex-col justify-center items-center">

            <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex justify-center items-center">
              <UserRound className="w-12 h-12 text-indigo-500" />
            </div>

            <h2 className="mt-5 text-2xl font-semibold">
              No {title}
            </h2>

            <p className="text-gray-500 mt-2">
              Nothing to show here.
            </p>

          </div>
        ) : (
          <div className="p-3 space-y-2">

            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => 
                  {navigate(`/profile/${user._id}`)

                  setFollowModel(false)
                  }}
                className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">

                  <img
                    src={user.profile_picture}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                  />

                  <div>
                    <div className="flex items-center gap-1">
                      <h2 className="font-semibold">
                        {user.full_name}
                      </h2>

                      {user.is_verified && (
                        <BadgeCheck className="w-5 h-5 fill-blue-500 text-white" />
                      )}
                    </div>

                    <p className="text-sm text-gray-500">
                      @{user.username}
                    </p>
                  </div>
                </div>

                <div className=" rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex justify-center items-center">
       
                     {
   user.following.includes(user._id) ?
   
    <button   onClick={()=>{
      setLoadFollow(true)
       handleUnFollow(user)
     }}
       className={`group  relative cursor-pointer text-sm  w-full  py-2 active:scale-95 ${loadFollow ? "cursor-not-allowed":'cursor-pointer'}     bg-slate-500  text-white active:scale-95 transition-all duration-300   shadow cursor-pointer  rounded-lg`}>
         
     Unfollow
   
   
     </button> :
   
     <button  onClick={()=>{
  
       handleFollow(user)
     
     }}
       className={`group relative cursor-pointer   w-full text-sm  active:scale-95 transition-all duration-300 px-4    py-2 bg-indigo-600 text-white  rounded-lg`}>
     
   
     Follow
   
   
     </button>
     
      
     
   
     
   
   }
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default FollowModel;