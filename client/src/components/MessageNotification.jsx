import React from "react";
import { MessageCircle, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageNotification = ({ t, message, navigate }) => {
  console.log("Message is ",message)
  return (
    <div className="w-[380px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">

      {/* Top Accent */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-indigo-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
              New Message
            </span>
          </div>

          <button
            onClick={() => toast.dismiss(t._id)}
            className="rounded-full p-1 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="h-4 w-4 text-zinc-500" />
          </button>
        </div>

        {/* User */}
        <div className="mt-4 flex items-center gap-3">
          <div className="relative">
            <img
              src={message?.from_user_id?.profile_picture}
              alt=""
              className="h-14 w-14 rounded-full object-cover ring-2 ring-indigo-500/30"
            />

            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-zinc-900" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-white">
              {message?.from_user_id?.full_name}
            </h3>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              sent you a message
            </p>
          </div>
        </div>

        {/* Message Bubble */}
        <div className="mt-4 rounded-xl bg-zinc-100 p-3 dark:bg-zinc-800">
          <p className="line-clamp-2 text-sm text-zinc-700 dark:text-zinc-300">
            {message.text || "📷 Sent an image"}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => toast.dismiss(t._id)}
            className="flex-1 rounded-xl border border-zinc-300 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Later
          </button>

          <button
            onClick={() => {
              navigate(`/messages/${message.from_user_id._id}`);
              toast.dismiss(t._id);
            }}
            className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-2.5 text-sm font-semibold text-white shadow-lg transition duration-200 hover:scale-[1.03] hover:shadow-indigo-500/30 active:scale-95"
          >
            Open Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageNotification;