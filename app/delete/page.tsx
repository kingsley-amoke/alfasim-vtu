import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="px-10 py-8">
        <h1 className="text-3xl font-bold">How to Delete Your Data</h1>
        <p>
          If you wish to delete your data, you can do so by following the steps
          below:
        </p>
        <h2>Automated Method</h2>
        <p>Click the link below to send an automated data deletion request:</p>
        <p>
          <a href="mailto:alfasimdata@gmail.com">Send Data Deletion Request</a>
        </p>
        <h2 className="py-10 text-2xl font-semibold">Manual Method</h2>{" "}
        <p>Follow these steps to delete your data manually:</p>
        <ul>
          <li>Step 1: Log in to your email.</li>
          <li>
            Step 2: Create a new mail with recepient
            "**alfasimdata@gmail.com**".
          </li>
          <li>Step 3: Set email title to "Data deletion request".</li>
        </ul>
      </div>
    </div>
  );
};

export default page;
