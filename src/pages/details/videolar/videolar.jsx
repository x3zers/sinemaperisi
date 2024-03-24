import React, { useState, useEffect } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../Playbtn";
import { fetchDataFromApi } from "../../../utils/api"; 

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videoData = await fetchDataFromApi(`/movie/${data.id}/videos`);
                setVideos(videoData.results);
            } catch (error) {
                console.error("An error occurred:", error);
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
                {!loading && videos.length > 0 && (
                    <div className="sectionHeading">Resmi Videolar</div>
                )}
                {!loading ? (
                    videos.length > 0 ? (
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
 <div className="noVideosMessage"></div> // Eğer videolar yoksa                       
                    )
                ) : null}
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
