import axios from "axios";

export const getUserProfile = async () => {
    // console.log("FETCHING USER PROFILE");
    const response = await axios.get("https://63f81faf5b0e4a127de07431.mockapi.io/user/profile");
    const data = response.data;

    return data;
};

export const postUserProfile = async (formData) => {
    const { payload } = formData;
    // console.log(payload);
    const response = await axios.post("https://63f81faf5b0e4a127de07431.mockapi.io/user/profile", payload);
    const data = response;

    return data;
};

export const putUserProfile = async (formData, id) => {
    const { payload, dataID } = formData;
    // console.log(payload);
    // console.log(dataID);
    const response = await axios.put(`https://63f81faf5b0e4a127de07431.mockapi.io/user/profile/${dataID}`, payload);
    const data = response;

    return data;
};

export const deleteUserProfile = async (id) => {
    const response = await axios.delete(`https://63f81faf5b0e4a127de07431.mockapi.io/user/profile/${id}`);
    const data = response;

    return data;
};