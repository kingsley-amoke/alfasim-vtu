"use client";

import React, { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { connectToSupabase } from "@/lib/connection";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";
import { Label } from "@/lib/ui/label";
import { Input } from "@/lib/ui/input";
import { Button } from "@/lib/ui/button";
import { Checkbox } from "@/lib/ui/checkbox";
import Link from "next/link";
import { serverClient } from "@/lib/serverConnection";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { BsEye, BsEyeFill } from "react-icons/bs";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const LoginForm = () => {
  const router = useRouter();

  const [issubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const [show, setShow] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const { email, password } = values;

    try {
      const response = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });

      if (response.data.status === 400) {
        toast.error("Invalid email or password");
        setIsSubmitting(false);
        return;
      }

      const access_token = response.data.session?.access_token!;
      const refresh_token = response.data.session?.refresh_token!;

      await connectToSupabase().auth.setSession({
        access_token: access_token,
        refresh_token: refresh_token,
      });
      setIsSubmitting(false);
      router.replace("/dashboard?showDialog=y");
      toast.success("Login successful");
    } catch (error) {
      if (isDynamicServerError(error)) {
        setIsSubmitting(false);
        throw error;
      }
      setIsSubmitting(false);
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login here</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col h-full w-full justify-center gap-5 p-3 text-black dark:text-white"
        >
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            className="px-2"
            placeholder="example@gmail.com"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-red-900">
              {form.formState.errors.email.message}
            </p>
          )}
          <Label htmlFor="password">Password</Label>
          <Input
            type={show ? "text" : "password"}
            id="password"
            className="px-2 relative"
            placeholder="******"
            {...form.register("password")}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" onCheckedChange={() => setShow(!show)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show Password?
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me?
              </label>
            </div>
          </div>

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
              "Login"
            )}
          </Button>
        </form>
        <CardFooter>
          <p>
            Forgot your password? <Link href="/reset-password">Click here</Link>
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
