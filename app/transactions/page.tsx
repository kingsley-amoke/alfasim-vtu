import {
  fetchNotifications,
  fetchTransactions,
  getLoggedUser,
} from "@/lib/data";
import React from "react";
import WalletPage from "../components/TransactionsPage";

const page = async () => {
  const user = await getLoggedUser();
  
  const data = await fetchTransactions(user?.email);

  const transactions = data?.reverse()!;

  const response = await fetchNotifications();

  const notifications = response!;

  return (
    <div>
      <WalletPage transactions={transactions} notifications={notifications} />
    </div>
  );
};

export default page;
