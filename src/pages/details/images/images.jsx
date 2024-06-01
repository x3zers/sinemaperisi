import React, { useState, useEffect } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

const Resimler = ({ data, loading }) => {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const apikey = "095262b2872d2235d6da623056c10cd9";

    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (!data) return;
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${data.id}/images?api_key=${apikey}`
                );
                if (!response.ok) {
                    throw new Error("Resimler alınamadı.");
                }
                const imageData = await response.json();
                setImages(imageData.backdrops);
            } catch (error) {
                console.error("Bir hata oluştu:", error);
            }
        };

        fetchImages();
    }, [data]);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="resimlerSection">
            {images.length > 0 && (
                <ContentWrapper>
                    <div className="sectionHeading">Resimler</div>
                    <div className="mainImageWrapper">
                        <BsFillArrowLeftCircleFill
                            className="navigationButton left"
                            onClick={handlePrev}
                        />
                        <img
                            src={`https://image.tmdb.org/t/p/original/${images[currentImageIndex].file_path}`}
                            alt={images[currentImageIndex].file_path}
                            className="mainImage"
                        />
                        <BsFillArrowRightCircleFill
                            className="navigationButton right"
                            onClick={handleNext}
                        />
                        <div className="imageCounter">
                            {currentImageIndex + 1}/{images.length}
                        </div>
                    </div>
                </ContentWrapper>
            )}
        </div>
    );
};

export default Resimler;
