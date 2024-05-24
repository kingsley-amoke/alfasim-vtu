"use client";

import React, { useEffect, useRef, useState } from "react";

import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import { fetchNotifications, getLoggedUser } from "@/lib/data";
import Modal from "./Modal";
import Footer from "./Footer";
import { useSearchParams } from "next/navigation";
import { userDataTypes } from "@/lib/types";

const HomePage = () => {
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

    data && setUser(data);
  };

  const searchParams = useSearchParams();
	const dialogRef = useRef<null | HTMLDialogElement>(null);
	const showDialog = searchParams.get("showDialog");



  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const clickOk = () => {
    closeDialog();
  };


  useEffect(() => {
    fetchLoggedUser();
    handleCount();

      if (showDialog === "y") {
        dialogRef.current?.showModal();
      } else {
        dialogRef.current?.close();
      }
    }, [showDialog]);
  

  

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
        <div className="flex ">
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
