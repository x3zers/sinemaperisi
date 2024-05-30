import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const IPAPI_URL = "https://ipapi.co/json/";
const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
};

const getBrowserLanguage = () => {
    // Tarayıcının dil ayarlarını kontrol et
    const browserLanguage = navigator.language || navigator.userLanguage;

    // Dil kodunu döndür
    return browserLanguage.startsWith("tr") ? "tr" : "en";
};

const getCountryBasedLanguage = async () => {
    try {
        const response = await axios.get(IPAPI_URL);
        const countryCode = response.data.country_code;

        // Ülke koduna göre dil ayarlarını belirle
        switch (countryCode) {
            case "TR":
                return "tr";
            case "US":
                return "en";
            // Başka ülkeler için de buraya case ekleyebilirsiniz
            default:
                return "en";
        }
    } catch (error) {
        console.error("Error fetching country data from IP API:", error);
        return "tr"; // Hata durumunda varsayılan dil olarak İngilizce'yi döndür
    }
};

export const fetchDataFromApi = async (endpoint, queryParams) => {
    try {
        const browserLanguage = getBrowserLanguage();
        const countryBasedLanguage = await getCountryBasedLanguage();
        const language = countryBasedLanguage || browserLanguage;
        const params = { ...queryParams, language };
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            headers,
            params,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching data from API:", error);
        return null;
    }
};

export default fetchDataFromApi;
