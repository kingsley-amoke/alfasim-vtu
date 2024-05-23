"use client";

import React, { useState } from "react";

import { planTypes, userDataTypes } from "@/lib/types";

const SubscribeCable = ({user}: {user: userDataTypes}) => {
	const [plan, setPlan] = useState<planTypes[]>([{ plan: "", price: "" }]);

	//DSTV plans

	const DSTVPlans: planTypes[] = [
		{ plan: "DSTV Great Wall Standalone", price: "1500" },
		{ plan: "DSTV Padi", price: "3000" },
		{ plan: "DSTV ExtraView Access", price: "4100" },
		{ plan: "DSTV HDPVR Access Service", price: "4100" },
		{ plan: "DSTV Yanga", price: "4300" },
		{ plan: "DSTV Padi + ExtraView ", price: "5900" },
		{ plan: "DSTV Yanga + ExtraView", price: "6900" },
		{ plan: "DSTV Confam", price: "7500" },
		{ plan: "Asian Bouqet", price: "8300" },
		{ plan: "DSTV Asia", price: "8300" },
		{ plan: "DSTV Confam + ExtraView", price: "9600" },
		{ plan: "DSTV Compact", price: "12600" },
		{ plan: "DSTV Compact Plus - ExtraView", price: "17150" },
		{ plan: "DSTV Compact Plus", price: "19900" },
		{ plan: "DSTV Compact + ExtraView", price: "20000" },
		{ plan: "DSTV Premium Asia", price: "27500" },
		{ plan: "DSTV Premium + ExtraView", price: "27900" },
		{ plan: "DSTV Premium", price: "29600" },
		{ plan: "DSTV Premium French", price: "36600" },
	];

	//GOTV plan

	const GOTVPlans: planTypes[] = [
		{ plan: "GoTV Smallie", price: "300" },
		{ plan: "GoTV Jinja", price: "700" },
		{ plan: "GoTV Smallie Quarterly", price: "1000" },
		{ plan: "GoTV Jollie", price: "3000" },
		{ plan: "GoTV Max", price: "3000" },
		{ plan: "GoTV Smallie Annually", price: "3000" },
	];

	//Startimes plans

	const StartimesPlans: planTypes[] = [
		{ plan: "Nova", price: "1500" },
		{ plan: "Basic", price: "2600" },
		{ plan: "Smart", price: "3500" },
		{ plan: "Classic", price: "3800" },
		{ plan: "Super", price: "6500" },
	];

	const networkStyle =
		"w-full md:w-1/3 p-2 flex justify-between items-center border border-teal-800 text-sm bg-white";

	const inputStyle =
		"outline-none border border-teal-800 dark:border-white p-2 rounded-sm w-full";

	const handleProviderSelect = (value: string) => {
		switch (value) {
			case "dstv":
				setPlan(DSTVPlans);
				break;
			case "gotv":
				setPlan(GOTVPlans);
				break;
			case "startimes":
				setPlan(StartimesPlans);
				break;
			default:
				setPlan([{ plan: "", price: "" }]);
		}
	};

	const handleSubmitForm = (formData: FormData) => {
		let provider = formData.get("provider");

		let plan = formData.get("cable-plan");

		let iucNumber = formData.get("iuc-number");

		const dataInfo = {
			provider: provider,
			plan: plan,
			iucNumber: iucNumber,
		};

		console.log(dataInfo);
	};

	return (
		<div className="flex flex-col justify-start items-center h-screen ml-10 mr-5">
			<form
				action={handleSubmitForm}
				className="w-full border border-teal-800 dark:border-white flex flex-col gap-2 p-5 mt-5 pt-20 bg-gray-200 dark:bg-black"
			>
				<label htmlFor="provider">Provider*</label>
				<select
					name="provider"
					id="provider"
					className={inputStyle}
					onChange={(e) => handleProviderSelect(e.target.value)}
				>
					<option value="default">-----</option>
					<option value="dstv">DSTV</option>
					<option value="gotv">GOTV</option>
					<option value="startimes">Startimes</option>
				</select>
				<label htmlFor="cable-plan">Cable Plan*</label>
				<select name="cable-plan" id="cable-plan" className={inputStyle}>
					{/* <option value="default">-----</option> */}
					{plan.map((plan) => (
						<option value={plan.plan} className="flex items-center">
							{plan.plan}
							{"--------"}
							{plan.price}
						</option>
					))}
				</select>
				<label htmlFor="iuc-number">IUC Number*</label>
				<input
					type="text"
					name="iuc-number"
					placeholder="1234456"
					className={inputStyle}
				/>

				<input
					type="submit"
					value="Validate"
					className="hover:bg-teal-800 py-2 px-6 hover:text-white bg-white border hover:border-white border-teal-800 text-teal-800 rounded-md md:w-1/5"
				/>
			</form>
			<div className="w-1/2 md:w-1/5 border border-teal-800 dark:border-white py-2 md:py-5 px-5 md:px-10 dark:bg-black bg-teal-800 text-white rounded-md  text-center absolute top-[8.5rem] md:top-[8rem]">
				Cable Subscription
			</div>
		</div>
	);
};

export default SubscribeCable;
