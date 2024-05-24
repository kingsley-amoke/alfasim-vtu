"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/lib/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";
import { Checkbox } from "@/lib/ui/checkbox";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";

const formSchema = z.object({
  firstName: z.string().toLowerCase().min(3),
  lastName: z.string().toLowerCase().min(3),
  email: z.string().email(),
  phone: z.string().min(11),
  amount: z.string(),
});

const FundWallet = () => {
  const [issubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const handleRecharge = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
  };
  return (
    <div className="flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Fund your wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <form
            onSubmit={form.handleSubmit(handleRecharge)}
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
              type="submit"
              disabled={issubmitting ? true : false}
              variant="outline"
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
                "Proceed To Payment Page"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>All payments are processed by Paystack!!</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FundWallet;
