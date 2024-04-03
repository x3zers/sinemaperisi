import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/recommendations`);
    
    if (loading || error || !data?.results || data.results.length === 0) {
        return null;
    }

    return (
        <Carousel
            title="Editörün Seçtikleri"
            data={data.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Recommendation;
