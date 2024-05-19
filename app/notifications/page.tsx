import React from "react";
import NotificationPage from "../components/NotificationPage";

import { fetchNotifications } from "@/lib/data";

const page = async () => {
  const response = await fetchNotifications();

  const notifications = response!;


  return (
    <div>
      <NotificationPage notifications={notifications} />
    </div>
  );
};

export default page;
