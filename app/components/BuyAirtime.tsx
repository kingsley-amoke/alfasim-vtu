"use client";

import { buyAirtime, deductBalance, setTransaction } from "@/lib/data";
import { Plan, transactionTypes, userDataTypes } from "@/lib/types";
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
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BuyData = ({ user }: { user: userDataTypes }) => {
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

  const createDataTransaction = async (data: transactionTypes) => {
    const response = await setTransaction(data);
    return response;
  };

  const handleSubmitForm = async () => {

    if(!user || !phone || !amount || !network) return


    if(parseInt(user?.balance) <  parseInt(amountToPay)) {
      
      toast.error("Insufficient Balance");
      return
    }

    setLoading(true);
  
    const airtimeInfo = {
      network: network,
      amount: amount,
      mobile_number: phone,
      Ported_number: true,
      airtime_type: "VTU",
    };

    console.log(airtimeInfo);

    const response = await buyAirtime(airtimeInfo);
   
    if(!response){
      const data: transactionTypes = {
        email: user?.email,
        amount: amountToPay,
        purpose: "airtime",
        status: 'failed',
        transactionId: 'failed',
        phone: phone,
        network: network,
        planSize: amount,
        previousBalance: user.balance,
        newBalance: user.balance
      };

      const transaction = await createDataTransaction(data);
      console.log(transaction);
      toast.error('failed')
      setLoading(false);
      return
    }

    if (response.results[0].Status === 'successful') {

      //create a transaction

      let networkName = ''
      
      switch(network) {
        case '1':
          networkName =  'MTN'
          break;
        case '2':
          networkName = 'Glo'
          break;
        case '3':
          networkName = '9mobile'
          break;
        case '4':
          networkName = 'Airtel'
          break;
      }

      const data: transactionTypes = {
        email: user?.email,
        amount: amountToPay,
        purpose: "airtime",
        status: response.results[0].Status,
        transactionId: response.results[0].ident,
        phone: phone,
        network: networkName,
        planSize: amount,
        previousBalance: user.balance,
        newBalance: (parseInt(user.balance) - parseInt(amountToPay)).toString(),
      };
      
      const transacrion = await createDataTransaction(data);
      console.log(transacrion);

      await deductBalance(user?.email, amountToPay);
      
      toast.success("Successfull");
      router.replace("/dashboard");
      setLoading(false);
    }else{
      
      if(response.results[0].Status !== "failed"){
        await deductBalance(user?.email, amountToPay);
      }


      const data: transactionTypes = {
        email: user?.email,
        amount: amountToPay,
        purpose: "airtime",
        status: response.results[0].Status,
        transactionId: response.results[0].ident,
        phone: phone,
        network: network,
        planSize: amount,
        previousBalance: user.balance,
        newBalance: response.results[0].Status === "failed" ? user.balance : (parseInt(user.balance) - parseInt(amountToPay)).toString()
      };

      const transaction = await createDataTransaction(data);
      console.log(transaction);
      toast.error(response.Status)
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen ml-10 mr-5 pt-9">
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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              disabled={loading ? true : false}
              className={`text-teal-800 rounded-md md:w-1/5   ${
                loading
                  ? "bg-gray-400"
                  : "bg-white cursor-pointer hover:bg-teal-800 hover:border-white hover:text-white"
              }`}
            >
              Buy Airtime
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hello {user?.username}!!</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure that you want to buy NGN{amount} worth NGN
                {amountToPay} for {phone}
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
      <div className="w-1/2 md:w-1/5 border border-teal-800 dark:border-white py-2 md:py-5 px-5 md:px-10  bg-teal-800 dark:bg-black  text-white rounded-md  text-center absolute top-[8.5rem] md:top-[8rem]">
        Buy Airtime
      </div>
    </div>
  );
};

export default BuyData;
