"use client";

import { buyAirtime } from "@/lib/data";
import { airtimeBodyType, alertPropsTypes, userDataTypes } from "@/lib/types";

import { Button } from "@/lib/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationPopUp from "./ConfirmationPopUp";
import { LoadingSkeleton } from "./Skeleton";
import { boolean } from "zod";

const BuyAirtime = ({ user }: { user: userDataTypes }) => {
  const inputStyle =
    "outline-none border border-teal-800 dark:border-white p-2 rounded-sm w-full";

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState("");
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [amountToPay, setAmountToPay] = useState("");
  // const [network, setNetwork] = useState("");

  const networks = [
    { name: "MTN", id: 1 },
    { name: "Glo", id: 2 },
    { name: "9mobile", id: 3 },
    { name: "Airtel", id: 4 },
  ];

  //calculate discount

  const handleAmount = (value: string) => {
    if (value !== "") {
      const discount = (2 / 100) * parseInt(value);
      let pay = (parseInt(value) - discount).toString();
      setAmount(value);
      setAmountToPay(pay);
    }
  };

  const onCancelSubmit = () => {
    setLoading(false);
  };

  const handleSubmitForm = async () => {
    if (!user || !phone || !amount || !network) return;

    if (parseInt(user?.balance) < parseInt(amountToPay) || !user.balance) {
      toast.error("Insufficient Balance");
      return;
    }

    const airtimeInfo: airtimeBodyType = {
      network: network,
      amount: amount,
      mobile_number: phone,
      price: parseInt(amountToPay),
      email: user.email,
    };

    setLoading(true);
    buyAirtime(airtimeInfo)
      .then((data) => {
        if (data.data) {
          toast.success("Successful");
          console.log("result" + data);
        } else if (data.error) {
          toast.error("Something went wrong");
        } else {
          toast.error("Insufficient balance");
        }
      })
      .finally(() => setLoading(false));
  };

  const info: alertPropsTypes = {
    buttonProps: {
      title: "Buy Airtime",
      loading: loading,
    },
    headerProps: {
      title: `Hi ${user?.username}`,
      description: `Are you sure that you want to buy NGN${amount} worth NGN
      ${amountToPay} for ${phone}`,
    },
    onCancel: onCancelSubmit,
    onConfirm: handleSubmitForm,
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen md:ml-10 md:mr-5 pt-9">
      {!loading ? (
        <form className="w-full border border-teal-800 dark:border-white dark:bg-black flex flex-col gap-2 p-5 mt-5 pt-20 bg-gray-200">
          <label htmlFor="network">Network*</label>
          <select
            name="network"
            id="network"
            className={inputStyle}
            onChange={(e) => setNetwork(e.target.value)}
          >
            <option value="default">-----</option>
            {networks.map((network) => (
              <option value={network.id} key={network.id}>
                {network.name}
              </option>
            ))}
          </select>
          <label htmlFor="phonenumber">Phone Number*</label>
          <input
            type="text"
            name="phonenumber"
            placeholder="09030220200"
            className={inputStyle}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="amount">Amount (NGN)*</label>
          <input
            type="text"
            name="amount"
            value={amount}
            placeholder="1000"
            className={inputStyle}
            onChange={(e) => {
              handleAmount(e.target.value);
            }}
          />
          <label htmlFor="amount-to-pay">Amount To Pay*</label>
          <input
            type="text"
            name="amount-to-pay"
            className={inputStyle}
            value={amountToPay}
            disabled
            onChange={(e) => setAmountToPay(e.target.value)}
          />

          <ConfirmationPopUp info={info} />
        </form>
      ) : (
        <div className="h-full w-full flex flex-col gap-5 py-20 p justify-center items-center bg-teal-800/20 dark:bg-black/20 ">
          <p className="font-bold text-3xl px-10">Processing please wait!!</p>
          <LoadingSkeleton />
        </div>
      )}
      <div className="w-1/2 md:w-1/5 border border-teal-800 dark:border-white py-2 md:py-5 px-5 md:px-10  bg-teal-800 dark:bg-black  text-white rounded-md  text-center absolute top-[8.5rem] md:top-[8rem]">
        Buy Airtime
      </div>
    </div>
  );
};

export default BuyAirtime;
