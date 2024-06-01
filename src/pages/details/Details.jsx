import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import Videolar from "./videolar/videolar";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import Justwatch from "./justwatch/justwatch"
import Yorumlar from "./yorumlar/yorumlar"
import Images from "./images/images"
import ImagesTV from "./images/imagestv"
import Fragmanlar from "./fragmanlar/fragmanlar"
import Sirketler from "./sirketler/sirketler"

const Details = () => {
    const { mediaType, id } = useParams();
    let language = "tr";

    if (navigator.language.startsWith("tr")) {
        language = "tr";
    }

    const { data: videos, loading: videosLoading } = useFetch(`/${mediaType}/${id}/videos?language=tr`);
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
    const ImagesComponent = mediaType === "tv" ? ImagesTV : Images;

    return (
        <div>
            <DetailsBanner video={videos?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <Fragmanlar data={videos} loading={videosLoading} /> 
            <Videolar data={videos} loading={videosLoading} /> 
            <ImagesComponent data={videos} loading={videosLoading} /> 
            <Justwatch data={videos} loading={videosLoading} /> 
            <Sirketler mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
            <Similar mediaType={mediaType} id={id} />
            <Yorumlar mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;
