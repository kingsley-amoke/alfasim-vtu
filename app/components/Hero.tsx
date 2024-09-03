"use client";

import Image from "next/image";
import React, { useState } from "react";
import Button from "./Button";
import {
  fetchUserAccount,
  getCustomerAccount,
  postUserAccounts,
} from "@/lib/data";
import { AccountType } from "@/lib/types";

const Hero = () => {
  return (
    <div className="md:h-screen w-full bg-teal-800 dark:bg-black md:flex justify-between items-center md:gap-5 p-10 text-white">
      <div className=" md:w-1/2 flex flex-col md:gap-32 gap-10">
        <h2 className="uppercase font-bold md:text-5xl">
          Welcome to Alfasim Data
        </h2>

        <p className="md:text-2xl">
          We offer the most affordable and cheapest data, airtime, cable
          subscription, electricity subscription, bulk sms. Convert airtime to
          money.
        </p>
      </div>
      <div className=" w-full flex justify-center items-center">
        <Image
          src="/hero.png"
          alt="hero"
          width={400}
          height={400}
          className="md:w-[700px]"
        />
      </div>
      <div className="md:hidden h-full w-full flex flex-col gap-5 mt-5">
        <Button links="login">Login</Button>

        <Button links="register">Register</Button>
      </div>
    </div>
  );
};

export default Hero;
