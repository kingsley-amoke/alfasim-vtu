"use client";

import React from "react";
import Button from "./Button";
import { useRouter, usePathname } from "next/navigation";
import { BiExit } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";

import { loggedInPaths } from "@/lib/shared";
import Notification from "./Notification";
import { ToggleTheme } from "./ToggleTheme";
import DrawerWrapper from "./DrawerWrapper";
import { userDataTypes } from "@/lib/types";

const Navbar = ({ user, count }: { count?: number; user?: userDataTypes }) => {
  const path = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await axios.get("/api/auth/logout");

    router.push("/");
    toast.success("Logged out successfully");
  };

  const handleNotification = async () => {
    router.push("/notifications");
  };

  return (
    <nav className="flex justify-between items-center py-5 px-5 mb-20 md:mb-0 md:px-10 w-full z-10 md:dark:bg-slate-950 fixed top-0 md:relative  md:top-auto dark:bg-black bg-white">
      {loggedInPaths.includes(path) && <DrawerWrapper user={user} />}

      {path == "/" && (
        <>
          <div className="md:hidden flex-1 w-full text-center text-xl font-bold">
            ALFASIM TELECOM
          </div>
          <div className=" hidden w-full md:flex gap-32 justify-between items-center">
            <div className="flex">
              <ul className="flex gap-10">
                <li className="hover:text-teal-800">
                  <a href="#services">Our Services</a>
                </li>
                <li className="hover:text-teal-800">
                  <a href="#pricing">Pricing</a>
                </li>
                <li className="hover:text-teal-800">
                  <a href="#footer">Contact us</a>
                </li>
              </ul>
            </div>

            <div className="hidden md:flex gap-4">
              <ToggleTheme />

              <Button links="login">Login</Button>

              <Button links="register">Register</Button>
            </div>
          </div>
        </>
      )}
      {path == "/register" && (
        <>
          <div className="md:hidden flex-1 w-full text-center text-xl font-bold">
            ALFASIM TELECOM
          </div>
          <div className="hidden md:flex gap-32 justify-between items-center w-full ">
            <div className="hidden md:flex">
              <ul className="flex gap-10">
                <li className="hover:text-teal-800">
                  <a href="#services">Our Services</a>
                </li>
                <li className="hover:text-teal-800">
                  <a href="#pricing">Pricing</a>
                </li>
                <li className="hover:text-teal-800">
                  <a href="#footer">Contact us</a>
                </li>
              </ul>
            </div>
            <div>
              <div className="hidden md:flex gap-4">
                <ToggleTheme />

                <Button links="login">Login</Button>
              </div>
            </div>
          </div>
        </>
      )}
      {path == "/login" && (
        <>
          <div className="md:hidden flex-1 w-full text-center text-xl font-bold">
            ALFASIM TELECOM
          </div>
          <div className="hidden md:flex gap-32 justify-between items-center w-full">
            <div className="hidden md:flex">
              <ul className="flex gap-10">
                <li className="hover:text-teal-800">
                  <a href="#services">Our Services</a>
                </li>
                <li className="hover:text-teal-800">
                  <a href="#pricing">Pricing</a>
                </li>
                <li className="hover:text-teal-800">
                  <a href="#footer">Contact us</a>
                </li>
              </ul>
            </div>
            <div className="hidden md:flex">
              <div className="hidden md:flex gap-4">
                <ToggleTheme />

                <Button links="register">Register</Button>
              </div>
            </div>
          </div>
        </>
      )}
      {loggedInPaths.includes(path) && (
        <div className="flex items-center gap-5">
          <div
            className="hidden md:block rounded-full w-10 h-10 cursor-pointer"
            onClick={handleNotification}
          >
            <Notification count={count} />
          </div>

          <div>
            <ToggleTheme />
          </div>

          <div
            className="bg-red-700 text-white w-8 md:w-12 h-8 md:h-12 rounded-full flex items-center justify-center cursor-pointer"
            onClick={handleLogout}
          >
            <BiExit size={30} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
