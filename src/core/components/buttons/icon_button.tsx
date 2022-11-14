import React from "react";
import { IconNext, IconPrevious } from "../icons/icons";

import "./button_styles.scss";

interface ButtonProps {
  next?: boolean;
  onClick: () => void;
}

const IconButton = ({ next = true, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="sliderButton">
      {next ? <IconNext /> : <IconPrevious />}
    </button>
  );
};
export default IconButton;
