import React from "react";
import ServiceCard from "./ServiceCard";
import { FaPhoneVolume, FaSignal } from "react-icons/fa";
import { FaSms } from "react-icons/fa";
import { LuRadioReceiver } from "react-icons/lu";

import EmblaCarousel from "../../lib/ui/Embla";

const Services = () => {
	const services = {
		data: {
			image: FaSignal,
			title: "Data",
			desc: "Enjoy data at a very low and affordable rate.",
		},
		airtime: {
			image: FaPhoneVolume,
			title: "Airtime",
			desc: "Enjoy airtime at a very low and afffordable rate.",
		},
		cable: {
			image: LuRadioReceiver,
			title: "Cable Subscription",
			desc: "Enjoy cable topups, GoTV and DSTV at a very low rate.",
		},
		bulkSMS: {
			image: FaSms,
			title: "Bulk SMS",
			desc: "send bulk SMS to as many people as possible.",
		},
	};

	const cardStyles =
		"bg-teal-800 dark:bg-black dark:border text-white h-full w-full rounded-lg p-3 md:p-10 flex flex-col gap-10";

	return (
		<div
			className="flex flex-col justify-center items-center w-[90%] mt-10 transition-all duration-500"
			id="services"
		>
			<h2 className="uppercase font-bold text-xl text-center mb-10">
				Our Services
			</h2>

			<div className="lg:hidden px-2 w-full">
				<EmblaCarousel />
			</div>
			<div className="hidden lg:flex gap-10 w-full px-2">
				<ServiceCard
					styles={cardStyles}
					ServiceIcon={services.data.image}
					desc={services.data.desc}
					title={services.data.title}
				/>
				<ServiceCard
					styles={cardStyles}
					ServiceIcon={services.airtime.image}
					desc={services.airtime.desc}
					title={services.airtime.title}
				/>
				<ServiceCard
					styles={cardStyles}
					ServiceIcon={services.cable.image}
					desc={services.cable.desc}
					title={services.cable.title}
				/>
				<ServiceCard
					styles={cardStyles}
					ServiceIcon={services.bulkSMS.image}
					desc={services.bulkSMS.desc}
					title={services.bulkSMS.title}
				/>
			</div>
		</div>
	);
};

export default Services;
