import React from "react";

import LandingPage from "view/landing_page";
import ResultPage from "view/result_page";
import AddLinkPage from "view/add_link_page";
import "./App.css";

function App() {
  return (
    <div style={{ height: window.innerHeight }}>
      {window.location.pathname === `${process.env.PUBLIC_URL}/` && (
        <LandingPage />
      )}
      {window.location.pathname === `${process.env.PUBLIC_URL}/results` && (
        <ResultPage />
      )}
      {window.location.pathname === `${process.env.PUBLIC_URL}/add-link` && (
        <AddLinkPage />
      )}
    </div>
  );
}

export default App;
