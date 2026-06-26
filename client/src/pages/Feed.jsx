import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";

import api from "../api/axois";

import Stories from "../components/Stories";
import Post from "../components/Post";
import Loading from "../components/Loading";
import Sponsered from "../components/Sponsered";
import RecentMessage from "../components/RecentMessage";

const Feed = () => {
  const { getToken } = useAuth();

  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    try {
      const token = await getToken();

      const { data } = await api.get("/api/post/feed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setFeeds(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 dark:bg-gray-950 ">
      <div className="grid grid-cols-12 gap-6">

        {/* Feed */}
        <div className="col-span-12 xl:col-span-7">

          {/* Stories */}
          <div className="rounded-2xl bg-white dark:bg-gray-900 p-4 shadow-sm ">
            <Stories />
          </div>

          {/* Posts */}
          <div className="mt-6 space-y-6 w-full flex justify-center p-3 items-center flex-col ">
            {feeds.length > 0 ? (
              feeds.map((post) => (
                <Post key={post._id} item={post} />
              ))
            ) : (
              <div className="rounded-2xl  bg-white py-20 text-center shadow-sm">
                <div className="text-6xl">📰</div>

                <h2 className="mt-5 text-2xl font-bold">
                  Your feed is empty
                </h2>

                <p className="mx-auto mt-3 max-w-md text-gray-500">
                  Connect with people and follow creators to
                  start seeing posts in your feed.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className=" max-xl:hidden xl:block xl:col-span-5 ">
          <div className="sticky top-6 space-y-6">

            <div className="rounded-2xl dark:bg-gray-900 dark:text-white  bg-white p-4 shadow-sm">
              <Sponsered />
            </div>

            <div className="rounded-2xl dark:bg-gray-900 dark:text-white  bg-white p-4 shadow-sm">
              <RecentMessage />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;