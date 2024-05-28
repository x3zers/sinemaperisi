import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import logo from "../../../assets/analogo.png";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data } = useFetch("/movie/upcoming");
    const [imageContent, setImageContent] = useState("");

    useEffect(() => {
        const lastUpdate = localStorage.getItem("lastUpdate");
        const currentDate = new Date();
        const currentDay = currentDate.getDate();

        if (data) {
            if (!lastUpdate || new Date(lastUpdate).getDate() !== currentDay) {
                const randomIndex = Math.floor(Math.random() * 20);
                const selectedMovie = data?.results?.[randomIndex];
                const bg = url.backdrop + selectedMovie?.backdrop_path;
                setBackground(bg);
                setImageContent(selectedMovie);
                localStorage.setItem("background", bg);
                localStorage.setItem("imageContent", JSON.stringify(selectedMovie));
                localStorage.setItem("lastUpdate", currentDate);
            } else {
                const savedBackground = localStorage.getItem("background");
                const savedImageContent = JSON.parse(localStorage.getItem("imageContent"));
                setBackground(savedBackground);
                setImageContent(savedImageContent);
            }
        }
    }, [data, url]);

    const handleImageClick = () => {
        if (imageContent) {
            navigate(`/movie/${imageContent.id}`);
        }
    };

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {data && (
                <div className="backdrop-img">
                    <Img src={background} onClick={handleImageClick} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Merhaba</span>
                    <span className="subTitle">
                        Milyonlarca film, dizi ve kişi.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Bir film veya dizi ara..."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                    </div>
                    <div>   
                        <span className="imageContent" onClick={handleImageClick}>
                            Resimdeki içerik: {imageContent?.title}
                        </span>
                    </div>
                </div>
                <span className="imageContent2" onClick={() => window.open('https://dizifrag.org')}>
                    <img src={logo} alt="logo"/> tarafından güçlendirildi.
                </span>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
