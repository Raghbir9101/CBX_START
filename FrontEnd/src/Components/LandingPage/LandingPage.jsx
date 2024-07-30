import React, { useEffect } from "react";
import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import FaqSection from "./FaqSection";
import FeatureSection from "./FeatureSection";
import OurClientReview from "./OurClientReview";

const LandingPage = () => {
  // const loadGoogleTranslateScript = () => {
  //   const script = document.createElement("script");
  //   script.src =
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //   script.type = "text/javascript";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   window.googleTranslateElementInit = () => {
  //     new window.google.translate.TranslateElement(
  //       { pageLanguage: "en", autoDisplay: false },
  //       "google_translate_element"
  //     );
  //   };
  // };

  // useEffect(() => {
  //   loadGoogleTranslateScript();
  // }, []);

  return (
    <>
      <Box sx={{ overflow: "hidden" }}>
        <HeroSection />
        <FeatureSection />
        <FaqSection />
        <OurClientReview />
        <Footer />
      </Box>
    </>
  );
};

export default LandingPage;
