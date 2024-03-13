import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
};


export const fetchDataFromApi = async (endpoint, queryParams) => {
    try {

        const params = queryParams ? { ...queryParams } : {};
        params.language = "tr-TR";
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            headers,
            params,
        });

        return response.data;
        } catch (error) {
        return null;
    }
};
