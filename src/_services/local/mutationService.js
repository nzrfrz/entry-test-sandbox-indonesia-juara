import { useMutation, useQueryClient, QueryCache } from "@tanstack/react-query";

import { openNotification } from "../../Pages/_Component";
// import { useGetUserEntryTest } from "../http/entryTestAuthUser";

export const useMutateData = (httpMethod, fetchFn, queryKey, formProps, apiNotif, setIsModalFormOpen = undefined, navigate = undefined, routePath = undefined) => {
    const httpMethodAlias = () => {
        switch (httpMethod) {
            case "post":
                return {
                    messageInfo: "Adding new data",
                    successDescription: "New data created successfully !!!",
                    errorDescription: "Failed to create new data, please try again later !!!"
                };
            case "put":
                return {
                    messageInfo: "Editing data",
                    successDescription: "Data edited successfully !!!",
                    errorDescription: "Failed to edit existing data, please try again later !!!"
                };
            case "delete":
                return {
                    messageInfo: "Deleting data",
                    successDescription: "Data deleted successfully !!!",
                    errorDescription: "Failed to delete existing data, please try again later !!!"
                };
            default:
                break;
        }
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fetchFn,
        onMutate: () => {
            // console.log("POSTING DATA: ");
            openNotification(apiNotif, queryKey.toString(), "info", httpMethodAlias().messageInfo, "Please do not close, change, or refresh the page !!");
        },
        onSuccess: (data) => {
            // console.log("POST SUCCESS: ", data);
            queryClient.invalidateQueries(queryKey, {exact: true});
            openNotification(apiNotif, queryKey.toString(), "success", "Success", httpMethodAlias().successDescription);
            if (navigate !== undefined) {
                return navigate(routePath); 
            }
            else if (setIsModalFormOpen !== undefined) {
                return setIsModalFormOpen(false);
            }
            else if (formProps !== undefined) {
                formProps?.resetFields();
            }
        },
        onError: (data) => {
            // console.log("POST ERROR: ", data);
            openNotification(apiNotif, queryKey.toString(), "error", "Error", httpMethodAlias().errorDescription);
        }
    });
};

export const useAuthMutate = (httpMethod, queryKey, fetchFn, lsKey, formProps, apiNotif, setIsModalFormOpen = undefined, navigateTo) => {
    // console.log(httpMethod);
    const queryCache = new QueryCache(); 
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fetchFn,
        onMutate: () => {
            // console.log("LOGGING IN: ");
            openNotification(apiNotif, httpMethod, "info", `Sedang ${httpMethod}`, "Jangan pergi kemana-mana ya!!");
        },
        onSuccess: (data) => {
            // console.log("LOGIN SUCCESS: ", data);
            formProps?.resetFields();
            openNotification(apiNotif, httpMethod, "success", "Success", `${httpMethod} Berhasil`);
            if (setIsModalFormOpen !== undefined) {
                setIsModalFormOpen(false);
            }
            else if (queryKey !== undefined) {
                queryClient.invalidateQueries(queryKey, {exact: true});
            }
            
            switch (true) {
                case httpMethod === "Login":
                    localStorage.setItem(lsKey, JSON.stringify(data));
                    break;
                case httpMethod === "Logout":
                    localStorage.clear();
                    queryCache.clear();
                    navigateTo("/");
                    break;
                default:
                    break;
            }
        },
        onError: (data) => {
            // console.log("LOGIN ERROR: ", data);
            openNotification(
                apiNotif, 
                httpMethod, 
                "error", 
                `${data?.response?.statusText}`, 
                `${data?.response?.data?.detail || data?.response?.data[0]}`
            );
        }
    });
};