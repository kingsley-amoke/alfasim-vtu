import React from "react";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
	return (
    <footer className="w-full ">
      <div className="w-full flex flex-col md:flex-row justify-evenly my-10 mx-2 md:ml-auto">
        <div className="w-full md:w-1/3 mx-2">
          <div className="font-bold">
            <Link href="/">
              <h2>ALFASIM TELECOM</h2>
            </Link>
          </div>
          <p className="my-5 text-wrap">
            Here at AlfasimData, we offer you the most affordable and most
            cheapest data, airtime, Dstv, Gotv and Startimes subscription... ..
          </p>
          <div className="hidden md:flex items-center gap-5">
            <a href="#">
              <FaFacebook className=" text-blue-700 text-3xl" />
            </a>
            <a href="#">
              <LiaLinkedin className="text-teal-800 text-3xl" />
            </a>
            <a href="#">
              <BsTwitterX className="text-3xl" />
            </a>
            <a href="#">
              <BsInstagram className=" text-red-500 text-3xl" />
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/6 mx-2">
          <h4 className="font-bold text-lg">Quick Links</h4>
          <ul className="py-5">
            <li>
              <a href="/">Home</a>
            </li>
            <li className="py-2">
              <a href="#services">Services</a>
            </li>
            <li className="pb-2">
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        </div>
        <hr className="md:hidden mb-5" />
        <div className="w-full md:w-1/6 mx-2">
          <h4 className="font-bold text-lg">Services</h4>
          <ul className="py-5">
            <li>
              <a href="/data">Data</a>
            </li>
            <li className="py-2">
              <a href="/airtime">Airtime</a>
            </li>
            <li className="pb-2">
              <a href="/cable-subscription">Cable Subscription</a>
            </li>
            <li>
              <a href="/bulk-sms">Bulk SMS</a>
            </li>
          </ul>
        </div>
        <hr className="md:hidden mb-5" />
        <div className="w-full md:w-1/6 mx-2">
          <h4 className="font-bold text-lg">Contact</h4>
          <p className="pt-5 pb-2">Phone: 08635465798</p>
          <p>email: alfasimdata@gmail.com</p>
        </div>
        <div className="flex md:hidden items-center gap-5 w-full justify-evenly mt-5">
          <a href="#">
            <FaFacebook className=" text-blue-700 text-3xl" />
          </a>
          <a href="#">
            <LiaLinkedin className="text-teal-800 text-3xl" />
          </a>
          <a href="#">
            <BsTwitterX className="text-3xl" />
          </a>
          <a href="#">
            <BsInstagram className=" text-red-500 text-3xl" />
          </a>
        </div>
      </div>
      <div
        className="p-10 bg-teal-800 dark:bg-slate-950 text-white text-center"
        id="footer"
      >
        <p>
          Copyright &copy; Designed and Developed by
          <a href="https://kinsleyamoke.netlify.app"> Smoq Dev</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
