import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {
  BadgeCheck,
  ChevronRight,
  MessageCircleX,
} from "lucide-react";

const Messages = () => {
  const navigate = useNavigate();
  const { connections } = useSelector((state) => state.connections);

  return (
    <div className="max-w-full mx-auto p-4 md:p-8">
 <h1 className='text-2xl font-bold dark:text-white'>Messages</h1>
  <p className=' text-gray-500 dark:text-gray-400 mt-4'>Select a conversation to start chatting.</p>

      {/* <p className="text-gray-500 dark:text-gray-400 mt-2">
        Select a conversation to start chatting.
      </p> */}

      <div className="mt-8 rounded-2xl bg-white dark:bg-gray-900 shadow overflow-hidden">
        {connections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
              <MessageCircleX
                className="text-indigo-600"
                size={40}
              />
            </div>

            <h2 className="mt-6 text-2xl font-semibold dark:text-white">
              No conversations yet
            </h2>

            <p className="mt-3 text-gray-500 max-w-md">
              Connect with people first. Once you have connections,
              they'll appear here and you'll be able to chat instantly.
            </p>

            <button
              onClick={() => navigate("/discover")}
              className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-xl"
            >
              Discover People
            </button>
          </div>
        ) : (
          connections.map((user) => (
            <button
              key={user?._id}
              onClick={() => navigate(`/messages/${user?._id}`)}
              className="w-full flex items-center justify-between px-5 py-4 dark border-b border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user?.profile_picture}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <h2 className="font-semibold dark:text-white">
                      {user?.full_name}
                    </h2>

                    {user?.is_verified && (
                      <BadgeCheck
                        size={16}
                        className="fill-blue-600 text-white"
                      />
                    )}
                  </div>

                  <p className="text-sm text-gray-500">
                    @{user?.username}
                  </p>

                  <p className="text-sm text-gray-400 truncate max-w-xs">
                    {user?.bio || "Start a conversation..."}
                  </p>
                </div>
              </div>

              <ChevronRight
                className="text-gray-400"
                size={22}
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Messages;