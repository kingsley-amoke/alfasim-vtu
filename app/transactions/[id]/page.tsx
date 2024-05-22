
import CheckTransaction from "@/app/components/CheckTransaction";
import { fetchOneTransaction } from "@/lib/data";
import React from "react";

const page = async({ params }: { params: { id: string } }) => {
  const id = params.id;



  let response = await fetchOneTransaction(id);

  if (!response) {


    return <div>No transaction found</div>;

  }

  
  const [transaction] = response;


  return (
    <div>
      <CheckTransaction transaction={transaction} />
    </div>
  );
};

export default page;
