import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic21peWFrYXdhIiwiYSI6ImNqcGM0d3U4bTB6dWwzcW04ZHRsbHl0ZWoifQ.X9cvdajtPbs9JDMG-CMDsA";

const ReactMaps = () => {
  const viewport = {
    latitude: 40.9061683,
    longitude: 28.2023339,
    zoom: 1,
  };

  return (
    <div
      onClick={() => {
        window.open(
          `https://www.google.com/maps/@${viewport.latitude},${viewport.longitude},4.89z`,
          "Data",
          "height=*7500,width=750"
        );
      }}
    >
      {
        <ReactMapGL
          style={{
            width: "467px",
            height: "222px",
          }}
          dragPan={false}
          {...viewport}
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="https://d3dt5tsgfu6lcf.cloudfront.net/style/marcopolo/web"
        >
          <Marker
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            scale={25}
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/orientation-2/32/location-128.png"
              width={25}
              height={25}
            />
          </Marker>
        </ReactMapGL>
      }
    </div>
  );
};

export default ReactMaps;
