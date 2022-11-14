import React from "react";

import "./logo_styles.scss";

const Logo = ({
  style,
  onClick,
}: {
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  return (
    <img
      onClick={onClick}
      src="./search.svg"
      alt=""
      style={style}
      className="logo"
    />
  );
};

export default Logo;
