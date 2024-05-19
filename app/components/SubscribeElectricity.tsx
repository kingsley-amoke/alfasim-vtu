"use client";

import React, { useState } from "react";

const SubscribeElectricity = () => {
  const providers = ["IBEC", "EEDC"];
  const [amount, setAmount] = useState<string>("");
  const [amountToPay, setAmountToPay] = useState<number>(0);

  //calculate discount

  const handleAmount = (value: string) => {
    if (value !== "") {
      const discount = (2 / 100) * parseInt(value);
      let pay = parseInt(value) - discount;
      setAmount(value);
      setAmountToPay(pay);
    }
  };

  const inputStyle =
    "outline-none border border-teal-800 dark:border-white p-2 rounded-sm w-full";

  const handleSubmitForm = (formData: FormData) => {
    let provider = formData.get("provider");

    let meterType = formData.get("meter-type");

    let meterNumber = formData.get("meter-number");
    let amount = formData.get("amount");
    let amountToPay = formData.get("amount-to-pay");

    const dataInfo = {
      provider: provider,
      meterType: meterType,
      meterNumber: meterNumber,
      amount: amount,
      amountToPay: amountToPay,
    };

    console.log(dataInfo);
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen ml-10 mr-5">
      <form
        action={handleSubmitForm}
        className="w-full border border-teal-800 dark:border-white flex flex-col gap-2 p-5 mt-5 pt-20 bg-gray-200 dark:bg-black"
      >
        <label htmlFor="provider">Provider*</label>
        <select name="provider" id="provider" className={inputStyle}>
          <option value="default">-----</option>
          {providers.map((provider) => (
            <option value="provider">{provider}</option>
          ))}
        </select>
        <label htmlFor="meter-type">Meter Type*</label>
        <select name="provider" id="provider" className={inputStyle}>
          <option value="default">-----</option>
          <option value="prepaid">Prepaid</option>
          <option value="postpaid">Postpaid</option>
        </select>

        <label htmlFor="meter-number">Meter Number*</label>
        <input
          type="text"
          name="meter-number"
          placeholder="1234456"
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
          value="Continue"
          className="hover:bg-teal-800 py-2 px-6 hover:text-white bg-white border hover:border-white border-teal-800 text-teal-800 rounded-md md:w-1/5"
        />
      </form>
      <div className="w-1/2 md:w-1/5 border border-teal-800 dark:border-white py-2 md:py-5 px-5 md:px-10 dark:bg-black bg-teal-800 text-white rounded-md  text-center absolute top-[8.5rem] md:top-[8rem]">
        Electricity
      </div>
    </div>
  );
};

export default SubscribeElectricity;
