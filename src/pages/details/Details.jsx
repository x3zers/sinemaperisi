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


const Details = () => {
    const { mediaType, id } = useParams();
    const { data: videos, loading: videosLoading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

    return (
        <div>
            <DetailsBanner video={videos?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <Videolar data={videos} loading={videosLoading} /> 
            <Justwatch data={videos} loading={videosLoading} /> 
            <Recommendation mediaType={mediaType} id={id} />
            <Similar mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;
