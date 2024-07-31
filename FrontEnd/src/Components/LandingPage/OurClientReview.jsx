import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import "./Styles/OurClientReview.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { clientsData } from "../../Constant";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import forIcon from "../../Icons/forword.svg";
import backIcon from "../../Icons/back.svg";
import dotImg from "../../Icons/dot.svg";
import { motion } from "framer-motion";
import useInView from "./useInView.jsx";
import zIndex from "@mui/material/styles/zIndex.js";

const OurClientReview = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const [totalSlides, setTotalSlides] = useState(clientsData.length);
  const [ref, inView] = useInView({ threshold: 0.5 });

  const settings = {
    dots: false,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    // prevArrow: <CustomPrevArrow hasPrev={currentSlide > 0} />,
    // nextArrow: <CustomNextArrow hasNext={currentSlide < totalSlides - 1} />,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    // beforeChange: (current, next) => setCurrentSlide(next),
    // onInit: (slider) => setTotalSlides(slider.props.children.length),
  };

  return (
    <>
      <Box className="review-main-container" ref={ref}>
        <Box className="review-container">
          {" "}
          {/* <Box> */}
          <motion.div
            initial={{ x: -500, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -500, opacity: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Typography className="review-heading" fontSize={"50px"}>
              What our Customer
            </Typography>
            <Typography className="review-heading" fontSize={"50px"}>
              says about us
            </Typography>
            <Typography className="review-heading1">
              What our Customer says about us
            </Typography>
          </motion.div>
          {/* </Box> */}
          {/* -------- ------- ---------- ------------ */}
          <Box className="carouselBox">
            <Box>
              <Slider {...settings}>
                {clientsData?.map((url) => (
                  <Box key={url._id}>
                    <Box
                      className="clientReviewBox"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "80px",
                        flexWrap: "wrap",
                        p: "20px 0px 0px 0px ",
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <img
                          src={url.logo}
                          alt="Images"
                          className="sliderImages"
                        />
                        <img
                          src={dotImg}
                          alt="Icon"
                          className="review-dotImg"
                        />
                      </Box>

                      <motion.div
                        className="nameAndReviewTextBox"
                        initial={{ x: 500, opacity: 0 }}
                        animate={
                          inView ? { x: 0, opacity: 1 } : { x: 500, opacity: 0 }
                        }
                        transition={{ duration: 0.9 }}
                      >
                        {/* <div className="nameAndReviewTextBox"> */}
                        <Box className="review-name" fontSize={"40px"} mb={1}>
                          {url.highlighText}
                        </Box>
                        <Typography className="reviewText" fontSize={"16px"}>
                          {url.review}
                        </Typography>
                        <Typography
                          className="userName"
                          fontSize={"18px"}
                          mt={1}
                        >
                          {url.name}
                        </Typography>
                        <Typography className="profession" fontSize={"16px"}>
                          {url.profession}
                        </Typography>
                        {/* </div> */}
                      </motion.div>
                    </Box>
                  </Box>
                ))}
              </Slider>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OurClientReview;

const CustomPrevArrow = (props) => (
  <div className="custom-arrow custom-prev-arrow" onClick={props.onClick}>
    <ArrowBackIosNewIcon
      className="backIcon"
      style={{
        color: "#000",
        width: "28px",
        height: "28px",
        // marginRight: "2px",
        display: "none",
      }}
    />
    <img src={backIcon} alt="backIcon" className="back-icon" />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next-arrow" onClick={onClick}>
    <ArrowForwardIosIcon
      className="forwardIcon"
      style={{
        color: "#000",
        width: "28px",
        height: "28px",
        // marginLeft: "2px",
        display: "none",
      }}
    />
    <img src={forIcon} alt="forwardIcon" className="forIcon" />
  </div>
);

{
  /* {hasNext ? <img src={forIcon} alt="" /> : <img src="" alt="Arrow" />} */
}
