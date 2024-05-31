import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const LuckyButton = () => {
    const navigate = useNavigate();
    const [backgroundImage, setBackgroundImage] = useState("");
    const [selectedContent, setSelectedContent] = useState(null);

    useEffect(() => {
        const fetchBackgroundImage = async () => {
            try {
                const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=095262b2872d2235d6da623056c10cd9&language=tr-TR");
                const data = await response.json();
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const selectedMovie = data.results[randomIndex];
                setBackgroundImage(`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`);
                setSelectedContent(selectedMovie);
            } catch (error) {
                console.error("Arka plan resmi alınırken hata oluştu: ", error);
            }
        };

        fetchBackgroundImage();
    }, []);

    const handleBackgroundClick = () => {
        if (selectedContent) {
            navigate(`/movie/${selectedContent.id}`);
        }
    };

    const handleRandomClick = async () => {
        try {
            const contentType = Math.random() < 0.9 ? "movie" : "tv";
            const response = await fetch(`https://api.themoviedb.org/3/${contentType}/popular?api_key=095262b2872d2235d6da623056c10cd9&language=tr-TR`);
            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const selectedContent = data.results[randomIndex];
            if (selectedContent.vote_average >= 6) {
                navigate(`/${contentType}/${selectedContent.id}`);
                setSelectedContent(selectedContent);
            } else {
                handleRandomClick();
            }
        } catch (error) {
            console.error("Rastgele içerik alınırken hata oluştu: ", error);
        }
    };
    const handleRefresh = async () => {
        try {
            const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=095262b2872d2235d6da623056c10cd9&language=tr-TR");
            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const selectedMovie = data.results[randomIndex];
            setBackgroundImage(`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`);
            setSelectedContent(selectedMovie);
        } catch (error) {
            console.error("Error fetching background image: ", error);
        }
    };

    return (
        <div className="luckyButtonContainer">
        <span className="refreshIcon" onClick={handleRefresh}>
            &#x21bb;
            <span className="tooltip">Yenilemek için tıklayın</span>
        </span>
        
            {backgroundImage && <img src={backgroundImage} alt="arkaplan" className="backgroundImage" />}
            <button className="luckyButton" onClick={handleBackgroundClick}>
                Ne izleyeceğine karar veremedin mi?
            </button>
            {selectedContent && (
                <span className="imageContent3">
                    Senin İçin Önerim: {selectedContent.title || selectedContent.name}
                </span>
            )}
        </div>
    );
};

export default LuckyButton;



