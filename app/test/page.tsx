import { getNetworks } from "@/lib/data";
import axios from "axios";
import React from "react";
import { getDataList } from "../aab";

const page = async () => {
  await getDataList();


  return <div>Click</div>;
};

export default page;
