import axios from "axios";
import { FACEBOOK_CLONE_ENDPOINT } from "../consts";

export const createPost = (formData : any) => {
    return axios.post(FACEBOOK_CLONE_ENDPOINT + "/post", formData, {
        headers: { Accept: "application/json" },
    });
}

export const getAllPosts = () => {
    return axios.get(FACEBOOK_CLONE_ENDPOINT + "/post");
}

export const createOrUpdateUser = (userData : any) => {
    axios.put(FACEBOOK_CLONE_ENDPOINT + "/user/get", userData, {
        headers: { Accept: "application/json" },
    });
}