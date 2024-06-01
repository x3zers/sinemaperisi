import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YourComponent = () => {
    const [movieData, setMovieData] = useState(null);
    const apiKey = '095262b2872d2235d6da623056c10cd9';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/MOVIE_ID?api_key=${apiKey}`);
                setMovieData(response.data);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchData();
    }, [apiKey]);

    return (
        <div>
            {movieData && <ProductionCompanies data={movieData} />}
        </div>
    );
};

export default YourComponent;
