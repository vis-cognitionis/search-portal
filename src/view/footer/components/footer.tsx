import React from "react";

import "../styles/footer_styles.scss";
import ReactMaps from "./map";

const Footer = () => {
  return (
    <footer className="footer">
      {/* <div className="mapContainer"> */}
      <ReactMaps />
      {/* </div> */}
    </footer>
  );
};
export default Footer;
