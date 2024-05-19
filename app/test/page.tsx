import { getNetworks } from "@/lib/data";
import axios from "axios";
import React from "react";

const page = async () => {
  const response = await getNetworks();

  console.log(response);

  return <div>{response.MTN.data_plans[0].network_id}</div>;
};

export default page;
