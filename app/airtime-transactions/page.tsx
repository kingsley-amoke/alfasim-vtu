import {
  fetchAirtimeHistory,
  fetchNotifications,
  getLoggedUser,
} from "@/lib/data";
import React from "react";
import WalletPage from "../components/TransactionsPage";

const page = async () => {
  const user = await getLoggedUser();

  const { email } = user!;
  const airtime = await fetchAirtimeHistory(email);

  const transactions = airtime!;

  const response = await fetchNotifications();

  const notifications = response!;

  return (
    <div>
      <WalletPage transactions={transactions} notifications={notifications} />
    </div>
  );
};

export default page;