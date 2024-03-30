import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import Videolar from "./videolar/videolar";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import Resimler from "./resimler/Resimler";
import Justwatch from "./justwatch/justwatch"

const Details = () => {
    const { mediaType, id } = useParams();
    const { data: trVideos, loading: trVideosLoading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: enVideos, loading: enVideosLoading } = useFetch(`/${mediaType}/${id}/videos`);

    const { data: trCredits, loading: trCreditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
    const { data: enCredits, loading: enCreditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

    const videos = trVideos?.results.length > 0 ? trVideos : enVideos;
    const credits = trCredits?.crew.length > 0 ? trCredits : enCredits;

    const isLoading = trVideosLoading || enVideosLoading || trCreditsLoading || enCreditsLoading;

    return (
        <div>
            <DetailsBanner video={videos?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={isLoading} />
            <Videolar data={videos} loading={isLoading} /> 
            <Justwatch data={videos} loading={isLoading} /> 
            <Resimler data={videos} loading={isLoading} /> 
            <Recommendation mediaType={mediaType} id={id} />
            <Similar mediaType={mediaType} id={id} />
            
        </div>
    );
};

export default Details;
