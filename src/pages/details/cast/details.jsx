// ActorDetails.jsx
import React from "react";

const ActorDetails = ({ actor }) => {
  // Oyuncu hakkında bilgileri çekmek için gerekli işlemleri burada yapabilirsiniz
  return (
    <div className="actorDetails">
      <h2>{actor.name}</h2>
      <div className="biography">
        <h3>Biography</h3>
        <p>{actor.biography}</p>
      </div>
      <div className="birthday">
        <h3>Birthday</h3>
        <p>{actor.birthday}</p>
      </div>
      {/* Oyuncu hakkında diğer bilgileri burada gösterebilirsiniz */}
    </div>
  );
};

export default ActorDetails;
