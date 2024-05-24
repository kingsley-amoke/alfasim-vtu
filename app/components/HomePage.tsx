"use client";

import React, { useEffect, useRef, useState } from "react";

import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import { fetchNotifications, getLoggedUser, recharge, setTransaction, verifyPaystackTransaction } from "@/lib/data";
import Modal from "./Modal";
import Footer from "./Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { transactionTypes, userDataTypes } from "@/lib/types";

const HomePage = () => {

  const router = useRouter()



  const [unreadNotification, setUnreadNotification] = useState(0);
  const [user, setUser] = useState<userDataTypes>({
    email: "",
    username: "",
    balance: "",
  });

  const handleCount = async () => {
    const response = await fetchNotifications();

    let notifications = response!;

    let unreadNotifications = notifications?.filter(
      (notification) => notification.read === false
    );

    setUnreadNotification(unreadNotifications.length);
  };

  const fetchLoggedUser = async () => {
    const data = await getLoggedUser();

 if(data){
    setUser(data);

    verifyPayment(data)
 }
  };

  const searchParams = useSearchParams();
	const dialogRef = useRef<null | HTMLDialogElement>(null);
	const showDialog = searchParams.get("showDialog");
  const reference = searchParams.get("trxref");


  const verifyPayment = async (user: userDataTypes) => {

    if(reference) {

    const response = await verifyPaystackTransaction(reference)
    if(response.data.status === 'success'){

      const trans: transactionTypes = {
        email: user.email,
        purpose: 'wallet',
        amount: (response.data.amount / 100).toString(),
        status: response.data.status,
        network: response.data.channel,
        planSize: response.data.currency,
        previousBalance: user?.balance,
        newBalance: ((response.data.amount / 100) + parseInt(user?.balance)).toString(),
        phone: reference,
        transactionId: response.data.id
      }

      await recharge(user?.email, trans.amount)

      await setTransaction(trans)
      router.replace('/')
     
    } else{
      const trans: transactionTypes = {
        email: user.email,
        purpose: 'wallet',
        amount: (response.data.amount / 100).toString(),
        status: response.data.status,
        network: response.data.channel,
        planSize: response.data.currency,
        previousBalance: user?.balance,
        newBalance: user?.balance,
        phone: reference,
        transactionId: response.data.id
      }

      await setTransaction(trans)
      router.replace('/')
    }
    }
  }


  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const clickOk = () => {
    closeDialog();
  };


  useEffect(() => {
    const data = fetchLoggedUser();
    handleCount();

  

      if (showDialog === "y") {
        dialogRef.current?.showModal();
      } else {
        dialogRef.current?.close();
      }
    }, [reference]);
  

  

  return (
    <>
      <Modal title={`Welcome ${user.username}`} closeDialog={closeDialog} showDialog={showDialog} dialogRef={dialogRef}>
        <p>
          We provide best and cheapest data, airtime, and cable subscription.{" "}
          <br />
          <a href="tel:+8038095687">
          For complaint, contact our support team. <br />
          </a>
          <br />
        </p>
        <div className="flex md:mt-40">
							<button
								onClick={clickOk}
								className="py-2 px-4 bg-teal-800 dark:bg-black dark:border rounded-md text-white"
							>
								Continue to Dashboard
							</button>
						</div>
      </Modal>
      <div>
        <div>
          <Navbar count={unreadNotification} user={user} />
        </div>
        <div className="flex w-full ">
          <div className=" grow h-full w-full">
            <Dashboard user={user} count={unreadNotification} />
          </div>
			  </div>
			  <Footer />
      </div>
    </>
  );
};

export default HomePage;
