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

export const getUsersByUsername = (username) => {
	return pvApi.get(`/users/${username}`).then((res) => res.data.users);
};

export const getLostCats = () => {
	return pvApi.get("/cats/missing").then((res) => res.data.users);
};

export const postUser = (user = {}) => {
	return pvApi.post("/users", user).then((res) => res.data.user);
};
export const postPost = (newPost) => {
	return pvApi.post("/posts", newPost).then((res) => res.data.post);
};

export const postCat = (username, cat) => {
	return pvApi.post(`/users/${username}`).then((res) => {
		console.log(res.data);
	});
};
