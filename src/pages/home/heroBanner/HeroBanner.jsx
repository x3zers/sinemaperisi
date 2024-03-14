import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const [selectedContent, setSelectedContent] = useState(null);
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");
    const contentList = data?.results || [];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * contentList.length);
        const selectedBackground = url.backdrop + contentList[randomIndex]?.backdrop_path;
        setBackground(selectedBackground);
        setSelectedContent(contentList[randomIndex]);
    }, [data]);

    const handleButtonClick = () => {
        if (query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    const searchQueryHandler = (event) => {
        if (event.key === "Enter") {
            handleButtonClick();
        }
    };

    const handleContentClick = () => {
        if (selectedContent) {
            const contentType = selectedContent.media_type === "movie" ? "movie" : "tv";
            navigate(`/${contentType}/${selectedContent.id}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}
            
            <div className="opacity-layer"></div>

            <ContentWrapper>
                <span className="contentTitle" onClick={handleContentClick}>
                    Resimdeki İçerik: {selectedContent?.title || ""}
                </span>
                <div className="wrapper">
                    <div className="heroBannerContent">
                        <span className="title">Merhaba.</span>
                        <span className="subTitle">Milyonlarca film, dizi ve keşfedilecek kişi.</span>
                        <div className="searchInput">
                            <input 
                                type="text" 
                                placeholder="Film veya dizi Ara..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <button onClick={handleButtonClick}>Ara</button>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
