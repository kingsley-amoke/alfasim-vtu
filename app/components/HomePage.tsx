"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import {
  fetchAllUsers,
  fetchNotifications,
  fetchRefs,
  fetchUserAccount,
  getLoggedUser,
  handleFundWallet,
  recharge,
  setTransaction,
  verifyPayment,
  verifyPaystackTransaction,
} from "@/lib/data";
import Modal from "./Modal";
import Footer from "./Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { AccountType, transactionTypes, userDataTypes } from "@/lib/types";
import { LoadingSkeleton } from "./Skeleton";
import { useUserStore, useUsersStore } from "@/lib/store";

const HomePage = () => {
  const searchParams = useSearchParams();
  const { setUsers } = useUsersStore();

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

    const res = await fetchAllUsers();
    const users = res!;

    setUsers(users);
  };

  const fetchLoggedUser = async () => {
    const data = await getLoggedUser();

    if (!data) return;

    setUser(data);

    if (!reference) return;

    setLoading(true);

    handleFundWallet(data, reference).then(() => {
      setLoading(false);
    });
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const clickOk = () => {
    closeDialog();
  };

  useEffect(() => {
    handleCount();

    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, []);

  useLayoutEffect(() => {
    fetchLoggedUser();
  }, [reference]);

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
          <Navbar user={user} count={unreadNotification} />
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
