"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BuyAirtime from "./BuyAirtime";
import Footer from "./Footer";
import { fetchNotifications, getLoggedUser } from "@/lib/data";

const AirtimePage = () => {
  const [unreadNotification, setUnreadNotification] = useState<number>(0);
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
    const count = unreadNotifications.length;

    setUnreadNotification(count);
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
        <Navbar user={user} count={unreadNotification} />
      </div>
      <div className="flex w-full ">
        <div className="grow h-full w-full mt-5">
          <BuyAirtime user={user}/>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AirtimePage;
