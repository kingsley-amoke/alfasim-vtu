import {
  fetchNotifications,
  fetchWalletHistory,
  getLoggedUser,
} from "@/lib/data";
import React from "react";
import WalletSummaryPage from "../components/WalletSummaryPage";

const page = async () => {
  const user = await getLoggedUser();


  const wallet = await fetchWalletHistory(user?.email);

  const transactions = wallet?.reverse()!;

  const response = await fetchNotifications();

  const notifications = response!;

  return (
    <div>
      <WalletSummaryPage transactions={transactions} notifications={notifications} />
    </div>
  );
};

export default page;
