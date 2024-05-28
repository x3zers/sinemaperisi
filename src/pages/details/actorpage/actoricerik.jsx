import React, { useState, useEffect } from "react";
import axios from "axios";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const actorId = "nm3480246"; // Örnek bir IMDb ID'si

const Trending = () => {
  const [actorImages, setActorImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Hata durumu için state ekleyelim

  useEffect(() => {
    const fetchActorImages = async () => {
      try {
        const options = {
          method: 'GET',
          url: `https://imdb146.p.rapidapi.com/actors/get-all-images`,
          params: { nconst: actorId, limit: '25' },
          headers: {
            'X-RapidAPI-Host': 'imdb146.p.rapidapi.com',
            'X-RapidAPI-Key': 'b01154269dmsh8252865e0112e78p176f16jsnb3929d53e61f'
          }
        };

        const response = await axios.request(options);
        console.log(response.data); // Yanıtı konsola yazdırarak kontrol edelim
        const images = response.data.resource.images.map(image => image.url);
        setActorImages(images);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching actor images:", error);
        setError(error); // Hata durumunu state'e kaydedelim
        setLoading(false);
      }
    };

    fetchActorImages();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Hata durumunu ekranda gösterelim
  }

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Resimler</span>
        <div className="images">
          {actorImages.length > 0 ? (
            actorImages.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Image ${index}`} />
            ))
          ) : (
            <p>No images found.</p> // Eğer resim bulunamazsa bunu belirtelim
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Trending;
