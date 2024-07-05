import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/lib/ui/drawer";
import { Button } from "@/lib/ui/button";

import { FaSignal } from "react-icons/fa";
import { FcElectricity } from "react-icons/fc";
import { LuRadioReceiver } from "react-icons/lu";
import { RiCoupon2Fill } from "react-icons/ri";
import { AiOutlineClose, AiOutlineTransaction } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { TiTicket } from "react-icons/ti";
import {
  BiHome,
  BiMenu,
  BiPhoneCall,
  BiSolidWalletAlt,
  BiWalletAlt,
} from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { userDataTypes } from "@/lib/types";


	const sidebarLInks = [
    {
      link: "/dashboard",
      title: "Dashboard",
      icon: BiHome,
    },
    {
      link: "/data",
      title: "Buy Data",
      icon: FaSignal,
    },
    {
      link: "/airtime",
      title: "Buy Airtime",
      icon: BiPhoneCall,
    },
    {
      link: "/convert-airtime",
      title: "Sell Airtime",
      icon: BiHome,
    },
    {
      link: "/electricity",
      title: "Electricity",
      icon: FcElectricity,
    },
    {
      link: "/result-checker",
      title: "Result Checker",
      icon: RiCoupon2Fill,
    },
    {
      link: "/cable-subscription",
      title: "Cable",
      icon: LuRadioReceiver,
    },
    {
      link: "/data-transactions",
      title: "Transactions",
      icon: AiOutlineTransaction,
    },
    {
      link: "/airtime-transactions",
      title: "Airtime Transactions",
      icon: TiTicket,
    },
    {
      link: "/wallet-summary",
      title: "Wallet Summary",
      icon: BiSolidWalletAlt,
    },
    {
      link: "/recharge",
      title: "Fund Wallet",
      icon: BiWalletAlt,
    },
  ];



const DrawerWrapper = ({
  user,
}: {
  user?: userDataTypes;
}) => {
  const path = usePathname();
  return (
    <div >
      <Drawer direction={"left"}>
        <DrawerTrigger >
          <BiMenu size={40} />
        </DrawerTrigger>
        <DrawerContent className="bg-teal-800 text-white w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <DrawerHeader>
            <DrawerTitle>
              <DrawerClose>
                <Button
                  variant="outline"
                  className="flex justify-center items-center"
                >
                  <AiOutlineClose size={30} className="text-black dark:text-white"/>
                </Button>
              </DrawerClose>
            </DrawerTitle>
            <DrawerDescription className="overflow-y-scroll w-full">
              <div className="w-full flex justify-center items-center gap-5 py-3">
                <div>
                  <RxAvatar size={50} />
                </div>
                <div>
                  <p className="text-md text-white capitalize">
                    {user?.username}
                  </p>
                  <p>{`NGN ${user?.balance}`}</p>
                </div>
                <hr />
              </div>
              { user?.is_admin ?
                (<div className="flex justify-center items-center">
                <div className="flex justify-center items-center text-white border border-white py-2 px-3 w-1/2 rounded-md dark hover:bg-teal-500">
                  <Link href={'/admin'}>
                    Admin
                  </Link>
                </div>
                </div>): null
}
              <div>
                <ul className="flex flex-col gap-5 py-10">
                  {sidebarLInks.map((item) => (
                    <li
                      key={item.title}
                      className={`${
                        path == item.link
                          ? "bg-white rounded-md text-black px-2"
                          : "hover:bg-teal-500 text-white rounded-md px-2"
                      } mx-5 py-3`}
                    >
                      <Link
                        href={item.link}
                        className="flex gap-5 justify-between items-center text-md md:text-2xl"
                      >
                        {<item.icon />}
                        <div className="flex justify-start w-full md:w-[80%] text-left">
                          {item.title}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerWrapper

