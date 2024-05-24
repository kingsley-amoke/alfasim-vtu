"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { getLoggedUser, readNotifications } from "@/lib/data";
import { notificationTypes } from "@/lib/types";
import Navbar from "./Navbar";

const NotificationPage = ({
  notifications,
}: {
  notifications: notificationTypes[];
}) => {
  const router = useRouter();

  const readNotification = async (id: number) => {
    await readNotifications(id);
    router.push(`/notifications/${id}`);
  };

  const unreadNotifications = notifications.filter(
    (notification) => notification.read === false
  );

  const count = unreadNotifications.length;
  const [user, setUser] = useState({
    email:'',
    username: "",
    balance: "",
   
  });

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
      <div>
        <Table>
          <TableCaption>All Notifications</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">Date</TableHead>
              <TableHead>Read/Unread</TableHead>

              <TableHead className="text-left">Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow
                key={notification.id}
                className={
                  notification.read
                    ? "text-gray-600 capitalize cursor-pointer"
                    : " font-bold capitalize cursor-pointer"
                }
                onClick={() => readNotification(notification.id)}
              >
                <TableCell className="font-medium">
                  {notification.created_at.slice(0, 10)}
                </TableCell>
                <TableCell className="w-20 md:w-64">
                  {notification.read ? "read" : "unread"}
                </TableCell>

                <TableCell className="text-left">
                  {notification.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default NotificationPage;
