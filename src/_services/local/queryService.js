import { useQuery, useQueryClient } from "@tanstack/react-query";

import { openNotification } from "../../Pages/_Component";

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

export const useCachedData = (queryKey) => {
    // to set loading, use .fetchStatus === "fetching"
    const queClient = useQueryClient();
    const query = queClient.getQueryState(queryKey);

    return query;
};