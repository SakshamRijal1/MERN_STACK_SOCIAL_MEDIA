import { useAuth } from "@clerk/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import api from "../api/axois";
import Card from "../components/Card";
import Post from "../components/Post";
import Loading from "../components/Loading";

const Hashtag = () => {
  const { input } = useParams();
  const { getToken } = useAuth();

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const token = await getToken();

        const { data } = await api.post(
          "/api/post/hashtag",
          { input },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.success) {
          setPosts(data.post || []);
          setUsers(data.user || []);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [input]);

  if (loading) return <Loading />;

  if (posts.length === 0 && users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            No Results Found
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            We couldn't find any users or posts for{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              #{input}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl inset-0 text-ellipsis overflow-hidden font-bold text-gray-900 dark:text-white mb-10">
          #{input}
        </h1>

        {users.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-b-gray-500 dark:text-gray-200 mb-5">
              Users
            </h2>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {users.map((user) => (
                <Card key={user._id} item={user} />
              ))}
            </div>
          </>
        )}

        {posts.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-b-gray-500 dark:text-gray-200 mb-5">
              Posts
            </h2>

            <div className="flex flex-col items-center gap-8">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="w-full max-w-2xl"
                >
                  <Post item={post} setFeeds={setPosts} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hashtag;