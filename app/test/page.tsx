import { getNetworks } from "@/lib/data";
import axios from "axios";
import React from "react";
import { getDataList } from "../aab";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/lib/ui/dialog";

const page = async () => {
  await getDataList();


  return (

    <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent className="bg-teal-800 mt-12 mr-12">
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  );
};

export default page;
