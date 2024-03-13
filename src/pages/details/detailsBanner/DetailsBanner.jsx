import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/not-found.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) =>
            f.job === "Screenplay" ||
            f.job === "Story" ||
            f.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours} saat${minutes > 0 ? ` ${minutes} dakika` : ""}`;
    };

    const openWatchLink = () => {
        const contentName = data.name || data.title;
        const searchUrl = `https://www.justwatch.com/tr/arama?q=${encodeURIComponent(contentName)}`;
        window.open(searchUrl, "_blank");
    };
    return (
        <div className="detailsBanner">
            {!loading && !!data && (
                <React.Fragment>
                    <div className="backdrop-img">
                        <Img src={url.backdrop + data.backdrop_path} />
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data.poster_path ? (
                                    <Img
                                        className="posterImg"
                                        src={url.backdrop + data.poster_path}
                                    />
                                ) : (
                                    <Img
                                        className="posterImg"
                                        src={PosterFallback}
                                    />
                                )}
                            </div>
                            <div className="right">
                                <div className="title">
                                    {`${data.name || data.title} (${dayjs(
                                        data?.release_date
                                    ).format("YYYY")})`}
                                </div>
                                <div className="subtitle">{data.tagline}</div>

                                <Genres data={_genres} />

                                <div className="row">
                                    <CircleRating
                                        rating={data.vote_average.toFixed(1)}
                                    />
                                    <div
                                        className="playbtn"
                                        onClick={openWatchLink}
                                    >
                                        <PlayIcon />
                                        <span className="text">
                                            İzle
                                        </span>
                                    </div>
                                </div>

                                <div className="overview">
                                    <div className="heading">Açıklama</div>
                                    <div className="description">
                                        {data.overview}
                                    </div>
                                </div>

                                <div className="info">
                                    {data.status && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Durum:{" "}
                                            </span>
                                            <span className="text">
                                                {data.status}
                                            </span>
                                        </div>
                                    )}

                                    {data.release_date && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Yayın Tarihi:{" "}
                                            </span>
                                            <span className="text">
                                                {dayjs(
                                                    data.release_date
                                                ).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    )}

                                    {data.runtime && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Süre:{" "}
                                            </span>
                                            <span className="text">
                                                {toHoursAndMinutes(
                                                    data.runtime
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {director?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Yönetmen:{" "}
                                        </span>
                                        <span className="text">
                                            {director?.map((d, i) => (
                                                <span key={i}>
                                                    {d.name}
                                                    {director.length - 1 !== i &&
                                                        ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {writer?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Yazar:{" "}
                                        </span>
                                        <span className="text">
                                            {writer?.map((d, i) => (
                                                <span key={i}>
                                                    {d.name}
                                                    {writer.length - 1!== i &&
                                                        ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {data?.created_by?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Kurucu:{" "}
                                        </span>
                                        <span className="text">
                                            {data?.created_by?.map(
                                                (d, i) => (
                                                    <span key={i}>
                                                        {d.name}
                                                        {data?.created_by
                                                            .length -
                                                            1 !== i &&
                                                            ", "}
                                                    </span>
                                                )
                                            )}
                                        </span>
                                    </div>
                                )}

                                {data?.videos?.results.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Fragman:{" "}
                                        </span>
                                        <iframe
                                            width="560"
                                            height="315"
                                            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        </div>
                        <VideoPopup
                            show={show}
                            setShow={setShow}
                            videoId={videoId}
                            setVideoId={setVideoId}
                        />
                    </ContentWrapper>
                </React.Fragment>
            )}
        </div>
    );
};

export default DetailsBanner;
