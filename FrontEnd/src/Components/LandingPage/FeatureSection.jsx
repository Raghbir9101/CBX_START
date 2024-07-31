import React from "react";
import "./Styles/FeatureSection.css";
import { Box, Button, Typography } from "@mui/material";
import feature1 from "../../Icons/feature1.svg";
import feature2 from "../../Icons/feature2.svg";
import feature3 from "../../Icons/feature3.svg";
import feature4 from "../../Icons/feature4.svg";
import { motion } from "framer-motion";
import useInView from "./useInView.jsx";
import { Link } from "react-router-dom";

const FeatureSection = () => {
  const [ref, inView] = useInView({ threshold: 0.4 });

  return (
    <>
      <Box className="featureMainContainer" id="features" ref={ref}>
        <Box className="featureContainer">
          {/* Left box */}
          <motion.div
            className="feature-left-box"
            initial={{ y: 500, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 500, opacity: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
              className="feature-cardF"
            >
              <Box
                className="feature-card-box"
                sx={{
                  boxShadow: 1,
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <Box>
                  <img
                    src={feature1}
                    alt="Icon"
                    loading="lazy"
                    className="feature-icon"
                  />
                </Box>
                <Typography
                  className="feature-card-heading"
                  sx={{ fontSize: "22px" }}
                >
                  Personalized Link Organization
                </Typography>
                <Typography
                  className="feature-card-sub-heading"
                  fontSize={"16px"}
                >
                  Go beyond basic bookmarks. Create custom pages to categorize
                  links for projects, clients, or interests. Add notes, tags,
                  and visuals to make them easy to find and use.
                </Typography>
              </Box>

              <Box
                className="feature-card-box"
                sx={{
                  boxShadow: 1,
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <Box>
                  <img
                    src={feature2}
                    alt="Icon"
                    loading="lazy"
                    className="feature-icon"
                  />
                </Box>
                <Typography
                  className="feature-card-heading"
                  sx={{ fontSize: "22px" }}
                >
                  Integrated Productivity Tools
                </Typography>
                <Typography
                  className="feature-card-sub-heading"
                  fontSize={"16px"}
                >
                  Combine link management with a suite of productivity features.
                  Take notes, create to-do lists, set deadlines, track progress,
                  and stay organized without switching between apps.
                </Typography>
              </Box>
            </Box>

            {/* second and thirld card */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                mt: "4rem",
              }}
              className="feature-cardS"
            >
              <Box
                className="feature-card-box"
                sx={{
                  boxShadow: 1,
                  zIndex: 999,
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <Box>
                  <img
                    src={feature3}
                    alt="Icon"
                    loading="lazy"
                    className="feature-icon"
                  />
                </Box>
                <Typography
                  className="feature-card-heading"
                  sx={{ fontSize: "22px" }}
                >
                  Global Accessibility
                </Typography>
                <Typography
                  className="feature-card-sub-heading"
                  fontSize={"16px"}
                >
                  Stay connected and on top of your work from anywhere in the
                  world. Access your links, notes, and tasks seamlessly from
                  your desktop, tablet, or mobile device.{" "}
                  <span style={{ visibility: "hidden" }}>
                    your desktop, tablet, or mobile device device.
                  </span>
                </Typography>
              </Box>
              <Box
                className="feature-card-box"
                sx={{
                  boxShadow: 1,
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <Box>
                  <img
                    src={feature4}
                    alt="Icon"
                    loading="lazy"
                    className="feature-icon"
                  />
                </Box>
                <Typography
                  className="feature-card-heading"
                  sx={{ fontSize: "22px" }}
                >
                  Customizable Workspace
                </Typography>
                <Typography
                  className="feature-card-sub-heading"
                  fontSize={"16px"}
                >
                  Make start.ceoitbox.com your own. Choose themes, layouts, and
                  widgets that match your style and workflow. Tailor the
                  platform to fit your unique needs and preferences.
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Right box */}
          <motion.div
            className="feature-right-box"
            initial={{ x: 500, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: 500, opacity: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Typography className="feature-heading" fontSize={"40px"}>
              Streamline
            </Typography>
            <Typography className="feature-heading" fontSize={"40px"}>
              Your Day The Ultimate
            </Typography>
            <Typography className="feature-heading" fontSize={"40px"}>
              Link, Note & Task Hub
            </Typography>
            <Typography
              className="feature-sub-heading"
              fontSize={"16px"}
              mt={1}
            >
              Bookmark links, take notes, manage tasks, and more – all
            </Typography>
            <Typography className="feature-sub-heading" fontSize={"16px"}>
              in one beautifully designed space.
            </Typography>
            <Typography className="feature-heading1" fontSize={"40px"}>
              Discover the Comprehensive Features of Our Website
            </Typography>
            <Typography
              className="feature-sub-heading1"
              fontSize={"16px"}
              mt={1}
            >
              Bookmark links, take notes, manage tasks, and more – all in one
              beautifully designed space.
            </Typography>
            <Box mt={"50px"}>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  variant="contained"
                  className="feature-signin-btn "
                  sx={{
                    p: "10px 60px",
                    fontSize: "20px",
                    "&:hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  Sign In
                </Button>
              </Link>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default FeatureSection;
