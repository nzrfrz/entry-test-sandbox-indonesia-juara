export const themeToken = (isDarkMode) => {
    return {
        fontFamily: "Poppins",
        colorBgContainer: isDarkMode === true ? "#121518" : "#f3f4f6",
        colorPrimary: '#F7911A',
        colorPrimaryHover: "#C67415",
        colorBgContainerDisabled: "#FBC88C"
    }
};