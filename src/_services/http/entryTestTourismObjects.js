import axios from "axios";
import L from "leaflet";

export const getTourismObject = async () => {
    const response = await axios.get("https://api-entrytest.sandboxindonesia.id/api/tourist-object/tourist-object/");
    const dataResponse = response.data.data;

    return dataResponse;
};

export const getTourismObjectMe = async (accessToken) => {
    const response = await axios.get("https://api-entrytest.sandboxindonesia.id/api/tourist-object/tourist-object/me/?me=true", {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    });
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
    // const dataResponse = response.data.data;
    let coordinatesData = response.data.data.coordinates;

    for (let i = 0; i < coordinatesData[0]?.length; i++) {
        const arrayToSwap = coordinatesData[0][i];
        coordinatesData[0][i] = [arrayToSwap[1], arrayToSwap[0]];
    };

    const { _northEast, _southWest } = L.polygon(coordinatesData).getBounds();
    const bounds = [
        [_northEast.lat, _northEast.lng],
        [_southWest.lat, _southWest.lng]
    ];
    // console.log(dataResponse);

    return { coordinatesData, bounds };
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
    const response = await axios.put(`https://api-entrytest.sandboxindonesia.id/api/tourist-object/tourist-object/${slug}/`, dataForm, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    const data = response.data;

    return data;
};

export const entryTestTourismSpotDelete = async (payload) => {
    const { accessToken, slug } = payload;
    const response = await axios.delete(`https://api-entrytest.sandboxindonesia.id/api/tourist-object/tourist-object/${slug}/`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            // 'Content-Type': 'multipart/form-data'
        }
    });

    const data = response.data;

    return data;
};