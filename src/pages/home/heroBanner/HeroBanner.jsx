import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query , setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 10)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    const handleButtonClick = () => {
        if (query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    const searchQueryHandler = (event) => {
        if (event.key === 'Enter') {
            handleButtonClick();
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
