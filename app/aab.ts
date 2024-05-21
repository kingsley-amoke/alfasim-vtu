"use server";

// get networks and ther ids

import axios from "axios";
import { NODE_RESOLVE_OPTIONS } from "next/dist/build/webpack-config";

export const getDataList = async() => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 34851307c58aeebfc0f4dec980e9cacee77e86c9`,
        },
    }
    await axios.get(' https://asbdata.com/api/data', options).then(res => console.log(res)).catch(err => console.log(err))
}