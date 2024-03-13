import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const Popular = () => {
    const [endpoint, setEndpoint] = useState("now_playing");

    const { data, loading } = useFetch(`/movie/${endpoint}`);

    const onTabChange = (tab) => {
        if (tab === "Filmler") {
            setEndpoint("now_playing");
        } else {
            setEndpoint("popular");
        }
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Sinemadakiler</span>
                <SwitchTabs
                    data={["Filmler", "Diziler"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
};

export default Popular;
