import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import logo from "../../../assets/s kopya.png";

const Resimler = ({ data, loading }) => {
    const [images, setImages] = useState([]);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);
    const resimlerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const mediaType = data.media_type === "movie" ? "movie" : "tv"; // İçeriğin medya türüne göre API endpoint'ini belirleme
                const response = await fetch(
                    `https://api.themoviedb.org/3/${mediaType}/${data.id}/images?api_key=50b3c6dbb79aad9abebce47ea739e62d`
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
    
        if (!loading && data && data.id) {
            fetchImages();
        }
    }, [data, loading]);

    useEffect(() => {
        if (resimlerRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = resimlerRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollWidth - scrollLeft > clientWidth);
        }
    }, [scrollLeft]);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
            </div>
        );
    };

    const handleScroll = (scrollOffset) => {
        resimlerRef.current.scrollLeft += scrollOffset;
        setScrollLeft(resimlerRef.current.scrollLeft);
    };

    const enlargeImage = (image) => {
        setSelectedImage(image);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    return (
        <div className="resimlerSection">
            <ContentWrapper>
                <div className="sectionHeading">Resimler</div>
                <div className="resimlerWrapper">
                    {showLeftButton && (
                        <div className="navigationButton left" onClick={() => handleScroll(-200)}>
                            {"<"}
                        </div>
                    )}
                    <div ref={resimlerRef} className="resimler">
                        {!loading ? (
                            images.length > 0 ? (
                                images.map((image, index) => (
                                    <div key={index} className="imageItem" onClick={() => enlargeImage(image)}>
                                        <Img
                                            src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                            alt={image.file_path}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="noImagesMessage">Resim bulunamadı.</div>
                            )
                        ) : (
                            <div className="resimlerSkeleton">
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                            </div>
                        )}
                    </div>
                    {showRightButton && (
                        <div className="navigationButton right" onClick={() => handleScroll(200)}>
                            {">"}
                        </div>
                    )}
                </div>
            </ContentWrapper>
            {selectedImage && (
                <div className="enlargedImageView" onClick={closeImage}>
                    <img src={`https://image.tmdb.org/t/p/original/${selectedImage.file_path}`} alt={selectedImage.file_path} />
                    <img src={logo} className="logo" alt="logo" />
                </div>
            )}
        </div>
    );
};

export default Resimler;
