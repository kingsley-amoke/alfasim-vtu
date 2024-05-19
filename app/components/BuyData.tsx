"use client";

import React, { useState } from "react";

import { Plan, PlanType, dataPlanTypes, planTypes } from "@/lib/types";
import { buyData, getDataPlans } from "@/lib/data";

const BuyData = ({ plans }: { plans: dataPlanTypes }) => {
  const [currentNetwork, setCurrentNetwork] = useState("");
  const [dataType, setDataType] = useState(["-----"]);
  const [dataPlan, setDataPlan] = useState<Plan[]>([
    {
      dataplan_id: "",
      plan: "",
      plan_amount: "",
    },
  ]);

  //all networks

  const networks = [
    { name: "MTN", id: 1 },
    { name: "Glo", id: 2 },
    { name: "9mobile", id: 3 },
    { name: "Airtel", id: 4 },
  ];

  //Data types

  const mtnDataTypes = [
    "SME",
    "SME2",
    "GIFTING",
    "CORPORATE GIFTING",
    "CORPORATE GIFTING2",
    "DATA COUPONS",
  ];
  const gloDataTypes = ["GIFTING", "CORPORATE GIFTING"];
  const etisalatDataTypes = ["GIFTING", "CORPORATE GIFTING"];
  const airtelDataTypes = ["GIFTING", "CORPORATE GIFTING"];

  //all data plans
  const mtnPlans = plans.MTN_PLAN;
  const gloPlans = plans.GLO_PLAN;
  const etisalatPlans = plans["9MOBILE_PLAN"];
  const airtelPlans = plans.AIRTEL_PLAN;

  //mtn plans by type

  const mtnSME = mtnPlans.filter((plan) => plan.plan_type === "SME");
  const mtnSME2 = mtnPlans.filter((plan) => plan.plan_type === "SME2");
  const mtnGifting = mtnPlans.filter((plan) => plan.plan_type === "GIFTING");
  const mtnCorporateGifting = mtnPlans.filter(
    (plan) => plan.plan_type === "CORPORATE GIFTING"
  );
  const mtnCorporateGifting2 = mtnPlans.filter(
    (plan) => plan.plan_type === "CORPORATE GIFTING2"
  );
  const mtnDataCoupons = mtnPlans.filter(
    (plan) => plan.plan_type === "DATA COUPONS"
  );

  //glo plans by type

  const gloGifting = gloPlans.filter((plan) => plan.plan_type === "GIFTING");
  const gloCorporateGifting = gloPlans.filter(
    (plan) => plan.plan_type === "CORPORATE GIFTING"
  );

  //etisalat plans by type

  const etisalatGifting = etisalatPlans.filter(
    (plan) => plan.plan_type === "GIFTING"
  );
  const etisalatCorporateGifting = etisalatPlans.filter(
    (plan) => plan.plan_type === "CORPORATE GIFTING"
  );

  //airtel plans by type

  const airtelGifting = airtelPlans.filter(
    (plan) => plan.plan_type === "GIFTING"
  );
  const airterlCorporateGifting = airtelPlans.filter(
    (plan) => plan.plan_type === "CORPORATE GIFTING"
  );

  const networkStyle =
    "w-full md:w-1/3 p-2 flex justify-between items-center border border-teal-800 text-sm bg-white";

  const inputStyle =
    "outline-none border border-teal-800 p-2 rounded-sm w-full";

  const handleNetworkSelect = (value: string) => {
    switch (value) {
      case "1":
        setCurrentNetwork("MTN");
        setDataType(mtnDataTypes);
        break;
      case "2":
        setCurrentNetwork("Glo");
        setDataType(gloDataTypes);
        break;
      case "3":
        setCurrentNetwork("etisalat");
        setDataType(etisalatDataTypes);
        break;
      case "4":
        setCurrentNetwork("Airtel");
        setDataType(airtelDataTypes);
        break;
    }
  };
  const handleDataTypeSelect = (value: string) => {
    switch (value) {
      case "SME":
        setDataPlan(mtnSME);
        break;
      case "SME2":
        setDataPlan(mtnSME2);
        break;
      case "GIFTING":
        switch (currentNetwork) {
          case "MTN":
            setDataPlan(mtnGifting);
            break;
          case "Glo":
            setDataPlan(gloGifting);
            break;
          case "etisalat":
            setDataPlan(etisalatGifting);
            break;
          case "Airtel":
            setDataPlan(airtelGifting);
            break;
        }
        break;
      case "CORPORATE GIFTING":
        switch (currentNetwork) {
          case "MTN":
            setDataPlan(mtnCorporateGifting);
            break;
          case "Glo":
            setDataPlan(gloCorporateGifting);
            break;
          case "etisalat":
            setDataPlan(etisalatCorporateGifting);
            break;
          case "Airtel":
            setDataPlan(airterlCorporateGifting);
            break;
        }
      case "DATA COUPONS":
        setDataPlan(mtnDataCoupons);
        break;
    }
  };

  const handleSubmitForm = async (formData: FormData) => {
    let network_id = formData.get("network")!;

    let dataPlan = formData.get("data-plan")!;

    let phoneNumber = formData.get("phonenumber")!;

    network_id = network_id?.toString();
    dataPlan = dataPlan?.toString();

    const dataInfo = {
      network_id: parseInt(network_id),
      plan: parseInt(dataPlan),
      mobile_number: phoneNumber.toString(),
      Ported_number: true,
    };

    const response = await buyData(dataInfo);
    console.log(response);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-[40%] border bg-teal-800 dark:bg-black dark:text-black p-10 flex flex-col gap-2 border-gray-200 my-6">
        <div className="w-1/2 md:w-1/5 border border-teal-800 py-2 md:py-5 px-5 md:px-10 mt-[-4rem] md:mt-[-4.5rem] bg-gray-200  rounded-md absolute left-[50%] -translate-x-[50%] text-center">
          Buy Data
        </div>
        <div className={networkStyle}>
          <p>*461*4#</p>
          <p>MTN SME</p>
        </div>
        <div className={networkStyle}>
          <p>*131*4#</p>
          <p>MTN Gifting</p>
        </div>
        <div className={networkStyle}>
          <p>*228#</p>
          <p>9mobile</p>
        </div>
        <div className={networkStyle}>
          <p>*140#</p>
          <p>Airtel</p>
        </div>
        <div className={networkStyle}>
          <p>*323#</p>
          <p>Glo</p>
        </div>
      </div>
      <form
        action={handleSubmitForm}
        className="w-full md:w-[90%] border border-teal-800 dark:border-white dark:bg-black flex flex-col gap-2 p-5 bg-gray-200"
      >
        <label htmlFor="network">Network*</label>
        <select
          name="network"
          id="network"
          className={inputStyle}
          onChange={(e) => handleNetworkSelect(e.target.value)}
        >
          <option value="default">-----</option>
          {networks.map((network) => (
            <option value={network.id} key={network.id}>
              {network.name}
            </option>
          ))}
        </select>
        <label htmlFor="data-type">Data Type*</label>
        <select
          name="data-type"
          id="data-type"
          className={inputStyle}
          onChange={(e) => handleDataTypeSelect(e.target.value)}
        >
          <option value="default">-----</option>
          {dataType.map((type, index) => (
            <option value={type} key={index}>
              {type}
            </option>
          ))}
        </select>
        <label htmlFor="data-plan">Data Plan*</label>
        <select name="data-plan" id="data-plan" className={inputStyle}>
          <option value="default">-----</option>
          {dataPlan.map((plan) => (
            <option
              value={plan.dataplan_id}
              className="flex items-center justify-between w-full"
              key={plan.id}
            >
              {plan.plan}
              {"       "}
              {plan.plan_type}

              {"       "}
              {parseInt(plan.plan_amount) + 50}
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
        <input
          type="submit"
          value="Buy Data"
          className="hover:bg-teal-800 py-2 px-6 hover:text-white bg-white border hover:border-white border-teal-800 text-teal-800 rounded-md md:w-1/5"
        />
      </form>
    </div>
  );
};

export default BuyData;
