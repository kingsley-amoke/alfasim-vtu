"use client";

import Image from "next/image";
import React from "react";

const ConfirmPayment = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Thank you for your donation!
        </h2>
        <p className="text-gray-600 mb-4">
          Your generous contribution of ${20} will make a significant impact.
        </p>
        <Image
          className="w-full h-auto rounded"
          src="https://media.istockphoto.com/id/1183770076/vector/thank-you-hand-lettering-for-holiday-thanksgiving-day.jpg?s=612x612&w=0&k=20&c=DT8uCFB7E9lqvmyHMKa0H8dthWzprr8xGcF5GWoLdAM="
          alt="Success Image"
        />
        <p className="text-gray-600 mt-4">
          We appreciate your support in making a positive difference.
        </p>
      </div>
    </div>
  );
};

export default ConfirmPayment;
