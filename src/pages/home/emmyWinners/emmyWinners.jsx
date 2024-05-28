import React, { useState, useEffect } from "react";
import axios from "axios";

const EmmyWinners = () => {
    const [emmyWinners, setEmmyWinners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://imdb188.p.rapidapi.com/api/v1/emmyWinners", {
                    headers: {
                        'x-rapidapi-key': 'b01154269dmsh8252865e0112e78p176f16jsnb3929d53e61f',
                        'x-rapidapi-host': 'imdb188.p.rapidapi.com'
                    }
                });
                setEmmyWinners(response.data.data.pageInfo.list); // Veri yapısına göre diziye erişim sağlıyoruz
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="emmyWinnersPage">
            <h1>Emmy Ödülü Alanlar</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {emmyWinners.map((winner, index) => (
                        <li key={index}>
                            <strong>{winner.title.text}</strong>
                            <br />
                            {winner.primaryImage && <img src={winner.primaryImage.imageUrl} alt={winner.title.text} />}
                            <br />
                            <strong>IMDb Puanı:</strong> {winner.ratingsSummary.aggregateRating}
                            <br />
                            <strong>Oy Sayısı:</strong> {winner.ratingsSummary.voteCount}
                            <br />
                            <strong>Yayın Yılı:</strong> {winner.releaseYear}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmmyWinners;
