"use client";

import { alertPropsTypes, userDataTypes } from "@/lib/types";
import React, { useState } from "react";
import ConfirmationPopUp from "./ConfirmationPopUp";

const SubscribeElectricity = ({user}: {user: userDataTypes}) => {
  const providers = ["IBEC", "EEDC"];


  const [meterType, setMeterType] = useState('')
  const [meterNumber, setMeterNumber] = useState('')

  const [amount, setAmount] = useState<string>("");
  const [amountToPay, setAmountToPay] = useState<number>(0);

  const [loading, setLoading] = useState(false)



const meterTypes = [
  {
    id: 1,
    name: 'PREPAID'
  },
  {
    id: 2,
    name: 'POSTPAID'
  }
]

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


  const handleCancel = () => {
    setLoading(false);
  }

  const handleSubmitForm = async () => {


    const dataInfo = {
      disco_name: 'disco',
      MeterType: meterType,
      meter_number: meterNumber,
      amount: amount,
    };

    console.log(dataInfo);
  };

  const info:alertPropsTypes = {
    buttonProps:{
      loading: loading,
      title: 'Validate',

    },
    headerProps: {
      title: `Hi ${user?.username}, Are you sure you want to proceed?`,
      description: 'You will be charged NGN'+ amountToPay.toString() + ' ' + 'for this subscription'
    },
    onCancel:handleCancel,
    onConfirm: handleSubmitForm

  }

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
            <option value="provider" key={provider}>{provider}</option>
          ))}
        </select>
        <label htmlFor="meter-type">Meter Type*</label>
        <select name="meter-type" id="meter-type" className={inputStyle} onChange={(e) => setMeterType(e.target.value)}>
          <option value="default">-----</option>
          {meterTypes.map((type) => (
            <option value={type.id} key={type.id}>{type.name}</option>
          ))}
        </select>

        <label htmlFor="meter-number">Meter Number*</label>
        <input
          type="text"
          name="meter-number"
          placeholder="1234456"
          className={inputStyle}
          onChange={(e) => setMeterNumber(e.target.value)}
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

        <ConfirmationPopUp info={info}/>
      </form>
      <div className="w-1/2 md:w-1/5 border border-teal-800 dark:border-white py-2 md:py-5 px-5 md:px-10 dark:bg-black bg-teal-800 text-white rounded-md  text-center absolute top-[8.5rem] md:top-[8rem]">
        Electricity
      </div>
    </div>
  );
};

export default SubscribeElectricity;
