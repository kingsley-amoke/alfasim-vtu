
import CheckTransaction from "@/app/components/CheckTransaction";
import { fetchOneTransaction } from "@/lib/data";
import React from "react";

const page = async({ params }: { params: { id: string } }) => {
  const id = params.id;



  // let response = await fetchOneTransaction(id);
  let response= [
    {
    id: '1',
    amount: '23',
    created_at: '2017',
    status: 'active',
    email: 'ewe',
    previousBalance: '4',
    newBalance: '4',
    transactionId: '1',
    purpose: 'Transaction',
    phone: "09159960425",
    network: 'MTN',
    planSize: '1.0 GB',
    },
    

  ]

  if (!response) {


    return <div>No transaction found</div>;

  }

  
  const transaction = response[0]

  return (
    <div>
      <CheckTransaction transaction={transaction} />
    </div>
  );
};

export default page;
