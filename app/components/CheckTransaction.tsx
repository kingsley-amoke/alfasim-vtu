import { fetchOneTransaction } from "@/lib/data";
import React from "react";

const CheckTransaction = async ({ id }: { id: string }) => {
  const response = await fetchOneTransaction(id);

  const [transaction] = response!;

  return <div>{transaction.amount}</div>;
};

export default CheckTransaction;
