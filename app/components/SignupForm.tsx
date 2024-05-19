"use client";

import Link from "next/link";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { connectToSupabase } from "@/lib/connection";
import { createCustomer, handleReferral } from "@/lib/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";
import { Button } from "@/lib/ui/Button";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/lib/ui/checkbox";

const formSchema = z
  .object({
    firstName: z.string().toLowerCase().min(3),
    lastName: z.string().toLowerCase().min(3),
    email: z.string().email(),
    phone: z.string().min(11),
    password: z.string().min(6),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );

const SignupForm = () => {
  const [issubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const referral = useSearchParams().get("referral");

  const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const { email, password, firstName, lastName, phone } = values;

    const customer = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    };

    try {
      const response = await axios.post("/api/auth/register", {
        email: email,
        password: password,
      });

      if (response.data.status === 422) {
        toast.error("User already exist");

        return;
      }
      const {
        data: { id },
      } = await createCustomer(customer);

      const uuid = response.data.user.id!;
      const userEmail = response.data.user.email!;
      const username = userEmail.slice(0, -10);

      await connectToSupabase()
        .from("users")
        .insert([
          {
            id: uuid,
            email: userEmail,
            username: username,
            balance: 0,
            first_name: firstName,
            last_name: lastName,
            customer_id: id,
          },
        ])
        .select();

      const access_token = response.data.session?.access_token!;
      const refresh_token = response.data.session?.refresh_token!;

      await connectToSupabase().auth.setSession({
        access_token: access_token,
        refresh_token: refresh_token,
      });

      referral && (await handleReferral(referral));


      router.push("/dashboard?showDialog=y");

      toast.success("Registeration successful");
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register here</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className="flex flex-col h-full w-full justify-center gap-5 p-3 text-black dark:text-white"
        >
          <Label id="firstName">First Name</Label>
          <Input
            type="text"
            placeholder="Smoq"
            className="px-2"
            {...form.register("firstName")}
          />
          <Label id="lastName">Last Name</Label>
          <Input
            type="text"
            placeholder="Dev"
            className="px-2"
            {...form.register("lastName")}
          />
          <Label id="email">Email</Label>
          <Input
            type="text"
            className="px-2"
            placeholder="example@gmail.com"
            {...form.register("email")}
          />
          <Label id="phone">Phone Number</Label>
          <Input
            type="text"
            className="px-2"
            placeholder="+23410000000"
            {...form.register("phone")}
          />
          {form.formState.errors.email && (
            <p className="text-red-900">
              {form.formState.errors.email.message}
            </p>
          )}
          <Label id="assword">Password</Label>
          <Input
            type="password"
            placeholder="******"
            className="px-2"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-red-900">
              Password cannot be less than 6 characters long.
            </p>
          )}
          <Label id="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            placeholder="******"
            className="px-2"
            {...form.register("passwordConfirm")}
          />
          {form.formState.errors.passwordConfirm && (
            <p className="text-red-900">
              {form.formState.errors.passwordConfirm.message}
            </p>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
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
              "Register"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p>Already have an account? Go to Login</p>
      </CardFooter>
    </Card>
    
  );
};

export default SignupForm;
