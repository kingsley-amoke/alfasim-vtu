import React, { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

import { Button } from "@/lib/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/ui/dialog";
import { Input } from "@/lib/ui/input";
import { useRouter } from "next/navigation";
import { userDataTypes } from "@/lib/types";
import { fetchAllUsers } from "@/lib/data";
import { Skeleton } from "./Skeleton";
import {
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/lib/ui/alert-dialog";

const UserList = ({
  query,
  currentPage,
  per_page,
}: {
  query: string;
  currentPage: string;
  per_page: string;
}) => {
  const router = useRouter();
  const [users, setUsers] = useState<userDataTypes[]>([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchUser = async () => {
    setLoading(true);

    const data = await fetchAllUsers();

    if (query === "") {
      const filteredUsers = data!;
      filterUsersByBalance(filteredUsers);
    } else {
      const filteredUsers = data?.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      )!;
      filterUsersByBalance(filteredUsers);
    }
  };

  const filterUsersByBalance = (users: userDataTypes[]) => {
    const richUsers = users.sort(
      (a, b) => parseInt(b.balance) - parseInt(a.balance)
    );

    const start = (Number(currentPage) - 1) * Number(per_page);
    const end = start + Number(per_page);

    const entries = richUsers.slice(start, end);
    setUsers(entries);
    setLoading(false);
  };

  const fundUserWallet = (user: userDataTypes) => {
    setLoading(true);
    // recharge(user.email, amount).then(() => {
    //   setLoading(false);
    //   toast.success("Recharge successful");
    //   window.location.reload();
    // });
  };

  const handleDeductBalance = (user: userDataTypes) => {
    setLoading(true);
    const newBalance = (parseInt(user.balance) - parseInt(amount)).toString();

    // deductBalance(user.email, newBalance).then(() => {
    //   setLoading(false);
    //   toast.success("Successful");
    //   window.location.reload();
    // });
  };

  useLayoutEffect(() => {
    handleSearchUser();
  }, [query, currentPage]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden md:flex">Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="hidden md:flex">Balance</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      {loading ? (
        <Skeleton />
      ) : (
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.username}>
              <TableCell className="hidden md:flex">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="hidden md:flex">{user.balance}</TableCell>
              <TableCell className="gap-10 ">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-32">
                      Fund Wallet
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[80%] md:w-1/3 mx-auto">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Enter Amount</AlertDialogTitle>
                    </AlertDialogHeader>
                    <Input
                      onChange={(e) => setAmount(e.target.value)}
                      autoFocus
                    />
                    <AlertDialogFooter className="mt-10">
                      <AlertDialogCancel>
                        <Button
                          className="border dark:border dark:border-white hover:teal-800"
                          onClick={() => fundUserWallet(user)}
                        >
                          Confirm
                        </Button>
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild className="bg-red-600">
                    <Button variant="destructive" className="w-32 ">
                      Deduct
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[80%] md:w-1/3 mx-auto">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Enter Amount</AlertDialogTitle>
                    </AlertDialogHeader>
                    <Input
                      onChange={(e) => setAmount(e.target.value)}
                      autoFocus
                    />
                    <AlertDialogFooter className="mt-10">
                      <AlertDialogCancel>
                        <Button
                          className="border dark:border dark:border-white hover:teal-800"
                          onClick={() => handleDeductBalance(user)}
                        >
                          Confirm
                        </Button>
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

export default UserList;
