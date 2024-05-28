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
                    className="carouselLeftNavv arroww"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arroww"
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
                                    <svg
                                        className="playIcon"
                                        width="34px"
                                        height="34px"
                                        viewBox="-2 -2 24 24"
                                        fill="#ffffff"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                        <path d="M0 0h24v24H0z" fill="none" />
                                    </svg>
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
