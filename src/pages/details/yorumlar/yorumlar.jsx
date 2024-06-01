import React, { useState, useEffect } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import axios from "axios";

const ReviewsPage = ({ mediaType, id }) => {
    const [reviews, setReviews] = useState([]);
    const [visibleReviews, setVisibleReviews] = useState(5);
    const [loading, setLoading] = useState(true);
    const apiKey = "095262b2872d2235d6da623056c10cd9";

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/${mediaType}/${id}/reviews?api_key=${apiKey}`
                );
                if (!response.data.results || response.data.results.length === 0) {
                    throw new Error("Yorumlar alınamadı.");
                }
                setReviews(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error("Yorumları alma hatası:", error);
            }
        };

        fetchReviews();
    }, [mediaType, id]);

    const showMoreReviews = () => {
        setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 3);
    };

    return (
        <div className="reviewsPage">
            <ContentWrapper>
                <div className="sectionHeading">Yorumlar</div>
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : reviews.length > 0 ? (
                    <>
                        <ul className="reviewList">
                            {reviews.slice(0, visibleReviews).map((review) => (
                                <li key={review.id} className="reviewItem">
                                    <h3 className="author">{review.author}</h3>
                                    <p className="content">{review.content}</p>
                                </li>
                            ))}
                        </ul>
                        {visibleReviews < reviews.length && (
                            <button className="loadMoreButton" onClick={showMoreReviews}>
                                Daha Fazla Göster
                            </button>
                        )}
                    </>
                ) : (
                    <div className="noReviews">Bu içeriğe ait yorum bulunmamaktadır.</div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default ReviewsPage;
