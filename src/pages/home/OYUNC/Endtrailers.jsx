import React, { useState, useEffect } from 'react';
import useFetch from "../../../hooks/useFetch";
import './style.scss';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"; // Sağ ve sol oklar için ikonlar

const PopularActors = () => {
  const [actors, setActors] = useState([]);
  const { data, loading } = useFetch(`/person/popular?page=60`);

  useEffect(() => {
    if (!loading && data) {
      setActors(data.results);
    }
  }, [data, loading]);

  const scrollRight = () => {
    document.getElementById('actorList').scrollLeft += 500; 
  };

  const scrollLeft = () => {
    document.getElementById('actorList').scrollLeft -= 500;
  };

  return (
    <div className="carouselSection">
      <h2 className="carouselTitle">Popüler Aktörler</h2>
      <div className="actor-list" id="actorList"> 
        <div className="scroll-arrow left" onClick={scrollLeft}>
          <BsChevronLeft />
        </div>

        {actors.map(actor => (
          <div key={actor.id} className="actor-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <p className="actor-name">{actor.name}</p>
          </div>
        ))}

        <div className="scroll-arrow right" onClick={scrollRight}>
          <BsChevronRight />
        </div>
      </div>
    </div>
  );
};

export default PopularActors;
