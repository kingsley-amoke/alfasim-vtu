
"use client";

import {
  fetchAllUsers,
  fetchNotifications,
  getLoggedUser,
} from "@/lib/data";
import { userDataTypes } from "@/lib/types";
import React, { Suspense, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import Search from "./Search";
import UserList from "./UserList";
import { Skeleton } from "./Skeleton";
import { useSearchParams } from "next/navigation";
import PaginationPage from "./Pagination";
import { useUserStore } from "@/lib/store";

const AdminPage = () => {
  const searchParams = useSearchParams();
  
  const query = searchParams.get("query") || "";
  const currentPage = searchParams.get("page") || "1";
  const per_page = searchParams.get("per_page") || "7"
  
  
  const [unreadNotification, setUnreadNotification] = useState<number>(0);
  const [user, setUser] = useState<userDataTypes>({
    email: '',
    username: "",
    balance: "",
    referee:'',
    is_admin: true,
  })
  const [users, setUsers] = useState<userDataTypes[]>([])


  const handleCount = async () => {
    const response = await fetchNotifications();
    const user = await getLoggedUser();
    const users = await fetchAllUsers()

    let notifications = response!;

    let unreadNotifications = notifications?.filter(
      (notification) => notification.read === false
    );
    const count = unreadNotifications.length;

    setUser(user!);
    setUsers(users!);
    setUnreadNotification(count);
  };

  useEffect(() => {
    handleCount();
  }, []);
  return (
    <>
      <Navbar user={user} count={unreadNotification} />
      <div className=" mt-32 md:mt-0 md:h-screen">
        <div className="w-full flex md:justify-end my-5">
          <Search placeholder="Search users...." />
        </div>
        <Suspense key={query + currentPage} fallback={<Skeleton />}>
          <UserList query={query} currentPage={currentPage} per_page={per_page} />
  <PaginationPage users={users} currentPage={currentPage} per_page={per_page}/>
        </Suspense>
      </div>

    
      <Footer />
    </>
  );
};

export default AdminPage;
