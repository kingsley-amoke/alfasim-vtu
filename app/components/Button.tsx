"use client";

import { buttonTypes } from "@/lib/types";
import Link from "next/link";
import React from "react";

const Button = ({ links = "", action, children, ...props }: buttonTypes) => {
  return (
    <>
      <Link href={links}>
        <button
          className="dark:border-white dark:bg-black dark:text-white hover:bg-teal-800 py-2 px-6 hover:text-white bg-white border hover:border-white border-teal-800 text-teal-800 rounded-md"
          onClick={() => {
            action;
          }}
        >
          {children}
        </button>
      </Link>
    </>
  );
};

export default Button;
