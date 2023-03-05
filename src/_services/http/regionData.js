import axios from "axios";

export const getIndonesiaRegionData = async () => {
    // console.log("GET REGION DATA");
    const response = await axios.get(`https://raw.githubusercontent.com/nzrfrz/indonesiaRegionsDatas/main/listAllGeo.json`);
    const data = response.data;

    return data;
};