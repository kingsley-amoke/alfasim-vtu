import { fetchOneTransaction } from "@/lib/data";
import { transactionTypes } from "@/lib/types";
import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./Table";

const CheckTransaction = async ({transaction }: transactionTypes) => {
 

  return (<div className="h-screen w-full flex justify-center border border-red-400">
    <div className="w-full md:w-1/3 flex flex-col mt-20 mx-2 fixed left-[50%] -translate-x-[50%]">
    <p className="uppercase text-center" w-full>Transaction Details</p>
    </div>
    
    <Table className="w-full md:w-1/3 flex flex-col mt-40 mx-2 border border-teal-800 fixed left-[50%] -translate-x-[50%]">
    
      <TableHeader className="text-center bg-teal-800 text-white py-5">Your Successful purchased MTN 1.0 GB to 08038095687. </TableHeader>
      <TableBody className="w-full">
        <TableRow className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">Network</TableCell>
          <TableCell>{transaction.network}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">Plan Size</TableCell>
          <TableCell>{transaction.planSize}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">Previous Balance</TableCell>
          <TableCell>NGN {transaction.previousBalance}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">New Balance</TableCell>
          <TableCell>NGN {transaction.newBalance}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">Amount</TableCell>
          <TableCell>NGN {transaction.amount}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">Phone</TableCell>
          <TableCell>{transaction.phone}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">Transaction ID</TableCell>
          <TableCell>{transaction.transactionId}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">Status</TableCell>
          <TableCell>{transaction.status}</TableCell>
        </TableRow>
        <TableRow className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">Date</TableCell>
          <TableCell>{transaction.created_at}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>)
};

export default CheckTransaction;
