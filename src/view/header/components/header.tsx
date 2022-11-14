import React from "react";
import FilledButton from "core/components/buttons/filled_button";

import "../styles/header_styles.scss";
import Logo from "core/components/logos/logo";
import { HeaderStatusProps } from "core/interfaces/header_interface";

const Header = ({ status, children, style }: HeaderStatusProps) => {
  const navigateAddLink = () => {
    document.location.href = `${process.env.PUBLIC_URL}/add-link`;
  };
  const navigateHomepage = () => {
    document.location.href = `${process.env.PUBLIC_URL}/`;
  };

  return (
    <header className="header" style={style}>
      {status !== "landing" && (
        <Logo
          style={{ width: "149px", height: "63px", cursor: "pointer" }}
          onClick={() => navigateHomepage()}
        />
      )}
      {children}
      {status !== "addLink" && (
        <FilledButton
          onClick={() => {
            navigateAddLink();
          }}
          buttonName="Add new record"
        />
      )}
    </header>
  );
};
export default Header;
