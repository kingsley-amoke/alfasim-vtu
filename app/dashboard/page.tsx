import React from "react";

import HomePage from "../components/HomePage";
import { useUserStore, useUsersStore } from "@/lib/store";
import { fetchAllUsers, fetchUser, getLoggedUser } from "@/lib/data";

const page = async () => {



	return (
		<div>
			<HomePage />
		</div>
	);
};

export default page;
