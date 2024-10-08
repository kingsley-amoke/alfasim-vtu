"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FaPhoneVolume, FaSignal } from "react-icons/fa";
import { FaSms } from "react-icons/fa";
import { LuRadioReceiver } from "react-icons/lu";
import ServiceCard from "@/app/components/ServiceCard";

export default function EmblaCarousel() {
	const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

	const services = [
		{
			image: FaSignal,
			title: "Data",
			desc: "Enjoy data at a very low and affordable rate.",
		},
		{
			image: FaPhoneVolume,
			title: "Airtime",
			desc: "Enjoy airtime at a very low and afffordable rate.",
		},
		{
			image: LuRadioReceiver,
			title: "Cable Subscription",
			desc: "Enjoy instant cable subscriptions such as GoTV, startimes and DSTV at a very low rate.",
		},
		{
			image: FaSms,
			title: "Bulk SMS",
			desc: "send bulk SMS to as many people as possible.",
		},
	];

	const cardStyles =
		"bg-teal-800 text-white h-full w-full rounded-lg p-3 md:p-10 flex flex-col gap-10";

	return (
		<div className="w-full md:w-1/3 overflow-hidden" ref={emblaRef}>
			<div className="flex">
				{services.map((item, index) => (
					<div className="min-w-0 grow-0 shrink-0 basis-full px-5" key={index}>
						<ServiceCard
							ServiceIcon={item.image}
							title={item.title}
							desc={item.desc}
							styles={cardStyles}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
