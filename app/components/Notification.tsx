import { BellIcon } from "lucide-react";
import React from "react";

const Notification = ({ count }: { count?: number }) => {
	
	return (
    <div className="relative">
      <p className="w-4 h-4 flex justify-center items-center bg-red-600 rounded-full p-2 text-white text-xs right-1 top-0 absolute">
        {count && count < 0 ? ".." : count}
      </p>
      <div>
        <BellIcon size={40} />
      </div>
    </div>
  );
};

export default Notification;
