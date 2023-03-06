import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { openNotification } from "../../Pages/_Component";

import { useAuthMutate } from "./mutationService";
import { entryTestLogout } from "../http";

export const useQueryData = (queryKey, queryFn, apiNotif) => {
    const queryData = useQuery({
        queryKey,
        queryFn,
        // staleTime: 60000,
        onError: (error) => {
            if (apiNotif !== undefined) {
                openNotification(apiNotif, queryKey.toString(), "error", error?.response?.data, "User Profile data couldn't be load, please refresh your browser");
            }
        }
    });

    return queryData;
};

export const useQueryDataWithToken = (queryKey, basePath, apiNotif, token, refresh, axios) => {
    const navigateTo = useNavigate();

    const queryData = useQuery({
        queryKey,
        queryFn: async () => {
            const response = await axios.get(basePath, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
        
            const responseData = response.data.data;
            // console.log("QUE SERVICE: ", response);
        
            return responseData;
        },
        enabled: !!token,
        onError: async (error) => {
            localStorage.clear();
            navigateTo("/");
            // const response = await axios.post("https://api-entrytest.sandboxindonesia.id/api/auth/refresh/", token);
            // const lsRenew = {
            //     refresh,
            //     access: response.data.access
            // }
            // localStorage.setItem("token", JSON.stringify(lsRenew));
            // console.log(response.data);

            if (apiNotif !== undefined) {
                openNotification(apiNotif, "Data User", "error", "Error", "User Profile data couldn't be load, please refresh your browser");
            }
        },
    });

    return queryData;
};

// export const useChekTokenValidity = (apiNotif, token, axios) => {
//     const queryData = useQuery({
//         queryKey: ["userProfile"],
//         queryFn: async () => {
//             const response = await axios.get("https://api-entrytest.sandboxindonesia.id/api/user/user/me/", {
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                 }
//             });
        
//             const responseData = response.data.data;
        
//             return responseData;
//         },
//         enabled: token !== undefined,
//         onError: (error) => {
//             if (apiNotif !== undefined) {
//                 openNotification(apiNotif, "Data User", "error", error?.response?.data, "User Profile data couldn't be load, please refresh your browser");
//             }
//         }
//     });

//     return queryData;
// };

export const useCachedData = (queryKey) => {
    // to set loading, use .fetchStatus === "fetching"
    const queClient = useQueryClient();
    const query = queClient.getQueryState(queryKey);

    return query;
};