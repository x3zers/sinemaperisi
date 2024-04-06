import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const Trending = () => {
    const { data, loading } = useFetch(`/tv/on_the_air?language=tr-TR&page=1&timezone=day`);
    
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Yakında</span>
             
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    );
};

export default Trending;
