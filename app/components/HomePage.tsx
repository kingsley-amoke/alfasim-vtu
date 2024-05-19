"use client";

import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import { fetchNotifications, getLoggedUser } from "@/lib/data";
import Modal from "./Modal";
import Footer from "./Footer";

const HomePage = () => {
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
    <>
      <Modal title="Welcome to Alfasim Data!!!">
        <p>
          We provide best and cheapest data, airtime, and cable subscription.{" "}
          <br />
          For complaint, contact our support team. <br />
          <br />
          <a href="tel:+8038095687">08038095687</a>
        </p>
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
