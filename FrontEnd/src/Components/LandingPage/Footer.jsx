import React from "react";
import "./Styles/Footer.css";
import { Box, IconButton, Typography } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import backgroundImg from "../../SvgIcons/footerBg.svg";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          background: "#fff",
          p: "50px 0px",
          borderTop: "1px solid #ccc",
          // backgroundImage: `url(${backgroundImg})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            width: "90%",
            m: "auto",
          }}
        >
          <Box
            className="footerContainer"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box className="logo-box" sx={{ display: "flex", gap: "5px" }}>
                <Typography
                  sx={{
                    fontSize: "32px",
                    fontWeight: 600,
                    fontStyle: "normal",
                    lineHeight: "normal",
                    color: "#4d8733",
                  }}
                >
                  CBX START
                </Typography>
              </Box>
              {/*Social  Logo */}
              <Box
                className="logo-box"
                sx={{
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <a
                  href="https://www.instagram.com/sanjeevjain_coach/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    sx={{
                      p: "5px",
                      color: "#4d8733",
                      "&:hover": {
                        background: "#4d8733",
                        color: "#fff",
                      },
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </a>

                <a
                  href="https://www.youtube.com/@SanjeevJainCBX"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    sx={{
                      p: "5px",
                      color: "#4d8733",
                      "&:hover": {
                        background: "#4d8733",
                        color: "#fff",
                      },
                    }}
                  >
                    <YouTubeIcon />
                  </IconButton>
                </a>

                <a
                  href="https://www.facebook.com/ceoitbox/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    sx={{
                      p: "5px",
                      color: "#4d8733",
                      "&:hover": {
                        background: "#4d8733",
                        color: "#fff",
                      },
                    }}
                  >
                    <FacebookOutlinedIcon />
                  </IconButton>
                </a>

                <a
                  href="https://www.linkedin.com/in/sjtns"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    sx={{
                      p: "5px",
                      color: "#4d8733",
                      "&:hover": {
                        background: "#4d8733",
                        color: "#fff",
                      },
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                </a>
              </Box>
              <Box className="logo-box" sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 300,
                    lineHeight: "24px",
                    color: "#2E2D2D",
                  }}
                >
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>©</span>{" "}
                  2024 CEOITBOX All Rights Reserved
                </Typography>
              </Box>
            </Box>
            <Box
              className="footerItemBox"
              sx={{ display: "flex", gap: "100px" }}
            >
              <Box className="needHelpBox">
                <Typography
                  sx={{
                    color: "#717476",
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "30px",
                    textTransform: "uppercase",
                    mb: 1,
                    letterSpacing: "0.05em",
                  }}
                >
                  Company
                </Typography>
                <Typography
                  sx={{
                    color: "#2E2D2D",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "27px",
                    mt: 1,
                  }}
                >
                  CEOITBOX TECH SERVICES LLP
                </Typography>
                <Typography
                  sx={{
                    color: "#2E2D2D",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "27px",
                    mt: 1,
                    width: "200px",
                  }}
                >
                  293, Dhanmill Road, Chattarpur Hills, New Delhi-110074
                </Typography>
              </Box>
              <Box className="needHelpBox">
                <Typography
                  sx={{
                    color: "#717476",
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "30px",
                    textTransform: "uppercase",
                    mb: 1,
                    letterSpacing: "0.05em",
                  }}
                >
                  Need Help?
                </Typography>
                <Typography
                  sx={{
                    color: "#4d8733",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "27px",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#4d8733",
                    },
                  }}
                >
                  <a
                    href="https://ceoitbox.com/"
                    style={{ color: "inherit", textDecoration: "none" }}
                    target="_blank"
                  >
                    {" "}
                    About Us
                  </a>
                </Typography>
                <Typography
                  sx={{
                    color: "#2E2D2D",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "27px",
                    mt: 1,
                    cursor: "pointer",
                    "&:hover": {
                      color: "#4d8733",
                    },
                  }}
                >
                  <a
                    style={{ textDecoration: "none", color: "inherit" }}
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=access@ceoitbox.in&su=Enquiry on CBX START&body="
                    target="_blank"
                  >
                    Contact Us
                  </a>
                </Typography>
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  href="#features"
                >
                  <Typography
                    sx={{
                      color: "#2E2D2D",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "27px",
                      mt: 1,
                      cursor: "pointer",
                      "&:hover": {
                        color: "#4d8733",
                      },
                    }}
                  >
                    Features
                  </Typography>
                </a>
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  href="#faqs"
                >
                  <Typography
                    sx={{
                      color: "#2E2D2D",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "27px",
                      mt: 1,
                      cursor: "pointer",
                      "&:hover": {
                        color: "#4d8733",
                      },
                    }}
                  >
                    FAQ`s
                  </Typography>
                </a>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
