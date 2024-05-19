import React from "react";

import { fetchOneNotification } from "@/lib/data";

const ReadNotification = async ({ id }: { id: number }) => {
  const response = await fetchOneNotification(id);

  const [notification] = response!;
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="dark:bg-black py-10 md:py-20 w-full text-center">
        {notification.title}
      </h1>
      <div className="w-full md:w-[80%] dark:bg-slate-950 bg-teal-800 min-h-screen ">
        <p className="my-20 mx-2 md:mx-64 dark:bg-black bg-white h-[75%] p-5">
          {notification.message}
        </p>
      </div>
    </div>
  );
};

export default ReadNotification;
