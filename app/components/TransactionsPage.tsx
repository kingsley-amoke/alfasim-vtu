"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { getLoggedUser } from "@/lib/data";
import { DBTransactionTypes, notificationTypes } from "@/lib/types";
import Navbar from "./Navbar";

import { Ban, CircleCheckBig, CircleDotDashedIcon } from "lucide-react";
import { Button } from "@/lib/ui/button";

const WalletPage = ({
  transactions,
  notifications,
}: {
  transactions: DBTransactionTypes[];
  notifications: notificationTypes[];
}) => {
  const router = useRouter();
  const path = usePathname();

  const [user, setUser] = useState({
    email: "",
    username: "",
    balance: "",
    referee: "",
    is_admin: false,
  });

  const unreadNotifications = notifications.filter(
    (notification) => notification.read === false
  );

  const count = unreadNotifications.length;

  const fetchLoggedUser = async () => {
    const data = await getLoggedUser();

    data && setUser(data);
  };

  useEffect(() => {
    fetchLoggedUser();
  }, []);

  return (
    <>
      <Navbar count={count} user={user} />
      <div className="mt-20 md:mt-0">
        <Table>
          <TableCaption>
            {transactions.length === 0 ? (
              <p>No transaction. Fund your wallet</p>
            ) : path === "/transactions" ? (
              "Transactions Summary"
            ) : (
              <Button
                variant="outline"
                className="hover:bg-teal-800 hover:text-white"
                onClick={() => router.push("/transactions")}
              >
                See All Transactions
              </Button>
            )}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="md:w-[22rem] md:pl-32">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Network</TableHead>
              <TableHead>Phone Number</TableHead>

              <TableHead className="text-left">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className={
                  transaction.id
                    ? "text-gray-600 capitalize cursor-pointer"
                    : " font-bold capitalize cursor-pointer"
                }
                onClick={() => router.push(`/transactions/${transaction.id}`)}
              >
                <TableCell className="font-medium">
                  {transaction.transaction_id}
                </TableCell>
                <TableCell className="">
                  {transaction?.created_at?.slice(0, 10)}
                </TableCell>
                <TableCell className="">{transaction?.network}</TableCell>
                <TableCell className="">{transaction?.phone}</TableCell>

                <TableCell className="text-left">
                  {`NGN ${transaction.amount}`}
                </TableCell>
                <TableCell className="text-left flex justify-center items-center">
                  {transaction.status === "successful" ? (
                    <div className="flex items-center justify-between gap-5">
                      Completed
                      <CircleCheckBig color="green" />
                    </div>
                  ) : transaction.status === "failed" ? (
                    <div className="flex items-center justify-between gap-5">
                      Failed
                      <Ban color="red" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-5">
                      Pending
                      <CircleDotDashedIcon color="orange" />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default WalletPage;
