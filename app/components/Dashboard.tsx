import React, { useRef } from "react";
import Button from "./Button";
import { BiMoney, BiWallet } from "react-icons/bi";
import { BsPersonCheck } from "react-icons/bs";
import ServiceCard from "./ServiceCard";
import { FaCcVisa, FaPhoneVolume, FaSignal } from "react-icons/fa";
import { FaNairaSign } from "react-icons/fa6";
import { LuRadioReceiver } from "react-icons/lu";
import { FcElectricity } from "react-icons/fc";
import { RiCoupon2Fill } from "react-icons/ri";
import {GoGift} from "react-icons/go"
import {MdMoney, MdOutline4GPlusMobiledata} from "react-icons/md"
import Link from "next/link";

import { redeemBonus } from "@/lib/data";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FAQ from "./FAQ";
import Notification from "./Notification";
import { userDataTypes } from "@/lib/types";



const Dashboard = ({
	user,
	count,
}: {
	user: userDataTypes
	count: number;
}) => {
	const router = useRouter();
	const redeemRef = useRef<HTMLButtonElement>(null!);

	const handleNotification = async () => {
		router.push("/notifications");
	};

	const handleRedeem = async () => {
		redeemRef.current.disabled = true;

    if(user.referral_bonus){
      
		if (user?.referral_bonus === "0") {
			toast.error("No bonus this time, refer people to earn!");
			return;
		}


		const response = await redeemBonus(user.username, user.referral_bonus);

		response?.error && toast.error("An error occured");

		toast.success("Bonus has been added to your wallet");

		router.refresh;
    }
	};

	const statsStyle =
    "w-full md:w-1/3 flex justify-between md:justify-center px-5 mr-5 md:mr-0 items-center py-4 md:gap-10 cursor-pointer";

  const cardStyles =
    "h-full w-full rounded-lg p-5 flex flex-wrap flex-col justify-center gap-2 cursor-pointer hover:shadow-teal-300 hover:shadow-lg border border-white bg-teal-800 dark:bg-black text-white";

  return (
    <div>
      <section className="flex bg-teal-800 dark:bg-black text-white flex-col md:flex-row gap-5 md:gap-32 justify-between items-center px-2 md:px-10 pt-5 pb-10 md:py-20">
        <div>
          <div className="flex w-full justify-between items-center">

          <h5 className="capitalize">{`Hi ${user?.username}!`}</h5>
            <div
              className="md:hidden cursor-pointer"
              onClick={handleNotification}
            >
              <Notification count={count} />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <h2 className="mb-5 text-xl md:text-3xl font-bold">WELCOME TO ALFASIM DATA</h2>
          </div>
          <p>
            We offer the most affordable and cheapest data, airtime, <br />
            cable subscription, electricity subscription, bulk sms. Convert
            airtime to money.
          </p>
          <p className="mt-10">{`Referral link: alfasimdata.com/register?referral=${user?.username}`}</p>
        </div>
        <Button links="recharge">Fund Wallet</Button>
      </section>
      <section className=" dark:border  dark:border-white mx-2 md:mx-10 my-10 shadow-sm shadow-slate-600 rounded-md md:rounded-none">
        <p className="font-bold text-lg uppercase my-3 pt-3 ml-10">
          Transaction statistics
        </p>
        <hr />
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center">
          <div
            className={`${statsStyle} border border-t-0 md:border-r-slate-400`}
          >
            <div>
              <BiWallet size={40} />
            </div>
            <div className="w-1/2 md:w-1/3 flex gap-2">
              <p>Wallet Balance</p>
              <p className="text-md">{`NGN ${user?.balance}`}</p>
            </div>
          </div>
          <div
            className={`${statsStyle} md:border-r-slate-400 border border-t-0 `}
          >
            <div>
              <BsPersonCheck size={40} />
            </div>
            <div className="w-1/2 md:w-1/3">
              <p>Referrals</p>
              <p>{user?.referrals}</p>
            </div>
          </div>
          <div
            className={`${statsStyle}border-r-0 md:border-l-0 border border-t-0 `}
          >
            <div>
              <GoGift size={40} />
            </div>
            <div className="w-1/2 md:w-1/3 flex justify-between items-center">
              <div className="w-full md:w-2/3">
                <p>Bonus</p>
                {user?.referral_bonus && <p>{`NGN ${user?.referral_bonus}`}</p>}
              </div>
             {user?.referral_bonus && 
              <button
              className="py-1 px-2 text-[12px] md:text-[8px] font-bold shadow-sm shadow-black rounded-lg hover:bg-teal-500 border bg-teal-800 text-white"
              onClick={handleRedeem}
              ref={redeemRef}
            >
              Redeem
            </button>}
            </div>
          </div>
          <div
            className={`${statsStyle} hover:bg-teal-800 hover:text-white border border-t-0 md:border-b-0 border-r-slate-400`}
            onClick={() => router.push("/wallet-summary")}
          >
            <div>
              <FaCcVisa size={40} />
            </div>
            <div className="w-1/2 md:w-1/3">
              <p>Wallet Summary</p>
            </div>
          </div>

          <div
            className={`${statsStyle} hover:bg-teal-800 hover:text-white border border-t-0 md:border-b-0 border-r-slate-400`}
            onClick={() => router.push("/data-transactions")}
          >
            <div>
              <MdOutline4GPlusMobiledata size={40} />
            </div>
            <div className="w-1/2 md:w-1/3">
              <p>Data Transactions</p>
            </div>
          </div>

          <div
            className={`${statsStyle} hover:bg-teal-800 hover:text-white w-full`}
            onClick={() => router.push("/airtime-transactions")}
          >
            <div>
              <MdMoney size={40} />
            </div>
            <div className="w-1/2 md:w-1/3">
              <p>Airtime Transactions</p>
            </div>
          </div>
        </div>
      </section>
      <section className=" border border-teal-800 bg-slate-100 dark:bg-black dark:border-none flex gap-10 p-10 flex-wrap justify-center items-center">
        <Link href="/data" className="w-full md:w-1/4">
          <ServiceCard
            ServiceIcon={FaSignal}
            title="Buy Data"
            styles={cardStyles}
          />
        </Link>
        <Link href="/airtime" className="w-full md:w-1/4">
          <ServiceCard
            ServiceIcon={FaPhoneVolume}
            title="Buy Airtime"
            styles={cardStyles}
          />
        </Link>
        <Link href="/" className="w-full md:w-1/4">
          <ServiceCard
            ServiceIcon={FaNairaSign}
            title="Airtime 2 Cash"
            styles={cardStyles}
          />
        </Link>
        <Link href="/cable" className="w-full md:w-1/4">
          <ServiceCard
            ServiceIcon={LuRadioReceiver}
            title="Cable Sub"
            styles={cardStyles}
          />
        </Link>
        <Link href="/electricity" className="w-full md:w-1/4">
          <ServiceCard
            ServiceIcon={FcElectricity}
            title="Electricity Sub"
            styles={cardStyles}
          />
        </Link>
        <Link href="/" className="w-full md:w-1/4">
          <ServiceCard
            ServiceIcon={RiCoupon2Fill}
            title="Scratch Card"
            styles={cardStyles}
          />
        </Link>
      </section>
      <section className="px-2 md:px-10 py-20">
        <h2 className="w-full font-bold text-2xl">FAQ</h2>
        <FAQ
          question="Is Alfasim Data reliable"
          answer="Yes, Alfasim data delivers a reliable and ..."
        />
        <FAQ
          question="Is Alfasim Data affordable"
          answer="Yes, Alfasim data delivers an affordable and ..."
        />
        <FAQ
          question="Is Alfasim Data reliable"
          answer="Yes, Alfasim data delivers a reliable and ..."
        />
      </section>
    </div>
  );
};

export default Dashboard;
