"use client";

import React, { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { modalProps } from "@/lib/types";
import { useUserStore } from "@/lib/store";

const Modal = ({title, children, showDialog, dialogRef, closeDialog }: modalProps) => {

	

	const dialog: JSX.Element | null =
		showDialog === "y" ? (
			<dialog
				ref={dialogRef}
				className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-xl dark:backdrop:bg-slate-950/90 backdrop:bg-gray-800/80 h-1/2 md:h-1/2"
			>
				<div className="w-[500px] max-w-full h-full dark:bg-black bg-gray-200 flex flex-col">
					<div className="flex justify-between mb-4 pt-5 px-5 h-full">
						<h1 className=" text-xl md:text-2xl">{ title}</h1>
						<button
							onClick={closeDialog}
							className="flex justify-center items-center mb-2 py-1 px-2 cursor-pointer border-none rounded w-6 md:w-8 h-6 md:h-8 font-bold bg-red-600 dark:bg-black text-white dark:border dark:rounded-full"
						>
							x
						</button>
					</div>
					<div className="px-5 pb-6">
						{children}
						
					</div>
				</div>
			</dialog>
		) : null;

	return dialog;
};

export default Modal;

{
	/* <div className=" h-screen w-full flex justify-center items-center opacity-50 bg-black">
					<div className="flex flex-col justify-center items-center shadow-lg rounded-md shadow-black h-1/2 w-1/2 bg-white">
						<h2 className="mb-10 text-2xl font-bold">
							Welcome to Alfasim Data!!!
						</h2>
						<p>
							We provide best and cheapest data, airtime, and cable
							subscription. <br />
							For complaint, contact our support team. <br />
							<br />
							<a href="tel:+8038095687">08038095687</a>
						</p>
						<button
							className="py-2 px-4 bg-teal-800 rounded-md text-white mt-20"
							onClick={() => setShowModal(false)}
						>
							Continue to Dashboard
						</button> */
}
