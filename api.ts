import axios from "axios";

const pvApi = axios.create({
    baseURL: 'https://purrviews-api.onrender.com/api'
});

export const postUsers = (body: any) => pvApi.post("/users", body);

export const postCat = (username: string, body = {}) =>
	pvApi.post(`/users/${username}/cats`, body);