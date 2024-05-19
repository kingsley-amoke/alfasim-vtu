import React from "react";
import ConfirmPayment from "../components/ConfirmPayment";
import { PageProps } from "@/lib/types";
import { verifyPaystackTransaction } from "@/lib/data";

const page = async ({ searchParams }: PageProps) => {
  
  try {
    if (searchParams) {
      if (searchParams.reference && searchParams.trxref) {
        //please retry payment verification multiple times to avoid errors associated with payment confirmation
        const paymentStatus = await verifyPaystackTransaction({
          reference: searchParams.reference,
        });

        if (paymentStatus) {
          if (
            paymentStatus.status === true &&
            paymentStatus.data.status === "success"
          ) {
            console.log(paymentStatus);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return (
    <div>
      <ConfirmPayment />
    </div>
  );
};

export default page;
