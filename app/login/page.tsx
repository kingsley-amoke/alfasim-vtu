import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/ui/tabs";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const page = () => {
  return (
    <>
      <Navbar />
      <hr className="w-full mt-20 md:mt-0 my-5" />
      <div className="w-full flex justify-center items-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2 data-[state=active]:bg-teal-800 dark:data-[state=active]:bg-teal-800">
            <TabsTrigger value="login" className="h-full">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="h-full">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </div>
      <hr className="w-full my-5" />
      <Footer />
    </>
  );
};

export default page;
