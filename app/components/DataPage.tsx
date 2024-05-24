'use client'

import Navbar from "@/app/components/Navbar";

import BuyData from "@/app/components/BuyData";

import Footer from "./Footer";
import { fetchNotifications, getDataPlans, getLoggedUser } from "@/lib/data";
import { useEffect, useState } from "react";
import { dataPlanTypes } from "@/lib/types";

const DataPage = ({ plans }: { plans: dataPlanTypes }) => {
  const [unreadNotification, setUnreadNotification] = useState(0);
  const [user, setUser] = useState({
    email: '',
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

  useEffect(() => {
    fetchLoggedUser();
    handleCount();
  }, [user]);
  return (
    <div>
      <div>
        <Navbar user={user} count={unreadNotification} />
      </div>

      <div className="grow h-full w-full mt-5">
        <BuyData plans={plans} user={user}/>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DataPage;
