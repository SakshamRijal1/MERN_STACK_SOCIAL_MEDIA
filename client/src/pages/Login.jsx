import React from "react";
import { Outlet } from "react-router";
import { assets } from "../assets/assets";
import { Star } from "lucide-react";
import { SignIn } from "@clerk/react";

const Login = () => {
  return (
    <div className="min-h-screen flex   md:flex-row flex-col overflow-hidden block">
      <img
        className="absolute top-0 left-0 w-full h-full -z-10"
        src={assets.bgImage}
        alt=""
      />
 
        <div className="flex flex-col  w-full">
          <div className=" relative flex justify-center items-center lg:block    top-0 left-0 m-20 ">
            <img className="h-10" src={assets.logo} alt="" />
          </div>
          <div className="flex lg:justify-between w-full flex-col lg:flex-row items-center lg:items-start lg:gap-0 gap-20">

         
          <div className="xl:mt-35   mt- ml-20">
            <div className="flex ld gap-6">
              <img
                className="h-8 object-contain"
                src={assets.group_users}
                alt=""
              />
              <div>
                <div className="flex ">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        className="fill-amber-500 text-transparent size-5"
                        key={i}
                      />
                    ))}
                </div>
                <p className="text-blue-500 font-bold text-sm">
                  Used by 12+ users
                </p>
              </div>
            </div>
            <div className="mt-3 ">
              <h1 className="text-4xl font-bold text-blue-800">
                More than just friends truly connect
              </h1>
              <p className="text-blue-900 mt-2 w-70 font-extralight text-lg ">
                connect with global community on SakshaMedia.
              </p>
            </div>
          </div>
          <div className="lg:mr-20">
  <SignIn  />
          </div>
          
             </div>
        </div>
  
    </div>
  );
};

export default Login;
