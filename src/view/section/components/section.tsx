import React from "react";

import Logo from "core/components/logos/logo";
import SearchArea from "view/search/components/search";
import TopCities from "view/top-cities/components/top_cities";
import "../styles/section_styles.scss";

const Section = () => {
  return (
    <section className="sectionBody">
      <div className="sectionContainer">
        <Logo />
        <SearchArea />
        <TopCities />
      </div>
    </section>
  );
};
export default Section;
