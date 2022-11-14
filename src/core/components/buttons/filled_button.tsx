import React from "react";

import "./button_styles.scss";

interface ButtonProps {
  buttonName: string;
  onClick?: (e: any) => void;
  type?: "button" | "submit" | "reset" | undefined;
  style?: React.CSSProperties;
}

const FilledButton = ({ buttonName, onClick, type, style }: ButtonProps) => {
  return (
    <button
      style={style}
      onClick={onClick}
      type={type}
      className="addNewRecord"
    >
      {buttonName}
    </button>
  );
};
export default FilledButton;
