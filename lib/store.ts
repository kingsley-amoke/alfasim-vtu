import { userDataTypes } from "./types";
import { create } from "zustand";


interface UsersStore{
    users: userDataTypes[]
    setUsers: (users: userDataTypes[]) => void
}

interface UserStore{
    user: userDataTypes
    setUser: (user: userDataTypes) => void
}


export const useUsersStore = create<UsersStore>(set => ({

    users : [],
    setUsers: (users) => {
        set(state => {

            state.users = users

            return {
                users: state.users
            }
        })
    }
}))

export const useUserStore = create<UserStore>(set => ({
    user : {} as userDataTypes,
    setUser: (user) => {
        set(state => {

            state.user = user

            return {
                user: state.user
            }
        })
    }
}))