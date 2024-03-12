import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home);

    return (
        <div className="genres">
            {data?.map((g) => {
                const genreName = genres[g]?.name;
                if (!genreName) return null; // Kategori adı bulunamadıysa render etme
                // Kategori adını Türkçe karşılığı ile göster
                return (
                    <div key={g} className="genre">
                        {genreName}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;
