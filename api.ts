import axios from "axios";

const pvApi = axios.create({
    baseURL: "https://purrviews-api.onrender.com/api",
});

export const getPosts = () => {
    return pvApi.get("/posts").then((res) => res.data.posts);
};

export const getUsers = () => {
    return pvApi.get("/users").then((res) => res.data.users);
};