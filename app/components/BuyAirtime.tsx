"use client";

import { buyAirtime, deductBalance, handleBuyAirtime, setTransaction } from "@/lib/data";
import {
  Plan,
  alertPropsTypes,
  transactionTypes,
  userDataTypes,
} from "@/lib/types";

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

    setLoading(true);

    const airtimeInfo = {
      network: network,
      amount: amount,
      mobile_number: phone,
      Ported_number: true,
      airtime_type: "VTU",
    };

    const response = await buyAirtime(airtimeInfo);

    let networkName = "";

    switch (network) {
      case "1":
        networkName = "MTN";
        break;
      case "2":
        networkName = "Glo";
        break;
      case "3":
        networkName = "9mobile";
        break;
      case "4":
        networkName = "Airtel";
        break;
    }

    if (response.error) {
      toast.error("Network Error, Try again later");
      setLoading(false);

      const data: transactionTypes = {
        email: user?.email,
        amount: amountToPay,
        purpose: "airtime",
        status: "failed",
        transactionId: "failed",
        phone: phone,
        network: networkName,
        planSize: amount,
        previousBalance: user.balance,
        newBalance: user.balance,
      };

      setTransaction(data);
      return;
    }

    if (response.Status === "successful") {
      toast.success("Successfull");
     
      setLoading(false);

      //create a transaction

      const data: transactionTypes = {
        email: user?.email,
        amount: amountToPay,
        purpose: "airtime",
        status: response.Status,
        transactionId: response.ident,
        phone: phone,
        network: networkName,
        planSize: amount,
        previousBalance: user.balance,
        newBalance: (parseInt(user.balance) - parseInt(amountToPay)).toString(),
      };

      handleBuyAirtime(data).then(() =>{

        router.push("/dashboard");
      })
    } else {
      if (response.Status !== "failed") {
        const data: transactionTypes = {
          email: user?.email,
          amount: amountToPay,
          purpose: "airtime",
          status: response.Status,
          transactionId: response.ident,
          phone: phone,
          network: networkName,
          planSize: amount,
          previousBalance: user.balance,
          newBalance: (parseInt(user.balance) - parseInt(amountToPay)).toString(),
        };
        toast.error(response.Status);
        setLoading(false);

        deductBalance(data);
      }

      toast.error(response.Status);
      setLoading(false);

      const data: transactionTypes = {
        email: user?.email,
        amount: amountToPay,
        purpose: "airtime",
        status: response.Status,
        transactionId: response.ident,
        phone: phone,
        network: network,
        planSize: amount,
        previousBalance: user.balance,
        newBalance:
          response.results[0].Status === "failed"
            ? user.balance
            : (parseInt(user.balance) - parseInt(amountToPay)).toString(),
      };

      setTransaction(data);
    }
    setLoading(false);
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
