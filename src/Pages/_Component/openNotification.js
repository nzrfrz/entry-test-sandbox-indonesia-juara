export const openNotification = (apiNotif, key, iconType, responseTitleMessage, responseDescMessage) => {
    // iconType = success, error, info, warning
    apiNotif[iconType]({
        key,
        message: responseTitleMessage,
        description: responseDescMessage,
        placement: "bottomRight"
    });
};