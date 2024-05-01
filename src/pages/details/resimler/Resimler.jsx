import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import logo from "../../../assets/s kopya.png";

const Resimler = ({ data, loading }) => {
    const [images, setImages] = useState([]);
    const resimlerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showAllImages, setShowAllImages] = useState(false); // Tüm resimlerin gösterilip gösterilmediğini takip etmek için state

    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (!data) return;
                const apiKey = "50b3c6dbb79aad9abebce47ea739e62d";
                const type = data.type === 'movie' ? 'movie' : 'tv';
                const response = await fetch(
                    `https://api.themoviedb.org/3/${type}/${data.id}/images?api_key=${apiKey}`
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

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
            </div>
        );
    };

    const enlargeImage = (image) => {
        setSelectedImage(image);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const handleShowAllImages = () => {
        setShowAllImages(true); // Tüm resimleri göster
    };

    return (
        <div className="resimlerSection">
            {images.length > 0 && (
                <ContentWrapper>
                    <div className="sectionHeading">Resimler</div>
                    <div className="resimlerWrapper">
                        <div ref={resimlerRef} className="resimler">
                            {!loading ? (
                                images.map((image, index) => (
                                    <div key={index} className="imageItem" onClick={() => enlargeImage(image)}>
                                        <Img
                                            src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                                            alt={image.file_path}
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
                        {!showAllImages && images.length > 6 && ( // Tüm resimler gösterilmediyse ve 6'dan fazla resim varsa
                            <button className="showMoreButton" onClick={handleShowAllImages}>Tümünü Göster</button>
                        )}
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
