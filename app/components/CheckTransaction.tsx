import { fetchOneTransaction } from "@/lib/data";
import { DBTransactionTypes} from "@/lib/types";
import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./Table";

const CheckTransaction = async ({transaction }:{transaction: DBTransactionTypes}) => {

 

  return (<div className="h-screen w-full flex justify-center ">
    <div className="w-full md:w-1/3 flex flex-col mt-20 mx-2 fixed left-[50%] -translate-x-[50%]">
    <p className="uppercase text-center" w-full>Transaction Details</p>
    </div>
    
    <Table className="w-full lg:w-1/2 flex flex-col mt-40 mx-2 border border-teal-800 fixed left-[50%] -translate-x-[50%]">
    
      <TableHeader className="text-center bg-teal-800 text-white py-5">{transaction.purpose === 'wallet' ? `Wallet recharge ${transaction.status}`: `Your purchase of ${transaction.network} ${transaction.plan_size} to ${transaction.phone} ${transaction.status === "failed" ? "has" : 'is'} ${transaction.status}.`} </TableHeader>
      <TableBody className="w-full">
        <TableRow className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">{transaction.purpose === 'wallet' ? "Payment Method" :"Network"}</TableCell>
          <TableCell>{transaction.network}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">{transaction.purpose === 'wallet' ? "Currency" :"Plan Size"}</TableCell>
          <TableCell>{transaction?.plan_size}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">Previous Balance</TableCell>
          <TableCell>NGN {transaction?.previous_balance}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">New Balance</TableCell>
          <TableCell>NGN {transaction?.new_balance}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">Amount</TableCell>
          <TableCell>NGN {transaction.amount}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">{transaction.purpose === 'wallet' ? "Reference" :"Phone"}</TableCell>
          <TableCell>{transaction.phone}</TableCell>
        </TableRow>
        <TableRow  className="flex flex-1">
          <TableCell className="font-bold w-1/3 border border-r-1">Transaction ID</TableCell>
          <TableCell>{transaction?.transaction_id}</TableCell>
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
