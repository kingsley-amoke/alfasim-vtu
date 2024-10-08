
import ReadNotification from "@/app/components/ReadNotification";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

  return (
    <div>
      <ReadNotification id={id} />
    </div>
  );
};

export default page;
