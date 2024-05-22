"use client";

import React from "react";
import Button from "./Button";
import { useRouter, usePathname } from "next/navigation";
import { BiExit } from "react-icons/bi";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

import { loggedInPaths } from "@/lib/shared";
import Image from "next/image";
import Notification from "./Notification";
import { ToggleTheme } from "./ToggleTheme";
import DrawerWrapper from "./DrawerWrapper";
import { userDataTypes } from "@/lib/types";

const Navbar = ({ user, count }: { count?: number; user?: userDataTypes }) => {
  const path = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await axios.get("/api/auth/logout");

    if (response.data === "logged out") {
      router.push("/");
      console.log(response.data);
      toast.success("Logged out successfully");
    } else {
      toast.error("An error occurred");
    }
  };

  const handleNotification = async () => {
    router.push("/notifications");
  };

  return (
    <nav className="flex justify-between items-center py-5 px-10 w-full z-10 dark:bg-slate-950">
      {loggedInPaths.includes(path) && <DrawerWrapper user={user} />}
      <div>
        <Link href="/">
        <h2>ALFASIM TELECOM</h2>
        </Link>
      </div>
      {path == "/" && (
        <div className="flex gap-32 items-center">
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
            <div className="flex gap-4">
              <ToggleTheme />

              <Button links="login">Login</Button>

              <Button links="register">Register</Button>
            </div>
          </div>
        </div>
      )}
      {path == "/register" && (
        <div className="flex gap-32 items-center">
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
            <div className="flex gap-4">
              <ToggleTheme />

              <Button links="login">Login</Button>
            </div>
          </div>
        </div>
      )}
      {path == "/login" && (
        <div className="flex gap-32 items-center">
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
            <div className="flex gap-4">
              <ToggleTheme />

              <Button links="register">Register</Button>
            </div>
          </div>
        </div>
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
            className="bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
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
