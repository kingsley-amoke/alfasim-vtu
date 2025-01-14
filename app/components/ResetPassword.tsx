"use client";

import { Button } from "@/lib/ui/button";
import { Card, CardContent } from "@/lib/ui/card";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

const ResetPassword = () => {
  const params = useSearchParams().get("reset");

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-8 h-8 mr-2"
            src="/logo.jpg"
            alt="logo"
            width={10}
            height={10}
          />
          Alfasim Data
        </a>
        {params === "true" ? <ChangePassword /> : <SendResetEmail />}
      </div>
    </section>
  );
};

export default ResetPassword;

const ChangePassword = () => {
  const [issubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleResetPassword = () => {
    setIsSubmitting(true);
  };
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
      <h2 className="mb-1 leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Change Password
      </h2>
      <Card>
        <CardContent className="space-y-2 pt-10">
          <form
            onSubmit={form.handleSubmit(handleResetPassword)}
            className="flex flex-col h-full w-full justify-center gap-5 p-3 text-black dark:text-white"
          >
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              placeholder="******"
              className="px-2"
              {...form.register("password")}
            />
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              className="px-2"
              placeholder="******"
              {...form.register("confirmPassword")}
            />

            <Button
              disabled={issubmitting ? true : false}
              variant={"outline"}
              className={
                !issubmitting ? "hover:bg-teal-800 hover:text-white" : ""
              }
              type="submit"
            >
              {issubmitting ? (
                <p className="flex w-full h-full justify-center items-center">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </p>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const SendResetEmail = () => {
  const [issubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("hi");
    setIsSubmitting(true);
    const { email } = values;
    const data = {
      email: email,
    };
    try {
      console.log("sending");
      const response = await axios.post("/api/auth/reset-password", data);

      console.log(response);
    } catch (error) {
      if (isDynamicServerError(error)) {
        throw error;
      }
      console.log(error);
    }
    setIsSubmitting(false);
  };
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
      <h2 className="mb-1 leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Send Reset Password Link
      </h2>
      <Card>
        <CardContent className="space-y-2 pt-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full w-full justify-center gap-5 p-3 text-black dark:text-white"
          >
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="px-2"
              {...register("email")}
            />

            <Button
              type="submit"
              disabled={issubmitting}
              // variant={"outline"}
              className={
                !issubmitting ? "hover:bg-teal-800 hover:text-white" : ""
              }
            >
              {issubmitting ? (
                <p className="flex w-full h-full justify-center items-center">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </p>
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
