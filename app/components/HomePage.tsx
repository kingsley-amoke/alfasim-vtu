"use client";

import React, { useEffect, useRef, useState } from "react";

import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import {
  fetchNotifications,
  fetchRefs,
  getLoggedUser,
  recharge,
  setTransaction,
  verifyPayment,
  verifyPaystackTransaction,
} from "@/lib/data";
import Modal from "./Modal";
import Footer from "./Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { transactionTypes, userDataTypes } from "@/lib/types";
import { LoadingSkeleton } from "./Skeleton";

const HomePage = () => {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("showDialog");
  const reference = searchParams.get("trxref");

  const [unreadNotification, setUnreadNotification] = useState(0);
  const [user, setUser] = useState<userDataTypes>({
    email: "",
    username: "",
    balance: "",
    referee: "",
    is_admin: false,
  });

  const [loading, setLoading] = useState(false);

  const handleCount = async () => {
    const response = await fetchNotifications();

    let notifications = response!;

    let unreadNotifications = notifications?.filter(
      (notification) => notification.read === false
    );

    setUnreadNotification(unreadNotifications.length);
  };

  const checkRefs = async () => {
    const refs = await fetchRefs();
    const ref = refs?.map((ref) => {
      if (ref.ref === reference) {
        return true;
      }
      return false;
    });

    const refStatus = ref!;

    return refStatus[0];
  };

  const fetchLoggedUser = async () => {
    const data = await getLoggedUser();

    if (data) setUser(data);

    if (reference) setLoading(true);

    const refStatus = await checkRefs();

    if (data && refStatus === false && reference) {
      const response = await verifyPayment(data, reference);

      response === "finished" && setLoading(false);
    }

    setLoading(false);
  };

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
  }, []);

  return (
    <>
      <Modal
        title={`Welcome ${user.username}`}
        closeDialog={closeDialog}
        showDialog={showDialog}
        dialogRef={dialogRef}
      >
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
          {loading ? (
            <div className="h-[20rem] md:h-[30rem] w-full flex flex-col gap-10 justify-center items-center">
              <div>Please wait...</div>
              <LoadingSkeleton />
            </div>
          ) : (
            <div className=" grow h-full w-full">
              <Dashboard user={user} count={unreadNotification} />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
