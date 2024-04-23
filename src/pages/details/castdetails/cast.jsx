import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/not-found.png";
import VideoPopup from "../../../components/videoPopup/VideoPopup.jsx";

const ActorDetails = () => {
    const history = useHistory();
    const { id } = useParams();
    const [actorData, setActorData] = useState(null);
    const [movies, setMovies] = useState([]);
    const [biography, setBiography] = useState("");
    const [images, setImages] = useState([]);
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
        const fetchActorDetails = async () => {
            try {
                const actorResponse = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=YOUR_API_KEY&language=en-US`);
                const actorData = await actorResponse.json();
                setActorData(actorData);

                const moviesResponse = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=YOUR_API_KEY`);
                const moviesData = await moviesResponse.json();
                setMovies(moviesData.cast);

                setBiography(actorData.biography);

                const imagesResponse = await fetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=YOUR_API_KEY`);
                const imagesData = await imagesResponse.json();
                setImages(imagesData.profiles);
            } catch (error) {
                console.error("Error fetching actor details:", error);
            }
        };

        if (id) {
            fetchActorDetails();
        }
    }, [id]);

    const handleImageClick = () => {
        if (actorData && actorData.homepage) {
            window.open(actorData.homepage, "_blank");
        }
    };

    return (
        <div className="actorDetails">
            {!actorData && <div>Loading...</div>}
            {actorData && (
                <ContentWrapper>
                    <div className="content">
                        <div className="left" onClick={handleImageClick}>
                            {actorData.profile_path ? (
                                <Img
                                    className="profileImg"
                                    src={`https://image.tmdb.org/t/p/original/${actorData.profile_path}`}
                                />
                            ) : (
                                <Img
                                    className="profileImg"
                                    src={PosterFallback}
                                />
                            )}
                        </div>
                        <div className="right">
                            <div className="title">
                                {actorData.name}
                            </div>
                            <div className="subtitle">
                                Doğum Tarihi: {dayjs(actorData.birthday).format("YYYY-MM-DD")}
                            </div>
                            <div className="subtitle">
                                Doğum Yeri: {actorData.place_of_birth}
                            </div>
                            <div className="biography">
                                <div className="heading">Biyografi</div>
                                <div className="description">{biography}</div>
                            </div>
                            <div className="movies">
                                <div className="heading">Oynadığı Diziler/Filmler</div>
                                <div className="list">
                                    {movies.map((movie) => (
                                        <div key={movie.id} className="movieItem">
                                            <div className="moviePoster">
                                                {movie.poster_path ? (
                                                    <Img
                                                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                                    />
                                                ) : (
                                                    <Img
                                                        src={PosterFallback}
                                                    />
                                                )}
                                            </div>
                                            <div className="movieTitle">{movie.title}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="images">
                                <div className="heading">Resimler</div>
                                <div className="list">
                                    {images.map((image) => (
                                        <div key={image.file_path} className="imageItem">
                                            <Img
                                                src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            )}
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default ActorDetails;
