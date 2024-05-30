import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import config from "./config";

const ActorDetails = () => {
    const { url } = useSelector((state) => state.home);
    const [actorData, setActorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [socialMedia, setSocialMedia] = useState(null);
    const [actorCredits, setActorCredits] = useState([]);
    const [actorImage, setActorImage] = useState([]);
    const apikey = config.apiKey
    const actorId = "1136406"

    useEffect(() => {
        dayjs.locale('tr');

        const fetchActorData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${apikey}&language=tr`);
                if (response.ok) {
                    const responseData = await response.json();
                    setActorData(responseData);
                    setLoading(false);
                } else {
                    console.error("Error fetching actor data:", response.statusText);
                    alert("Aktörün bilgileri çekilirken bir hata meydana geldi, Lütfen tekrar deneyin.");
                }
            } catch (error) {
                console.error("Error fetching actor data:", error);
                alert("Aktörün bilgileri çekilirken bir hata meydana geldi, Lütfen tekrar deneyin.");
            }
        };

        const fetchSocialMedia = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}/external_ids?api_key=${apikey}`);
                if (response.ok) {
                    const responseData = await response.json();
                    setSocialMedia(responseData);
                } else {
                    console.error("Error fetching social media data:", response.statusText);
                    alert("Aktörün sosyal medya hesapları çekilirken bir hata meydana geldi, Lütfen tekrar deneyin.");
                }
            } catch (error) {
                console.error("Error fetching social media data:", error);
                alert("Aktörün sosyal medya hesapları çekilirken bir hata meydana geldi, Lütfen tekrar deneyin.");
            }
        };

        const fetchActorImages = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}/images?api_key=${apikey}`);
                if (response.ok) {
                    const responseData = await response.json();
                    setActorImage(responseData);
                } else {
                    console.error("Error fetching images media data:", response.statusText);
                    alert("Images media data couldn't be fetched. Please try again later.");
                }
            } catch (error) {
                console.error("Error fetching images data:", error);
                alert("Images media data couldn't be fetched. Please try again later.");
            }
        };

        const fetchActorCredits = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${apikey}&language=tr`);
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

        fetchActorImages();
        fetchActorData();
        fetchSocialMedia();
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
                                {actorData.also_known_as && (
                                    <div className="infoItem">
                                        <span className="text bold">Ayrıca şöyle bilinir: </span>
                                        {actorData.also_known_as.map((alias, index) => (
                                            <React.Fragment key={index}>
                                                {index > 0 && ", "}
                                                {alias}
                                            </React.Fragment>
                                        ))}
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
                                                        <svg width="24px" height="24px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)"></rect> <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)"></rect> <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)"></rect> <path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white"></path> <defs> <radialGradient id="paint0_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.46127 30.3952) scale(39.6172)"> <stop stop-color="#FFD676"></stop> <stop offset="0.302" stop-color="#FFAF7B"></stop> <stop offset="0.428" stop-color="#FA7C86"></stop> <stop offset="0.535" stop-color="#F24D91"></stop> <stop offset="0.626" stop-color="#E93398"></stop> <stop offset="0.706" stop-color="#DC27A1"></stop> <stop offset="0.779" stop-color="#CA20AA"></stop> <stop offset="0.849" stop-color="#B219B7"></stop> <stop offset="0.917" stop-color="#9412C4"></stop> <stop offset="0.982" stop-color="#700AD3"></stop> <stop offset="1" stop-color="#5D06D9"></stop> </radialGradient> <radialGradient id="paint1_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.7305 28.6586) scale(35.8171)"> <stop offset="0.124" stop-opacity="0"></stop> <stop offset="1" stop-opacity="0.1"></stop> </radialGradient> <radialGradient id="paint2_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(23.3576 3.84223) scale(16.1199)"> <stop stop-opacity="0.1"></stop> <stop offset="1" stop-opacity="0"></stop> </radialGradient> </defs></g></svg>
                                                        <span>{socialMedia.instagram_id}</span>
                                                    </a>
                                                )}
                                                {socialMedia.twitter_id && (
                                                    <a
                                                        href={`https://www.twitter.com/${socialMedia.twitter_id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=fill"> <g id="twitter"> <path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M21.832 6.77703C21.844 6.98803 21.844 7.20103 21.844 7.41303C21.844 13.264 17.436 19.999 9.71997 19.999C7.11497 19.999 4.76997 19.206 2.99997 17.83C3.35797 17.874 3.70497 17.897 4.06997 17.897C6.08897 17.897 7.90297 17.163 9.31397 15.916C7.41397 15.878 5.82197 14.607 5.28297 12.826C5.57197 12.88 5.87097 12.909 6.18097 12.909C6.60797 12.909 7.02597 12.846 7.41697 12.73C5.43797 12.331 4.02097 10.577 4.02097 8.47603C4.02097 8.45703 4.02097 8.43903 4.02097 8.42C4.58497 8.74303 5.22997 8.94703 5.91597 8.97303C4.78097 8.20703 4.03997 6.87103 4.03997 5.33303C4.03997 4.61003 4.21097 3.92603 4.51297 3.31803C6.59997 6.00103 10.016 7.86703 13.804 8.05203C13.724 7.72703 13.681 7.38703 13.681 7.03603C13.681 5.27403 15.086 3.86703 16.848 3.86703C17.788 3.86703 18.628 4.28203 19.182 4.94303C19.887 4.80603 20.554 4.57603 21.166 4.26803C20.959 4.99803 20.491 5.62203 19.854 6.03403C20.477 5.96303 21.073 5.80203 21.632 5.57403C21.168 6.18903 20.547 6.69303 19.832 7.04803L19.832 6.77703Z" fill="#1D9BF0"></path> </g> </g> </g></svg>
                                                        <span>{socialMedia.twitter_id}</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Icerik
                        credits={actorCredits}
                        images={actorImage}
                    />
                </ContentWrapper>
            )}
        </div>
    );
};

export default ActorDetails;
