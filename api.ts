import axios from "axios";

const pvApi = axios.create({
    baseURL: 'https://purrviews-api.onrender.com/api'
});

export const postUsers = (body: any) => pvApi.post("/users", body);

export const getUser = (username: string) => pvApi.get(`/users/${username}`);