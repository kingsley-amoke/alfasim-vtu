import Image from "next/image";
import React from "react";

const PriceCard = ({ image }: { image: string }) => {
	return (
		<div className="bg-teal-800">
			<Image src={image} alt="dataImage" width={300} height={100} />
		</div>
	);
};

export default PriceCard;
