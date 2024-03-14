import React, { useState, useEffect } from 'react';
import useFetch from "../../../hooks/useFetch";
import './style.scss';

const PopularActors = () => {
  const [actors, setActors] = useState([]);
  const { data, loading } = useFetch(`/person/popular`);
  useEffect(() => {
    if (!loading && data) {
      setActors(data.results);
    }
  }, [data, loading]);

  return (
    <div className="carouselSection">
      <h2 className="carouselTitle">Popüler Oyuncular</h2>
      <div className="actor-list">
        {actors.map(actor => (
          <div key={actor.id} className="actor-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <p className="carouselTitle">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularActors;
