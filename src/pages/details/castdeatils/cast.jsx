import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx";
import useFetch from "../../../hooks/useFetch.jsx";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/not-found.png";
import VideoPopup from "../../../components/videoPopup/VideoPopup.jsx";
import logo from "../../../assets/analogo.png";

const ActorDetails = () => {
    const history = useHistory();
    const { id } = useParams();
    const { data, loading } = useFetch(`/person/3878062`);
    const [movies, setMovies] = useState([]);
    const [biography, setBiography] = useState("");
    const [images, setImages] = useState([]);
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
        const fetchActorDetails = async () => {
            try {
                const moviesResponse = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=50b3c6dbb79aad9abebce47ea739e62d`);
                const moviesData = await moviesResponse.json();
                setMovies(moviesData.cast);

                const biographyResponse = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=50b3c6dbb79aad9abebce47ea739e62d&language=en-US`);
                const biographyData = await biographyResponse.json();
                setBiography(biographyData.biography);

                const imagesResponse = await fetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=50b3c6dbb79aad9abebce47ea739e62d`);
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
        if (data.profile_path) {
            history.push(`https://www.themoviedb.org/person/${id}-${data.name}`);
        }
    };

    return (
        <div className="actorDetails">
            {!loading && !!data && (
                <ContentWrapper>
                    <div className="content">
                        <div className="left" onClick={handleImageClick}>
                            {data.profile_path ? (
                                <Img
                                    className="profileImg"
                                    src={`https://image.tmdb.org/t/p/original/${data.profile_path}`}
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
                                {data.name}
                            </div>
                            <div className="subtitle">
                                Doğum Tarihi: {dayjs(data.birthday).format("YYYY-MM-DD")}
                            </div>
                            <div className="subtitle">
                                Doğum Yeri: {data.place_of_birth}
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
