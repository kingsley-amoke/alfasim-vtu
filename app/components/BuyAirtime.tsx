"use client";

import { buyAirtime } from "@/lib/data";
import React, { useState } from "react";

const BuyData = () => {
  const inputStyle =
    "outline-none border border-teal-800 dark:border-white p-2 rounded-sm w-full";

  const [amount, setAmount] = useState<string>("");
  const [amountToPay, setAmountToPay] = useState<number>(0);
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
      let pay = parseInt(value) - discount;
      setAmount(value);
      setAmountToPay(pay);
    }
  };

  const handleSubmitForm = async (formData: FormData) => {
    let network = formData.get("network")!;

    let amount = formData.get("amount")!;

    let amountToPay = formData.get("amount-to-pay")!;

    let phoneNumber = formData.get("phonenumber")!;

    const dataInfo = {
      network_id: parseInt(network?.toString()),
      amount: parseInt(amount?.toString()),
      mobile_number: phoneNumber?.toString(),
      Ported_number: true,
      airtime_type: "VTU",
    };

    const response = await buyAirtime(dataInfo);
    console.log(response);
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen ml-10 mr-5">
      <form
        action={handleSubmitForm}
        className="w-full border border-teal-800 dark:border-white dark:bg-black flex flex-col gap-2 p-5 mt-5 pt-20 bg-gray-200"
      >
        <label htmlFor="network">Network*</label>
        <select name="network" id="network" className={inputStyle}>
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
        />

        <input
          type="submit"
          value="Buy Airtime"
          className="hover:bg-teal-800 py-2 px-6 hover:text-white bg-white border hover:border-white border-teal-800 text-teal-800 rounded-md md:w-1/5"
        />
      </form>
      <div className="w-1/2 md:w-1/5 border border-teal-800 dark:border-white py-2 md:py-5 px-5 md:px-10  bg-teal-800 dark:bg-black  text-white rounded-md  text-center absolute top-[8.5rem] md:top-[8rem]">
        Buy Airtime
      </div>
    </div>
  );
};

export default BuyData;
