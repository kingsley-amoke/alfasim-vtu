
import CheckTransaction from "@/app/components/CheckTransaction";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <div>
      <CheckTransaction id={id} />
    </div>
  );
};

export default page;
