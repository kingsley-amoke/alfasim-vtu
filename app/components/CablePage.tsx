"use client";

import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SubscribeCable from "./SubscribeCable";
import Footer from "./Footer";
import { fetchNotifications, getLoggedUser } from "@/lib/data";

const CablePage = () => {
  const [unreadNotification, setUnreadNotification] = useState(0);
  const [user, setUser] = useState({
    username: "",
    balance: "",
    referrals: "",
    referral_bonus: "",
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

  useEffect(() => {
    fetchLoggedUser();
    handleCount();
  }, []);
  return (
    <div>
      <div>
        <Navbar count={unreadNotification} user={user} />
      </div>
      <div className="flex w-full ">
        <div className="grow h-full w-full mt-5">
          <SubscribeCable />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CablePage;
