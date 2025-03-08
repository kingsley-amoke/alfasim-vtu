"use server";

import axios from "axios";

import { serverClient } from "./serverConnection";
import {
  DBTransactionTypes,
  ReservedAccountRequestType,
  airtimeBodyType,
  dataBodyType,
  notificationTypes,
} from "./types";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL as string;

//***************USERS AND CLIENTS************************//
export const fetchAllUsers = async () => {
  try {
    const { data } = await serverClient().from("users").select();

    return data;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const fetchUsersByPage = async (page: string) => {
  const minValue = Number(page + "0");
  const maxValue = Number(page + "9");

  console.log(minValue, maxValue);
  try {
    const { data } = await serverClient()
      .from("users")
      .select()
      .range(minValue, maxValue);

    return data;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const fetchUser = async (email: string | undefined) => {
  try {
    const { data } = await serverClient()
      .from("users")
      .select()
      .eq("email", email);

    return data;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const getLoggedUser = async () => {
  try {
    const {
      data: { user },
    } = await serverClient().auth.getUser();

    const data = await fetchUser(user?.email);

    if (data) {
      const user = data[0];
      return user;
    }
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

//***************COMMISSIONS AND REFERRALS************************//

export const handleCommission = async (
  commission: number,
  referee: string,
  referral_bonus: string
) => {
  try {
    let newBonus = parseInt(referral_bonus) + commission;

    serverClient()
      .from("users")
      .update({ referral_bonus: newBonus })
      .eq("email", referee)
      .select();
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const handleReferral = async (username: string, userEmail: string) => {
  let email = username + "@gmail.com";

  try {
    serverClient()
      .from("users")
      .update({ referee: email })
      .eq("email", userEmail)
      .select();

    const userData = await fetchUser(email);

    const { referrals } = userData![0];

    let newReferral = parseInt(referrals) + 1;

    serverClient()
      .from("users")
      .update({ referrals: newReferral })
      .eq("email", email)
      .select();
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const redeemBonus = async (username: string, referral_bonus: string) => {
  let email = username + "@gmail.com";
  const body = {
    email: email,
    referral_bonus: referral_bonus,
  };
  const response = await axios.post(`${serverUrl}/redeem`, body);
  return response.data;
};

//***************NOTIFICATIONS************************//

export const fetchNotifications = async () => {
  try {
    const { data, error } = await serverClient().from("notifications").select();

    let notifications: notificationTypes[] = data!;

    if (error) {
      console.log(error);
      return;
    }

    return notifications;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const fetchOneNotification = async (id: number) => {
  try {
    const { data: notifications, error } = await serverClient()
      .from("notifications")
      .select("*")
      .eq("id", id);

    let notification: notificationTypes[] = notifications!;

    if (error) {
      console.log(error);
      return;
    }

    return notification;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

//***************TRANSACTIONS************************//

export const fetchTransactions = async (email: string) => {
  try {
    const { data, error } = await serverClient()
      .from("transactions")
      .select()
      .eq("email", email);

    let transactions: DBTransactionTypes[] = data!;

    if (error) {
      console.log(error);
      return;
    }

    return transactions;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const fetchOneTransaction = async (id: string) => {
  try {
    const { data: transactions, error } = await serverClient()
      .from("transactions")
      .select("*")
      .eq("id", id);

    let transaction: DBTransactionTypes[] = transactions!;

    if (error) {
      console.log(error);
      return;
    }

    return transaction;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const fetchWalletHistory = async (email: string) => {
  try {
    const { data: transactions, error } = await serverClient()
      .from("transactions")
      .select("*")
      .eq("email", email)
      .eq("purpose", "wallet");

    let transaction: DBTransactionTypes[] = transactions!;

    if (error) {
      console.log(error);
      return;
    }

    return transaction;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const fetchDataHistory = async (email: string) => {
  try {
    const { data: transactions, error } = await serverClient()
      .from("transactions")
      .select("*")
      .eq("email", email)
      .eq("purpose", "data");

    let transaction: DBTransactionTypes[] = transactions!;

    if (error) {
      console.log(error);
      return;
    }

    return transaction;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const fetchAirtimeHistory = async (email: string) => {
  try {
    const { data: transactions, error } = await serverClient()
      .from("transactions")
      .select("*")
      .eq("email", email)
      .eq("purpose", "airtime");

    let transaction: DBTransactionTypes[] = transactions!;

    if (error) {
      console.log(error);
      return;
    }

    return transaction;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

//***************ASB DATA IMPLEMENTATION************************//

const asbUrl = process.env.ASB_URL!;
const asbToken = process.env.ASB_AUTH_TOKEN!;

const getASBHeaders = () => ({
  Authorization: `Token ${asbToken}`,
  "Content-Type": "application/json",
});

export const getDataPlans = async () => {
  const options = {
    method: "GET",
    headers: getASBHeaders(),
  };
  try {
    const res = await axios.get(`${asbUrl}/network`, options);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const buyData = async (data: dataBodyType) => {
  const response = await axios.post(`${serverUrl}/data/buy`, data);
  return response.data;
};

export const buyAirtime = async (data: airtimeBodyType) => {
  const response = await axios.post(`${serverUrl}/airtime/buy`, data);
  return response.data;
};

//***************RESERVED ACCOUNTS************************//

export const fetchUserAccount = async (email: string) => {
  try {
    const { data } = await serverClient()
      .from("accounts")
      .select()
      .eq("customer_email", email);

    return data;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const requestReservedAccount = async (
  body: ReservedAccountRequestType
) => {
  const response = await axios.post(`${serverUrl}/account/create`, body);
  return response.data;
};
