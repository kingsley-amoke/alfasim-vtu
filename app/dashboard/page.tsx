import React from "react";

import HomePage from "../components/HomePage";
import { useUserStore, useUsersStore } from "@/lib/store";
import { fetchAllUsers, fetchUser, getLoggedUser } from "@/lib/data";

const page = async () => {


const {setUsers } = useUsersStore()
const {setUser} = useUserStore()

const res = await fetchAllUsers()
const users = res!

const loggedUser =  await getLoggedUser()


setUser(loggedUser!)
setUsers(users)


	

	return (
		<div>
			<HomePage />
		</div>
	);
};

export default page;
