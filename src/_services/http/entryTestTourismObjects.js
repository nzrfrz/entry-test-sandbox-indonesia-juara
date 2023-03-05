import axios from "axios";

export const getTourismObject = async () => {
    const response = await axios.get("https://api-entrytest.sandboxindonesia.id/api/tourist-object/tourist-object/");
    const dataResponse = response.data.data;

    return dataResponse;
};

export const getTourismObjectCategories = async () => {
    const response = await axios.get("https://api-entrytest.sandboxindonesia.id/api/datamaster/tourist-object-category/");
    const dataResponse = response.data.data;
    // console.log(dataResponse);

    return dataResponse;
};

export const getTourismObjectMapBoundaries = async () => {
    const response = await axios.get("https://api-entrytest.sandboxindonesia.id/api/datamaster/borderline/");
    const dataResponse = response.data.data;
    // console.log(dataResponse);

    return dataResponse;
};

export const entryTestTourismSpotNew = async (payload) => {
    const { dataForm, accessToken } = payload;
    const response = await axios.post("https://api-entrytest.sandboxindonesia.id/api/tourist-object/tourist-object/", dataForm, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    const data = response.data;

    return data;
};

export const entryTestTourismSpotEdit = async (payload) => {
    const { dataForm, accessToken, slug } = payload;
    // console.log(accessToken);
    const response = await axios.put(`https://api-entrytest.sandboxindonesia.id/api/tourist-object/tourist-object/${slug}/`, dataForm, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    const data = response.data;

    return data;
};