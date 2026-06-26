import React, { useState } from "react";
import { Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = useSelector((state) => state.user.value);

  if (!user) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950">
      <div className="mx-auto flex max-w-[1600px] w-full h-dvh dark:bg-gray-950">

        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main */}
        <main className="flex-1 dark:bg-gray-950 min-h-dvh overflow-x-hidden no-scrollbar">
          <Outlet />
        </main>

        {/* Mobile Menu */}
        {sidebarOpen ? (
          <X
            onClick={() => setSidebarOpen(false)}
            className="fixed top-4 right-4 z-50 h-11 w-11 rounded-xl bg-white p-2 shadow-lg sm:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 right-4 z-50 h-11 w-11 rounded-xl bg-white p-2 shadow-lg sm:hidden cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Layout;