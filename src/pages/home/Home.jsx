import React from 'react';

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Providers from "./providers/providers";


HeroBanner;

const Home = () => {
  return (
     <div className="homePage">
        <HeroBanner />
        <Trending />
        <Popular />
        <TopRated />
      {/* <Providers /> */}
        <div style={{ height: 1000 }}></div>
  </div>
  );
};

export default Home;