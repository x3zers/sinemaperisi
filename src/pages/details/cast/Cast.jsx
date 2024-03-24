// Cast.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";


const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedActor, setSelectedActor] = useState(null);

    const navigate = (direction) => {
        if (direction === "left") {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
        } else if (direction === "right") {
            setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
        }
    };

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    const handleActorClick = (index) => {
        setSelectedActor(data[index]);
    };

    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Oyuncular</div>
                <div className="carouselNav">
                    <BsFillArrowLeftCircleFill
                        className="carouselLeftNav arrow"
                        onClick={() => navigate("left")}
                    />
                    <BsFillArrowRightCircleFill
                        className="carouselRightNav arrow"
                        onClick={() => navigate("right")}
                    />
                </div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((item, index) => {
                            const imgUrl = item.profile_path
                                ? url.profile + item.profile_path
                                : avatar.png;
                            return (
                                <div key={item.id} className={`listItem ${index === currentIndex ? 'active' : ''}`} onClick={() => handleActorClick(index)}>
                                    <div className="profileImg">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
            {selectedActor && <ActorDetails actor={selectedActor} />}
        </div>
    );
};

export default Cast;
