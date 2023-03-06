import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useQueryData, useQueryDataWithToken } from "./queryService";
import { 
    getIndonesiaRegionData, 
    getDialCode,
    getUserProfile,
    useLocalToken,
    getTourismObject,
    getTourismObjectMe,
    getTourismObjectCategories,
    getTourismObjectMapBoundaries,
    entryTestGetUser,
    useGetUserEntryTest,
    useChekTokenValidity
} from "../http";

const getUserPath = "https://api-entrytest.sandboxindonesia.id/api/user/user/me/";
const getTourismObjectMePath = "https://api-entrytest.sandboxindonesia.id/api/tourist-object/tourist-object/me/?me=true";

export const useParallelFetching = (apiNotif) => {
    const token = JSON.parse(useLocalToken())?.access;
    const refresh = JSON.parse(useLocalToken())?.refresh;
    // console.log(token);

    useQueryData(["token"], useLocalToken, undefined);
    useQueryData(["tourismObjectCategory"], getTourismObjectCategories, apiNotif);
    useQueryData(["borderLine"], getTourismObjectMapBoundaries, apiNotif);
    // console.log(localToken);

    useQueryData(["tourismObjectList"], getTourismObject, apiNotif);
    // useQueryData(["tourismObjectListMe"], getTourismObjectMe, apiNotif);
    useQueryDataWithToken(["userProfile"], getUserPath, undefined, token, refresh, axios);
    useQueryDataWithToken(["tourismObjectListMe"], getTourismObjectMePath, undefined, token, refresh, axios);
};