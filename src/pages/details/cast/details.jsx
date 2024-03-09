// ActorDetails.jsx
import React from "react";

const ActorDetails = ({ actorId }) => {
  // Oyuncu hakkında bilgileri çekmek için gerekli işlemleri burada yapabilirsiniz
  return (
    <div>
      <h2>Oyuncu Detayları</h2>
      <p>Oyuncu ID: {actorId}</p>
      {/* Oyuncu hakkında diğer bilgileri burada gösterebilirsiniz */}
    </div>
  );
};

export default ActorDetails;
