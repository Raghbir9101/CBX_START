import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import "./Styles/HeroSection.css";
import image from "../../Icons/heroSection.svg";
import { motion } from "framer-motion";
import useInView from "./useInView.jsx";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import bgSvg from "../../Icons/heroBg.svg";

const HeroSection = () => {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        className="heroMainContainer"
        ref={ref}
        // sx={{
        //   backgroundImage: `url(${bgSvg})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        // }}
        draggable={false}
      >
        <Box className="contantBox">
          <Box className="HeadingBox">
            <Box>
              <img
                style={{ width: "58px", height: "58px" }}
                src="https://ceoitbox.com/wp-content/uploads/2022/04/logo.png.webp"
                alt="Logo"
                loading="lazy"
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button variant="contained" className="loginButton">
                  Login
                </Button>
              </Link>
              <div id="google_translate_element"></div>

              <Box className="menuIconBox">
                <IconButton onClick={handleClick}>
                  <MenuOutlinedIcon style={{ color: "#4d8733" }} />
                </IconButton>
              </Box>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                sx={{
                  // mt: "60px",
                  "& .MuiPaper-root": {
                    borderRadius: "19px",
                    padding: "10px 10px",
                    border: "1px solid rgba(183, 175, 208, 0.16)",
                    boxShadow: "27px 10px 74px 0px rgba(167, 175, 193, 0.26)",
                  },
                }}
              >
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "16px",
                      fontWeight: 550,
                      color: "#4d8733",
                    }}
                  >
                    {" "}
                    <LoginIcon
                      sx={{ color: "#4d8733", width: "18px", height: "18px" }}
                    />{" "}
                    Log in
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
          </Box>

          <Box className="hero-container">
            <motion.div
              className="hero-leftBox"
              initial={{ x: -500, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: -500, opacity: 0 }}
              transition={{ duration: 0.9 }}
            >
              <Typography className="hero-heading" sx={{ fontSize: "40px" }}>
                Your Digital Head
              </Typography>
              <Typography className="hero-heading" sx={{ fontSize: "40px" }}>
                Quarters
              </Typography>
              <Typography className="hero-heading1" sx={{ fontSize: "40px" }}>
                Your Digital Head Quarters
              </Typography>

              <Typography
                className="hero-sub-heading"
                sx={{ fontSize: "20px" }}
              >
                All Your Work, Organized
              </Typography>
              <Typography
                className="hero-sub-heading"
                sx={{ fontSize: "20px" }}
              >
                in One Place
              </Typography>
              <Typography
                className="hero-sub-heading1"
                sx={{ fontSize: "20px" }}
              >
                All Your Work, Organized in One Place
              </Typography>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  variant="contained"
                  className="getStaredBtn"
                  sx={{
                    fontSize: "20px",
                    mt: 6,
                    p: "10px 45px",
                    "&:hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  Get Organized
                </Button>
              </Link>
            </motion.div>
            <motion.div
              className="hero-rightBox"
              initial={{ y: 500, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 500, opacity: 0 }}
              transition={{ duration: 0.9 }}
            >
              <Box sx={{ width: "100%" }}>
                <img
                  src={image}
                  alt="Image"
                  // loading="lazy"
                  style={{ width: "100%", height: "100%" }}
                  draggable={false}
                />
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeroSection;
