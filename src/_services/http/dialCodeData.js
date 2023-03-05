import axios from "axios";

export const getDialCode = async () => {
    // console.log("GET DIAL CODE DATA");
    const response = await axios.get(`https://raw.githubusercontent.com/nzrfrz/nzrfrz/main/master-data/phone-dial-code.json`);
    const data = response.data;

    return data;
};