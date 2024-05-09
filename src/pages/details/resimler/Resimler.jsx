import React, { useState, useEffect } from "react";

const YourComponent = ({ mediaType, id }) => {
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            Authorization: 'Bearer 50b3c6dbb79aad9abebce47ea739e62d'
          }
        };

        // TMDB API'den IMDb ID'sini al
        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/external_ids`, options);
        const { imdb_id } = await tmdbResponse.json();

        // IMDb sayfasından resimleri çek
        const imdbResponse = await fetch(`https://www.imdb.com/title/${imdb_id}/mediaindex/`);
        const htmlContent = await imdbResponse.text();

        // HTML içeriğini DOMParser kullanarak analiz et
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        // DOM API'si kullanarak resim URL'lerini çek
        const foundImages = [];
        const imageElements = doc.querySelectorAll('#media_index_thumbnail_grid a img');
        imageElements.forEach(img => {
          try {
            const imageUrl = img.getAttribute('src');
            if (imageUrl.startsWith("https://m.media-amazon.com/")) {
              foundImages.push(imageUrl);
            }
          } catch (error) {
            console.error("Resim alınırken bir hata oluştu:", error);
          }
        });

        setImages(foundImages);
      } catch (error) {
        setError("Resimler alınırken bir hata oluştu.");
      }
    };

    fetchData();
  }, [mediaType, id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Resim ${index}`} />
      ))}
    </div>
  );
};

export default YourComponent;
