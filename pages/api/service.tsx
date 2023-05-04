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
    return axios.put(FACEBOOK_CLONE_ENDPOINT + "/user/get", userData, {
        headers: { Accept: "application/json" },
    });
}

export const getAllUsers = (email : string) => {
    return axios.get(FACEBOOK_CLONE_ENDPOINT + "/user/getAllUsers/" + email);
}

export const getUserById = (id : string) => {
    return axios.get(FACEBOOK_CLONE_ENDPOINT + "/user/getUserById/" + id);
}

export const sendMessageToUser = (senderId: string, receiverId : string, grouper : string | null, message : string, isImp : any) => {
    return axios.post(FACEBOOK_CLONE_ENDPOINT + "/message/post/", {senderId, receiverId, message, grouper, isImp }, {
        headers : {Accept : "application/json"}
    });
}

export const getAllMessages = (userId : string) => {
    return axios.get(FACEBOOK_CLONE_ENDPOINT + "/message/get/" + userId);
}