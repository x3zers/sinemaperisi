import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img.jsx";

const ActorDetails = () => {
    const { actorId } = useParams();
    const { url } = useSelector((state) => state.home);
    const [actorData, setActorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [socialMedia, setSocialMedia] = useState(null);
    const [actorCredits, setActorCredits] = useState([]);
    const apikey = "50b3c6dbb79aad9abebce47ea739e62d";
    
    const redirectToContent = (contentType, contentId) => {
        let url;
        if (contentType === "tv") {
            url = `/tv/${contentId}`;
        } else if (contentType === "movie") {
            url = `/movie/${contentId}`;
        } else {
            // Hata durumunda bir işlem yapılabilir veya varsayılan bir URL belirlenebilir
            console.error("Geçersiz içerik türü:", contentType);
            url = "/";
        }
        // Yönlendirme yap
        window.location.href = url;
    };

    useEffect(() => {
        dayjs.locale('tr');
        const fetchActorData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/1190668?api_key=${apikey}&language=tr`);
                if (response.ok) {
                    const responseData = await response.json();
                    setActorData(responseData);
                    setLoading(false);
                } else {
                    console.error("Error fetching actor data:", response.statusText);
                    alert("Actor data couldn't be fetched. Please try again later.");
                }
            } catch (error) {
                console.error("Error fetching actor data:", error);
                alert("Actor data couldn't be fetched. Please try again later.");
            }
        };

        const fetchSocialMedia = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/1190668/external_ids?api_key=${apikey}`);
                if (response.ok) {
                    const responseData = await response.json();
                    setSocialMedia(responseData);
                } else {
                    console.error("Error fetching social media data:", response.statusText);
                    alert("Social media data couldn't be fetched. Please try again later.");
                }
            } catch (error) {
                console.error("Error fetching social media data:", error);
                alert("Social media data couldn't be fetched. Please try again later.");
            }
        };

        fetchActorData();
        fetchSocialMedia();
    }, [actorId]);

    useEffect(() => {
        const fetchActorCredits = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/1190668/movie_credits?api_key=${apikey}`);
                if (response.ok) {
                    const responseData = await response.json();
                    setActorCredits(responseData.cast);
                } else {
                    console.error("Error fetching actor credits:", response.statusText);
                    alert("Actor credits couldn't be fetched. Please try again later.");
                }
            } catch (error) {
                console.error("Error fetching actor credits:", error);
                alert("Actor credits couldn't be fetched. Please try again later.");
            }
        };

        fetchActorCredits();
    }, [actorId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="actorDetails">
            {actorData && (
                <ContentWrapper>
                    <div className="content">
                        <div className="left">
                            <Img
                                className="actorImage"
                                src={url.backdrop + actorData.profile_path}
                                alt={actorData.name}
                            />
                        </div>
                        <div className="right">
                            <div className="title">
                                {actorData.name}
                            </div>
                            <div className="subtitle">{actorData.biography}</div>

                            <div className="row">
                                <div className="infoItem">
                                    <span className="text bold">Doğum Tarihi: </span>
                                    <span className="text">{dayjs(actorData.birthday).format("DD MMMM YYYY")}</span>
                                </div>
                                {actorData.deathday && (
                                    <div className="infoItem">
                                        <span className="text bold">Ölüm Tarihi: </span>
                                        <span className="text">{dayjs(actorData.deathday).format("DD MMMM YYYY")}</span>
                                    </div>
                                )}
                            </div>

                            <div className="info">
                                <div className="socialLinks">
                                    {socialMedia && (socialMedia.facebook_id || socialMedia.instagram_id || socialMedia.twitter_id) && (
                                        <div className="socialMedia">
                                            <div className="heading">Sosyal Medya Hesapları:</div>
                                            <div className="socialLinks">
                                                 {socialMedia.facebook_id && (
                                                <a
                                                    href={`https://www.facebook.com/${socialMedia.facebook_id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <svg width="24px" height="24px" viewBox="0 0 266.895 266.895" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M252.164 266.895c8.134 0 14.729-6.596 14.729-14.73V14.73c0-8.137-6.596-14.73-14.729-14.73H14.73C6.593 0 0 6.594 0 14.73v237.434c0 8.135 6.593 14.73 14.73 14.73h237.434z" fill="#0084ff"></path><path d="M184.152 266.895V163.539h34.692l5.194-40.28h-39.887V97.542c0-11.662 3.238-19.609 19.962-19.609l21.329-.01V41.897c-3.689-.49-16.351-1.587-31.08-1.587-30.753 0-51.807 18.771-51.807 53.244v29.705h-34.781v40.28h34.781v103.355h41.597z" fill="#ffffff"></path></g></svg>
                                                    <span>{socialMedia.facebook_id}</span>
                                                </a>
                                            )}
                                            {socialMedia.instagram_id && (
                                                <a
                                                    href={`https://www.instagram.com/${socialMedia.instagram_id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <svg width="24px" height="24px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)"></rect> <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)"></rect> <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)"></rect> <path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z" fill="white"></path> <defs> <radialGradient id="paint0_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"> <stop stop-color="#B13589"></stop> <stop offset="0.79309" stop-color="#C62F94"></stop> <stop offset="1" stop-color="#8A3AC8"></stop> </radialGradient> <radialGradient id="paint1_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"> <stop stop-color="#E0E8B7"></stop> <stop offset="0.444662" stop-color="#FB8A2E"></stop> <stop offset="0.71474" stop-color="#E2425C"></stop> <stop offset="1" stop-color="#E2425C" stop-opacity="0"></stop> </radialGradient> <radialGradient id="paint2_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"> <stop offset="0.156701" stop-color="#406ADC"></stop> <stop offset="0.467799" stop-color="#6A45BE"></stop> <stop offset="1" stop-color="#6A45BE" stop-opacity="0"></stop> </radialGradient> </defs> </g></svg>
                                                    <span>{socialMedia.instagram_id}</span>
                                                </a>
                                            )}
                                            {socialMedia.twitter_id && (
                                                <a
                                                    href={`https://www.twitter.com/${socialMedia.twitter_id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <svg width="24px" height="24px" viewBox="0 -4 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Twitter-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-300.000000, -164.000000)" fill="#00AAEC"> <path d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283" id="Twitter"> </path> </g> </g> </g></svg>
                                                    <span>{socialMedia.twitter_id}</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>
                            <div className="carouselItems">
                                 <p className="baslik">Aktörün Oynadığı İçerikler</p>
                                 <div className="carousel">
                                 {actorCredits.map((credit) => (
                                <div key={credit.id} className="credit" onClick={() => redirectToContent(credit.media_type, credit.id)}>
                                 <img className="carouselItem" src={`https://image.tmdb.org/t/p/w200${credit.poster_path}`} alt={credit.title} />
                                 <h2>{credit.title}</h2>
                                 <p>{credit.character}</p>
                            </div>
                       ))}                 
                   </div>
              </div> 
                        </div>
                    </div>
                </ContentWrapper>
            )}
        </div>
        
    );
};

export default ActorDetails;