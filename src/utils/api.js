import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
};

// API'den veri çekmek için genel bir fonksiyon
export const fetchDataFromApi = async (endpoint, queryParams) => {
    try {
        // Eğer queryParams yoksa boş bir nesne oluştur
        const params = queryParams ? { ...queryParams } : {};

        // Dil parametresini Türkçe olarak ayarla
        params.language = "tr-TR";

        // Axios isteği gönder
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            headers,
            params,
        });

        // İstek başarılı olduysa veriyi döndür
        return response.data;
    } catch (error) {
        // Hata durumunda konsola hata yazdır ve null döndür
        console.error("API Error:", error);
        return null;
    }
};
