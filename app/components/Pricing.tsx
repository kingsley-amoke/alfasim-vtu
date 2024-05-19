import React from "react";
import PriceCard from "./PriceCard";

const dataPrices = {
	mtn: {
		image: "/mtn_banner.jpg",
	},
	airtel: {
		image: "/airtel_banner.jpg",
	},
	glo: {
		image: "/glo_banner.jpg",
	},
	etisalat: {
		image: "/9mobile_banner.jpg",
	},
};

const Pricing = () => {
	return (
		<div className="w-full  mt-10 transition-all duration-500" id="pricing">
			<h2 className="uppercase font-bold text-xl text-center">Our Prices</h2>
			<div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-10 w-full p-10">
				<PriceCard image={dataPrices.mtn.image} />
				<PriceCard image={dataPrices.airtel.image} />
				<PriceCard image={dataPrices.glo.image} />
				<PriceCard image={dataPrices.etisalat.image} />
			</div>
		</div>
	);
};

export default Pricing;
