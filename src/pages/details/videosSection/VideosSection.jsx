import React, { useState, useEffect } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../Playbtn";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${data.id}/videos?api_key=50b3c6dbb79aad9abebce47ea739e62d&language=tr-TR`
                );
                if (!response.ok) {
                    throw new Error("Video verileri alınamadı");
                }
                const videoData = await response.json();
                setVideos(videoData.results);
            } catch (error) {
                console.error("Bir hata oluştu:", error);
            }
        };

        if (!loading && data && data.id) {
            fetchVideos();
        }
    }, [data, loading]);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading" title="Eğer Türkçe fragman bulunmadıysa oto resmi fragman görünecektir">
                    Resmi Fragmanlar
                </div>
                {!loading ? (
                    <div className="videos">
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                className="videoItem"
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                <div className="videoThumbnail">
                                    <Img
                                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                    />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
