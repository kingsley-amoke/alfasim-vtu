"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchNotifications, getLoggedUser } from "@/lib/data";
import FundWallet from "../components/FundWallet";
import Pay from "../pay/components/Pay";

const page = () => {
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
      <Navbar count={unreadNotification} user={user} />
      <Pay user={user} />
      <Footer />
    </div>
  );
};

export default page;
