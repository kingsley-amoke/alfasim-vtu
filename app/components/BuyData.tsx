"use client";

import React, { useState } from "react";

import { Plan, dataBodyType, dataPlanTypes, userDataTypes } from "@/lib/types";
import { buyData } from "@/lib/data";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/lib/ui/alert-dialog";
import { Button } from "@/lib/ui/button";
import { LoadingSkeleton } from "./Skeleton";
import { getUnitPrice } from "@/lib/client_methods";

const BuyData = ({
  plans,
  user,
}: {
  plans: dataPlanTypes;
  user: userDataTypes;
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [planId, setPlanId] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<Plan>();

  const [currentNetwork, setCurrentNetwork] = useState("");
  const [dataType, setDataType] = useState(["-----"]);
  const [dataPlan, setDataPlan] = useState<Plan[]>([]);

  const filterSelectedPlan = () => {
    const selectedPlan: Plan[] = dataPlan.filter(
      (plan) => plan.dataplan_id === planId
    );

    setSelectedPlan(selectedPlan[0]);
  };

  //all networks

  const networks = [
    { name: "MTN", id: 1 },
    { name: "Glo", id: 2 },
    { name: "9mobile", id: 3 },
    { name: "Airtel", id: 4 },
  ];

  //Data types

  const mtnDataTypes = ["GIFTING", "CORPORATE GIFTING"];
  const gloDataTypes = ["GIFTING", "CORPORATE GIFTING"];
  const etisalatDataTypes = ["GIFTING", "CORPORATE GIFTING"];
  const airtelDataTypes = ["GIFTING", "CORPORATE GIFTING"];

  //all data plans
  const mtnPlans = plans.MTN_PLAN;
  const gloPlans = plans.GLO_PLAN;
  const etisalatPlans = plans["9MOBILE_PLAN"];
  const airtelPlans = plans.AIRTEL_PLAN;

  //mtn plans by type

  // const mtnSME = mtnPlans.filter((plan) => plan.plan_type === "SME");
  // const alfasimMtnSME: Plan[] = [];

  // const unitGBSME: number = getUnitPrice(mtnSME, 7);

  // mtnSME.forEach((plan) => {
  //   const integer = Math.trunc(parseInt(plan.plan.slice(0, -2)));

  //   alfasimMtnSME.push({
  //     id: plan.id,
  //     dataplan_id: plan.dataplan_id,
  //     network: plan.network,
  //     plan_type: plan.plan_type,
  //     plan_network: plan.plan_network,
  //     month_validate: plan.month_validate,
  //     plan: plan.plan,
  //     plan_amount:
  //       plan.plan.slice(-2) === "MB"
  //         ? (parseInt(plan.plan_amount) + 5).toString()
  //         : (integer * unitGBSME).toString(),
  //   });
  // });

  const mtnGifting = mtnPlans.filter((plan) => plan.plan_type === "GIFTING");

  const alfasimMtnGifting: Plan[] = [];

  const unitGBGifting = getUnitPrice(mtnGifting, 402);

  mtnGifting.forEach((plan) => {
    const integer = Math.trunc(parseInt(plan.plan.slice(0, -2)));

    const decimalPart = plan.plan.split(".")[1][0];

    const amount =
      plan.plan.slice(-2) === "MB"
        ? (parseInt(plan.plan_amount) + 5).toString()
        : decimalPart === "5"
        ? (integer * unitGBGifting + unitGBGifting / 2).toString()
        : (integer * unitGBGifting).toString();

    alfasimMtnGifting.push({
      id: plan.id,
      dataplan_id: plan.dataplan_id,
      network: plan.network,
      plan_type: plan.plan_type,
      plan_network: plan.plan_network,
      month_validate: plan.month_validate,
      plan: plan.plan,
      plan_amount: amount,
    });
  });

  //glo plans by type

  const gloGifting = gloPlans.filter((plan) => plan.plan_type === "GIFTING");

  const alfasimGloGifting: Plan[] = gloGifting;

  const gloCorporateGifting = gloPlans.filter(
    (plan) => plan.plan_type === "CORPORATE GIFTING"
  );

  const alfasimGloCorporateGifting: Plan[] = [];

  const unitGBGloCorporateGifting = getUnitPrice(gloCorporateGifting, 239);

  gloCorporateGifting.forEach((plan) => {
    const integer = Math.trunc(parseInt(plan.plan.slice(0, -2)));

    alfasimGloCorporateGifting.push({
      id: plan.id,
      dataplan_id: plan.dataplan_id,
      network: plan.network,
      plan_type: plan.plan_type,
      plan_network: plan.plan_network,
      month_validate: plan.month_validate,
      plan: plan.plan,
      plan_amount:
        plan.plan.slice(-2) === "MB"
          ? (parseInt(plan.plan_amount) + 5).toString()
          : (integer * unitGBGloCorporateGifting).toString(),
    });
  });

  //etisalat plans by type

  const etisalatCorporateGifting = etisalatPlans.filter(
    (plan) => plan.plan_type === "CORPORATE GIFTING"
  );

  const alfasimEtisalatCorporateGifting: Plan[] = [];

  const unitGBEtisalatCorporateGifting = getUnitPrice(
    etisalatCorporateGifting,
    242
  );

  etisalatCorporateGifting.forEach((plan) => {
    const integer = Math.trunc(parseInt(plan.plan.slice(0, -2)));

    const decimalPart = plan.plan.split(".")[1][0];

    const amount =
      plan.plan.slice(-2) === "MB"
        ? (parseInt(plan.plan_amount) + 5).toString()
        : decimalPart === "5"
        ? (
            integer * unitGBEtisalatCorporateGifting +
            unitGBEtisalatCorporateGifting / 2
          ).toString()
        : (integer * unitGBEtisalatCorporateGifting).toString();

    alfasimEtisalatCorporateGifting.push({
      id: plan.id,
      dataplan_id: plan.dataplan_id,
      network: plan.network,
      plan_type: plan.plan_type,
      plan_network: plan.plan_network,
      month_validate: plan.month_validate,
      plan: plan.plan,
      plan_amount: amount,
    });
  });

  //airtel plans
  const airtelCorporateGifting = airtelPlans.filter(
    (plan) => plan.plan_type === "CORPORATE GIFTING"
  );

  const alfasimAirtelCorporateGifting: Plan[] = [];

  const unitGBAirtelCoporateGifting = getUnitPrice(airtelCorporateGifting, 227);

  airtelCorporateGifting.forEach((plan) => {
    const integer = Math.trunc(parseInt(plan.plan.slice(0, -2)));

    const amount =
      plan.plan.slice(-2) === "MB"
        ? (parseInt(plan.plan_amount) + 5).toString()
        : (integer * unitGBAirtelCoporateGifting).toString();

    alfasimAirtelCorporateGifting.push({
      id: plan.id,
      dataplan_id: plan.dataplan_id,
      network: plan.network,
      plan_type: plan.plan_type,
      plan_network: plan.plan_network,
      month_validate: plan.month_validate,
      plan: plan.plan,
      plan_amount: amount,
    });
  });

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
      case "GIFTING":
        switch (currentNetwork) {
          case "MTN":
            setDataPlan(alfasimMtnGifting);
            break;
          case "Glo":
            setDataPlan(alfasimGloGifting);
            break;
        }
        break;
      case "CORPORATE GIFTING":
        switch (currentNetwork) {
          case "Glo":
            setDataPlan(alfasimGloCorporateGifting);
            break;
          case "etisalat":
            setDataPlan(alfasimEtisalatCorporateGifting);
            break;
          case "Airtel":
            setDataPlan(alfasimAirtelCorporateGifting);
            break;
        }
        break;
    }
  };

  const onCancelSubmit = () => {
    setLoading(false);
  };

  const handleSubmitForm = async () => {
    if (!selectedPlan || !user) return;

    if (
      parseInt(user?.balance) < parseInt(selectedPlan?.plan_amount) ||
      !user.balance
    ) {
      toast.error("Insufficient Balance");
      return;
    }

    const dataInfo: dataBodyType = {
      network: selectedPlan?.network.toString()!,
      plan: selectedPlan?.id.toString()!,
      mobile_number: phone,
      price: parseInt(selectedPlan?.plan_amount),
      email: user.email,
    };

    setLoading(true);
    buyData(dataInfo)
      .then((data) => {
        if (data.data) {
          toast.success("Successful");
          console.log("result" + data);
        } else if (data.error) {
          toast.error("Something went wrong");
        } else {
          console.log(data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
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
        {!loading ? (
          <form className="w-full md:w-[90%] border border-teal-800 dark:border-white dark:bg-black flex flex-col gap-2 p-5 bg-gray-200">
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
              onChange={(e) => {
                handleDataTypeSelect(e.target.value);
              }}
            >
              <option value="default">-----</option>
              {dataType.map((type, index) => (
                <option value={type} key={index}>
                  {type}
                </option>
              ))}
            </select>
            <label htmlFor="data-plan">Data Plan*</label>
            <select
              name="data-plan"
              id="data-plan"
              className={inputStyle}
              onChange={(e) => setPlanId(e.target.value)}
            >
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
                  {parseInt(plan.plan_amount)} {plan.month_validate}
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
            {/* <button
            type="submit"
            onClick={() => confirmSubmit()}
            disabled={loading ? true : false}
            className={` py-2 px-6  border  border-teal-800 text-teal-800 rounded-md md:w-1/5   ${
              loading
                ? "bg-gray-400"
                : "bg-white cursor-pointer hover:bg-teal-800 hover:border-white hover:text-white"
            }`}
          >
            {loading ? "Submitting" : "Buy Data"}
          </button> */}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => filterSelectedPlan()}
                  disabled={loading ? true : false}
                  className={`text-teal-800 rounded-md md:w-1/5   ${
                    loading
                      ? "bg-gray-400"
                      : "bg-white cursor-pointer hover:bg-teal-800 hover:border-white hover:text-white"
                  }`}
                >
                  Buy Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Hello {user?.username}!!</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure that you want to buy {selectedPlan?.plan} worth{" "}
                    NGN{selectedPlan?.plan_amount} for {phone}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => onCancelSubmit()}
                    className="mt-5"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleSubmitForm()}
                    className="border rounded-md cursor-pointer bg-teal-800 hover:border-white text-white w-full"
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        ) : (
          <div className="h-full w-full flex flex-col gap-5 py-20 p justify-center items-center bg-teal-800/20 dark:bg-black/20 ">
            <p className="font-bold text-3xl px-10">Processing please wait!!</p>
            <LoadingSkeleton />
          </div>
        )}
      </div>
    </>
  );
};

export default BuyData;
