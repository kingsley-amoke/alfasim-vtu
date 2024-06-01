"use client";

import {
  fetchAllUsers,
  fetchNotifications,
  getLoggedUser,
  recharge,
} from "@/lib/data";
import { userDataTypes } from "@/lib/types";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();

  const [unreadNotification, setUnreadNotification] = useState<number>(0);
  const [user, setUser] = useState<userDataTypes>();
  const [users, setUsers] = useState<userDataTypes[]>();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLoggedUser = async () => {
    const data = await getLoggedUser();

    data && setUser(data);
  };

  const fetchUsers = async () => {
    const data = await fetchAllUsers();
    data && setUsers(data);
  };

  const handleCount = async () => {
    const response = await fetchNotifications();

    let notifications = response!;

    let unreadNotifications = notifications?.filter(
      (notification) => notification.read === false
    );
    const count = unreadNotifications.length;

    setUnreadNotification(count);
  };

  const fundUserWallet = async () => {
    setLoading(true);
    const data = await recharge(user?.email, amount);

    if (data?.data) {
      setLoading(false);
      toast.success("Recharge successful");
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    fetchLoggedUser();
    fetchUsers();
    handleCount();
  }, []);
  return (
    <>
      <Navbar user={user} count={unreadNotification} />
      <div className="h-screen">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.username}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.balance}</TableCell>
                <TableCell>
                    {loading ? "Please wait..." :(
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Fund Wallet</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Enter Amount</DialogTitle>
                      </DialogHeader>
                      <Input onChange={(e) => setAmount(e.target.value)} />
                      <DialogFooter className="mt-10">
                        <Button
                          className="border dark:border dark:border-white hover:teal-800"
                          onClick={() => fundUserWallet()}
                        >
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>)
}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
