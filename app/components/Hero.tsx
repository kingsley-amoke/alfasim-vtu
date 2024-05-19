import Image from "next/image";
import React from "react";

const Hero = () => {
	return (
		<div className="md:h-screen w-full bg-teal-800 dark:bg-black flex justify-between items-center md:gap-64 p-10 text-white">
			<div className="flex flex-col md:gap-32 gap-10">
				<h2 className="uppercase font-bold md:text-5xl">
					Welcome to Alfasim Data
				</h2>
				<p className="md:text-2xl">
					We offer the most affordable and cheapest data, airtime, cable
					subscription, electricity subscription, bulk sms. Convert airtime to
					money.
				</p>
			</div>
			<div className="hidden md:flex h-full w-full">
				<Image src="/logo.jpg" alt="hero" width={600} height={100} />
			</div>
		</div>
	);
};

export default Hero;
