import axios from "axios";
import { useQueryData } from "./queryService";
import { 
    getIndonesiaRegionData, 
    getDialCode,
    getUserProfile,
    useLocalToken,
    getTourismObject,
    getTourismObjectCategories,
    getTourismObjectMapBoundaries,
    entryTestGetUser,
    useGetUserEntryTest
} from "../http";

export const useParallelFetching = (apiNotif, localToken) => {
    // useQueryData(["indonesiaRegionData"], getIndonesiaRegionData, apiNotif);
    // useQueryData(["phoneDialCode"], getDialCode, apiNotif);
    useQueryData(["localToken"], useLocalToken, apiNotif);
    useQueryData(["tourismObjectCategory"], getTourismObjectCategories, apiNotif);
    useQueryData(["borderLine"], getTourismObjectMapBoundaries, apiNotif);
    // console.log(localToken);
    // useGetUserEntryTest(undefined, localToken);

    useQueryData(["tourismObjectList"], getTourismObject, apiNotif);
};