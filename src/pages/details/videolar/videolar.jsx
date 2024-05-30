import React, { useState, useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const carouselContainer = useRef(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 50)
                : container.scrollLeft + (container.offsetWidth + 50);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => navigation("right")}
                />
                <div className="sectionHeading">Fragmanlar ve Videolar</div>
                {!loading ? (
                    <div className="videos" ref={carouselContainer}>
                        {data?.results?.map((video) => (
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
                                <svg width="60px" height="60px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="m30 57c18.48-13.12 188.13-13.34 200.18 3.38s13.55 129.91-5.8 139.11-179.03 15.09-194.38-1.49-19.61-127 0-141z" fill="#191919"></path> <path d="m113.38 216.51c-77.15 0-86.17-9.74-89.24-13-13.97-15.11-17.58-75.9-13.94-111.13 2.33-22.58 7.3-36.28 15.17-41.87 3.63-2.57 11.84-6.28 41.33-8.81 18.68-1.6 42.08-2.37 65.87-2.17 24.5.21 47.51 1.46 64.79 3.51 29.07 3.45 36.18 8.36 39.31 12.69 7.59 10.52 9.66 40.46 10.23 57.37.93 27.89-1.08 54.5-5.36 71.19-3.18 12.38-7.54 19.51-13.72 22.45-13.35 6.35-68.33 9.27-102 9.69q-6.51.08-12.44.08zm-78.74-153c-.24.21-5.83 4.49-8.53 30.49-1.85 17.9-1.66 40.64.5 60.84 2.65 24.76 7.07 35.36 9.25 37.72 4 3.56 31.64 8.65 91 7.83 51.53-.71 87.59-5.14 94-8.09.33-.26 3.91-3.44 6.85-19.88 3-16.75 4.1-40.75 3-64.18-1.24-25.69-4.71-39.57-6.84-42.94-4.7-3.67-34.05-9.49-94.18-9.81-56.59-.3-90.17 4.62-95 8z" fill="#191919"></path> </g> <g> <path d="m30 57c18.48-13.12 188.13-13.34 200.18 3.38s13.55 129.91-5.8 139.11-179.03 15.09-194.38-1.49-19.61-127 0-141z" fill="#e83a2a"></path> </g> <g> <path d="m106.64 88.63c-5.53 3.52-3.88 75.56-.68 79.8s63.75-34 63.8-40.81-57.58-42.51-63.12-38.99z" fill="#ffffff"></path> </g> </g></svg></div>
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
