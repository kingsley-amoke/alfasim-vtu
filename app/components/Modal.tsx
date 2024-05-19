"use client";

import React, { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { modalProps } from "@/lib/types";

const Modal = ({ title, children }: modalProps) => {
	const searchParams = useSearchParams();
	const dialogRef = useRef<null | HTMLDialogElement>(null);
	const showDialog = searchParams.get("showDialog");

	useEffect(() => {
		if (showDialog === "y") {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [showDialog]);

	const closeDialog = () => {
		dialogRef.current?.close();
	};

	const clickOk = () => {
		closeDialog();
	};

	const dialog: JSX.Element | null =
		showDialog === "y" ? (
			<dialog
				ref={dialogRef}
				className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-xl dark:backdrop:bg-slate-950/90 backdrop:bg-gray-800/80"
			>
				<div className="w-[500px] max-w-full dark:bg-black bg-gray-200 flex flex-col pt-5">
					<div className="flex justify-between mb-4 pt-2 px-5">
						<h1 className="text-2xl">{title}</h1>
						<button
							onClick={closeDialog}
							className="flex justify-center items-center mb-2 py-1 px-2 cursor-pointer border-none rounded w-8 h-8 font-bold bg-red-600 dark:bg-black text-white dark:border dark:rounded-full"
						>
							x
						</button>
					</div>
					<div className="px-5 pb-6">
						{children}
						<div className="flex justify-end ">
							<button
								onClick={clickOk}
								className="py-2 px-4 bg-teal-800 dark:bg-black dark:border rounded-md text-white mt-20"
							>
								Continue to Dashboard
							</button>
						</div>
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
