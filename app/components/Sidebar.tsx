"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
	BiHome,
	BiPhoneCall,
	BiSolidWalletAlt,
	BiWalletAlt,
} from "react-icons/bi";
import { FaSignal } from "react-icons/fa";
import { FcElectricity } from "react-icons/fc";
import { LuRadioReceiver } from "react-icons/lu";
import { RiCoupon2Fill } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { TiTicket } from "react-icons/ti";

const Sidebar = ({ user }: { user: { username: string; balance: string } }) => {
	const path = usePathname();

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
			title: "Airtime To Cash",
			icon: BiHome,
		},
		{
			link: "/electricity-subscription",
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
			title: "Airtime transaction",
			icon: TiTicket,
		},
		{
			link: "/wallet-summary",
			title: "Wallet Summary",
			icon: BiSolidWalletAlt,
		},
		{
			link: "/fund-wallet",
			title: "Fund Wallet",
			icon: BiWalletAlt,
		},
	];

	return (
		<div className="flex flex-col gap-2 bg-teal-800 text-gray-400 pt-32 w-full">
			<div className="w-full flex justify-center items-center gap-5 py-3">
				<div>
					<RxAvatar size={50} />
				</div>
				<div>
					<p className="text-md text-white capitalize">{user?.username}</p>
					<p>{`NGN ${user?.balance}`}</p>
				</div>
				<hr />
			</div>
			<div>
				<ul className="flex flex-col gap-5 py-10">
					{sidebarLInks.map((item) => (
						<li
							key={item.title}
							className={`${
								path == item.link
									? "bg-white rounded-md text-black px-2"
									: "hover:bg-teal-500 hover:text-white rounded-md px-2"
							} mx-5 py-3`}
						>
							<Link
								href={item.link}
								className="flex gap-2 justify-between items-center text-2xl"
							>
								{<item.icon />}
								<div className="flex justify-start w-[80%]">{item.title}</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
