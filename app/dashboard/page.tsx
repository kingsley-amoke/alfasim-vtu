import React from "react";

import HomePage from "../components/HomePage";
import { fetchLastTransaction } from "@/lib/data";

const page = async () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default page;
