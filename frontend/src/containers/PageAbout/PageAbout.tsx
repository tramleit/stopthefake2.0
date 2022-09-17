import rightImg from "images/about-hero-right.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import { Helmet } from "react-helmet";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "./SectionHero";
import Footer from "shared/Footer/Footer";
import HeaderLogged from "components/Header/HeaderLogged";
export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <>
      <HeaderLogged />
      <div
        className={`nc-PageAbout overflow-hidden relative ${className}`}
        data-nc-id="PageAbout"
      >
        <Helmet>
          <title>About || Stopthefake Legit-check your items</title>
        </Helmet>

        {/* ======== BG GLASS ======== */}
        <BgGlassmorphism />

        <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
          <SectionHero
            rightImg={rightImg}
            heading="Our mission is clear:"
            btnText=""
            subHeading="STOPTHEFAKE vous permet de porter des articles streetwear et de luxe neuf ou de seconde main en toute confiance avec notre legitcheck a partir de 1 euro"
          />

          <SectionFounder />

          <SectionStatistic />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageAbout;
