import axios from "axios";

const pvApi = axios.create({
    baseURL: 'https://purrviews-api.onrender.com/api'
});