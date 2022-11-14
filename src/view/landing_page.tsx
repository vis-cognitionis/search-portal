import React from "react";

import Header from "./header/components/header";
import Section from "./section/components/section";
import Footer from "./footer/components/footer";

const LandingPage = () => {
  return (
    <div>
      <Header
        status="landing"
        style={{
          justifyContent: "flex-end",
          height: "46px",
          padding: "64px",
        }}
      />
      <Section />
      <Footer />
    </div>
  );
};
export default LandingPage;
