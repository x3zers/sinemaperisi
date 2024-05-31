import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import logo from "../../../assets/s kopya.png";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

const Resimler = ({ data, loading }) => {
    const [images, setImages] = useState([]);
    const [visibleImages, setVisibleImages] = useState(99); // Görünür resim sayısı
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);
    const resimlerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);
    const apikey = "095262b2872d2235d6da623056c10cd9";
    const carouselContainer = useRef(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (!data) return;
                const response = await fetch(
                    `https://api.themoviedb.org/3/tv/${data.id}/images?api_key=${apikey}`
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

    const handleImageLoad = () => {
        setImageLoading(false);
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
        <div className="resimlerSection">
            {images.length > 0 && (
                <ContentWrapper>
                    <BsFillArrowLeftCircleFill
                        className={`carouselLeftNav arrow ${showLeftButton ? "show" : "hide"}`}
                        onClick={() => navigation("left")}
                    />
                    <BsFillArrowRightCircleFill
                        className={`carouselRightNav arrow ${showRightButton ? "show" : "hide"}`}
                        onClick={() => navigation("right")}
                    />
                    <div className="sectionHeading">Resimler</div>
                    <div className="resimlerWrapper">
                        <div className="navigationButton left" onClick={() => handleScroll(-200)}>
                            {"<"}
                        </div>
                        <div ref={resimlerRef} className="resimler">
                            {!loading ? (
                                images.slice(0, visibleImages).map((image, index) => (
                                    <div key={index} className="imageItem" onClick={() => enlargeImage(image)}>
                                        <Img
                                            src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                                            alt={image.file_path}
                                            onLoad={handleImageLoad}
                                            loading="lazy"
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="resimlerSkeleton">
                                    {loadingSkeleton()}
                                    {loadingSkeleton()}
                                    {loadingSkeleton()}
                                    {loadingSkeleton()}
                                    {loadingSkeleton()}
                                </div>
                            )}
                        </div>
                        <div className="navigationButton right" onClick={() => handleScroll(200)}>
                            {">"}
                        </div>
                    </div>
                </ContentWrapper>
            )}
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
