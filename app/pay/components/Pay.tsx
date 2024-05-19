"use client";

import { paystackPay } from "@/lib/data";
import { userDataTypes } from "@/lib/types";
import React, { useState } from "react";

export default function Pay({ user }: { user: userDataTypes }) {
  const [amount, setAmount] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const email = user.email!;

  const handleDonate = async (): Promise<void> => {
    setSubmitting(true);
    const paystackResponse = await paystackPay({
      amount: amount,
      email: email,
      currency: "NGN",
      callback_url: "http://localhost:3000/pay/confirm-payment",
      channels: ["bank_transfer", "card", "ussd", "bank"],
    });
    setSubmitting(false);
    console.log(paystackResponse);
    if (paystackResponse.status === true) {
      window.location.href = paystackResponse.data.authorization_url; //extract the redirection and user it for redirecting the donor to the unique page generated for them to make payment
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Access the value from the event
    const value: number = parseInt(e.target.value, 10);
    setAmount(value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-xl p-6 border border-teal-800 dark:border-white rounded-lg shadow-md flex">
        <div className="w-1/2 pr-6">
          <img className="w-full h-auto rounded" src="/logo.jpg" alt="logo" />
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Recharge your wallet</h2>
          <p className=" mb-4">
            Enter the amount you want to fund your wallet with below. <br />{" "}
            <p className="font-bold">
              Note: All payments are processed by paystack.
            </p>
          </p>
          <div className="mb-4">
            <label
              htmlFor="donationAmount"
              className="block text-sm font-medium"
            >
              Recharge Amount
            </label>
            <input
              id="donationAmount"
              name="donationAmount"
              onChange={handleInputChange}
              type="number"
              className="mt-1 p-3 border border-gray-300 rounded w-full"
              placeholder="Enter amount to recharge"
            />
          </div>
          <button
            disabled={submitting}
            onClick={handleDonate}
            className="w-full p-3  border border-teal-800 dark:border-white hover:text-white rounded hover:bg-teal-800"
          >
            {submitting ? "Please wait ..." : "Recharge Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
