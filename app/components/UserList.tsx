import React, { useEffect, useLayoutEffect, useState } from 'react'
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
import { useRouter } from 'next/navigation';
import { userDataTypes } from '@/lib/types';
import { fetchAllUsers, recharge } from '@/lib/data';
import { Skeleton } from './Skeleton';

const UserList = ({query, currentPage, per_page}: { query:string, currentPage:string, per_page:string}) => {

    const router = useRouter();
    const [users, setUsers] = useState<userDataTypes[]>([]);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);



    const handleSearchUser = async() => {
      setLoading(true);

      const data = await fetchAllUsers()

      if(query === "") {
        const filteredUsers = data!
        filterUsersByBalance(filteredUsers)
      }
      else {
      
        const filteredUsers = data?.filter(user => user.username.toLowerCase().includes(query.toLowerCase()))!
        filterUsersByBalance(filteredUsers)
      }

    }

  const filterUsersByBalance = (users: userDataTypes[]) => {
    const richUsers = users.sort(
      (a, b) => parseInt(b.balance) - parseInt(a.balance)
    )

    const start = (Number(currentPage) - 1) * (Number(per_page))
    const end = start + (Number(per_page))

    const entries = richUsers.slice(start, end)
    setUsers(entries);
    setLoading(false);
  };


    const fundUserWallet = (user: userDataTypes) => {

        recharge(user.email, amount);
    
          toast.success("Recharge successful");
          router.push("/dashboard");
      };

    
  

      useLayoutEffect(() => {
        handleSearchUser();
       
        
      },[query, currentPage])


  return ( 

              <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:flex">Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:flex">Balance</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {
            loading ? <Skeleton /> :(

           
          <TableBody>
           
              
              {users?.map((user) => (
                <TableRow key={user.username}>
                <TableCell className="hidden md:flex">
                  {user.username}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="hidden md:flex">{user.balance}</TableCell>
                <TableCell>
                  
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-32">
                        Fund Wallet
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                      <DialogHeader>
                          <DialogTitle>Enter Amount</DialogTitle>
                          </DialogHeader>
                        <Input onChange={(e) => setAmount(e.target.value)} />
                        <DialogFooter className="mt-10">
                          <Button
                            className="border dark:border dark:border-white hover:teal-800"
                            onClick={() => fundUserWallet(user)}
                            >
                            Confirm
                            </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
           )
          }
        </Table>

  )
}

export default UserList