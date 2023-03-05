import axios from "axios";
import { useEffect, useState } from "react";
import { useQueryData } from "../local/queryService";

export const useLocalToken = () => {
    const token = localStorage.getItem("token");

    return token;
};

export const entryTestLogin = async (formData) => {
    const response = await axios.post("https://api-entrytest.sandboxindonesia.id/api/auth/login/", formData);
    const data = response.data;

    return data;
};

export const entryTestLogout = async (formData) => {
    const response = await axios.post("https://api-entrytest.sandboxindonesia.id/api/auth/logout/", formData);
    const data = response.data;

    return data;
};

export const useGetUserEntryTest = (apiNotif = undefined, accessToken) => {
    // console.log("GET USER PROFILE", accessToken);
    const [data, setData] = useState(undefined);
    // console.log(data);

    const fetchData = async () => {
        axios.get("https://api-entrytest.sandboxindonesia.id/api/user/user/me/", {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchData();
    }, [accessToken]);

    return { data };
};

export const entryTestChangePassword = async (payload) => {
    const { dataForm, accessToken } = payload;
    const response = await axios.post("https://api-entrytest.sandboxindonesia.id/api/user/user/change-password/", dataForm, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    });

    const data = response.data;

    return data;
};

export const entryTestChangeProfile = async (payload) => {
    const { dataForm, accessToken } = payload;
    const response = await axios.patch("https://api-entrytest.sandboxindonesia.id/api/user/user/me/", dataForm, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    const data = response.data;

    return data;
};