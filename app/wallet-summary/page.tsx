import {
  fetchNotifications,
  fetchWalletHistory,
  getLoggedUser,
} from "@/lib/data";
import React from "react";
import WalletPage from "../components/TransactionsPage";
import { transactionTypes } from "@/lib/types";

const page = async () => {
  const user = await getLoggedUser();

  const { email } = user!;

  const wallet = await fetchWalletHistory(email);

  const transactions = wallet!;
  const response = await fetchNotifications();

  const notifications = response!;

  return (
    <div>
      <WalletPage transactions={transactions} notifications={notifications} />
    </div>
  );
};

export default page;
