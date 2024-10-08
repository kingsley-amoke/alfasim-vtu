"use client";
import React from "react";

import {
	CompleteResponesProps,
	MonnifyProps,
	UserCancelledResponseProps,
	usePayWithMonnifyPayment,
} from "react-monnify-ts";

const MonnifyPage = ({ config }: { config: MonnifyProps }) => {
	const onLoadStart = () => {
		console.log("loading started");
	};

	const onLoadComplete = () => {
		console.log("SDK is UP");
	};

	const onComplete = (res: CompleteResponesProps) => {
		//Implement what happens when the transaction is completed.
		console.log("response", res);
	};

	const onClose = (data: UserCancelledResponseProps) => {
		//Implement what should happen when the modal is closed here
		console.log("data", data);
	};

	const initializePayment = usePayWithMonnifyPayment(config);

	return (
		<div>
			<button
				onClick={() => {
					initializePayment(onLoadStart, onLoadComplete, onComplete, onClose);
				}}
			>
				Pay With Monnify
			</button>
		</div>
	);
};

export default MonnifyPage;
