import { serviceCardTypes } from "@/lib/types";
import React from "react";

const ServiceCard = ({
	ServiceIcon,
	title,
	desc,
	styles,
}: serviceCardTypes) => {
	return (
		<div className={styles}>
			<div className="w-12 h-12 dark:w-20 rounded-full flex justify-center items-center">
				<ServiceIcon className="text-lg dark:text-teal-800"  size={40} />
			</div>
			<h3 className="font-bold text-lg">{title}</h3>
			<p>{desc}</p>
		</div>
	);
};

export default ServiceCard;
