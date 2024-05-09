import React from 'react';

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import TrendFilmler from "./trendFilmler/trendfilmler";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import TrendDiziler from "./trendDiziler/trenddiziler";
import Yakinda from "./yakinda/yakindagelecekler";
import Airingtoday from "./airingtoday/today"


HeroBanner;

const Home = () => {
  return (
     <div className="homePage">
        <HeroBanner />
        <TrendFilmler />
        <TrendDiziler />
        <Popular />
        <TopRated />
        <Yakinda />
        <Airingtoday />
        <div style={{ height: 10 }}></div>
  </div>
  );
};

export default Home;