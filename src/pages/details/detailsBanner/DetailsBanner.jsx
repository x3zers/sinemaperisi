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
import logo from "../../../assets/s kopya.png";

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
        const searchUrl = `https://www.hdfilmizle.site/?s=${encodeURIComponent(data.title)}`;
        window.open(searchUrl, "_blank");
    };

    const openLogoWatchLink = async () => {
        try {
            const tmdbId = data?.id;
            const type = mediaType === "movie" ? 0 : 1;
            const contentName = data.name || data.title;
            const response = await fetch(`https://cdn.dizifrag.org/api/content/get/sef=${encodeURIComponent(contentName)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tmdbId: tmdbId,
                    type: type
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData && responseData.url) {
                    window.open(responseData.url, "_blank");
                } else {
                    console.error("Error: Invalid response format");
                }
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getStatusText = (status) => {
        const movieStatus = {
            'Released': 'Yayınlandı',
            'Canceled': 'İptal Edildi',
            'Post Production': 'Post Prodüksiyon',
            'In Production': 'Üretiliyor',
            'Planned': 'Planlandı',
            'Rumored': 'Söylenti'
        };

        const seriesStatus = {
            'In Production': 'Üretiliyor',
            'Returning Series': 'Devam Eden Seri',
            'Ended': 'Sona Erdi',
            'Planned': 'Planlanıyor',
            'Canceled': 'İptal Edildi'
        };

        return mediaType === "movie" ? movieStatus[status] : seriesStatus[status];
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
                                <div className="subtitle">"{data.tagline}"</div>

                                <Genres data={_genres} />

                                <div className="row">
                                    <CircleRating
                                        rating={data.vote_average.toFixed(1)}
                                    />
                                    <div
                                        className="playbtn"
                                        onClick={() => {
                                            setShow(true);
                                            setVideoId(video.key);
                                        }}
                                    >
                                        <PlayIcon />
                                        <span className="text">
                                            Fragmanı İzle
                                            </span>
                                            <span className="tooltip">Sayfayı kaydırarak diğer fragmanlara erişebilirsiniz.</span>
                                    </div>
                                       <div 
                                        className="logoBtn"
                                        onClick={openWatchLink}
                                    >
                                        <img src={logo} alt="Logo" className="logo" />
                                        <span className="text">
                                            'da izle
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
                                                {getStatusText(data.status)}
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
                                                ).format("D MMMM YYYY")}
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