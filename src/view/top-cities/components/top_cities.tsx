import React, { useRef } from "react";

import IconButton from "core/components/buttons/icon_button";
import sliderScrollFn from "core/functions/slider_scroll";
import "../styles/top_city_styles.scss";

const cityData = [
  { city: "Frankfurt", text: "Frankfurt", image: "./frankfurt.webp" },
  { city: "New York", text: "New York", image: "./newyork.jpeg" },
  { city: "Paris", text: "Paris", image: "./paris.jpeg" },
  { city: "Istanbul", text: "Istanbul", image: "./istanbul.webp" },
  { city: "Rome", text: "Rome", image: "./rome.jpeg" },
  { city: "Tokyo", text: "Tokyo", image: "./tokyo.webp" },
  { city: "Moscow", text: "Moscow", image: "./moscow.jpeg" },
  { city: "Seoul", text: "Seoul", image: "./seoul.jpeg" },
];

const TopCities = () => {
  const citySliderRef = useRef(null);

  return (
    <div className="cityContainer">
      <h4 className="cityTitle">Famous Cities</h4>

      <div className="citySliderContainer">
        <IconButton
          next={false}
          onClick={() => {
            sliderScrollFn(citySliderRef.current!, 30, 370, -50);
          }}
        />
        <div className="citySlider" ref={citySliderRef}>
          {cityData.map((item) => {
            return (
              <div className="citytextContainer">
                <img src={item.image} alt={item.city} className="cityImage" />
                <p className="cityText">{item.city}</p>
              </div>
            );
          })}
        </div>

        <IconButton
          onClick={() => {
            sliderScrollFn(citySliderRef.current!, 30, 370, 50);
          }}
        />
      </div>
    </div>
  );
};
export default TopCities;
