import React from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  CssBaseline,
  TextField,
} from "@mui/material";
import img from "../../Icons/loginImg.svg";
import bgImg from "../../Icons/bg.svg";
import gImg from "../../Icons/gImage.svg";
import "./Login.css";

const App = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
    },
    box: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "white",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
    },
    logo: {
      marginBottom: "20px",
    },
    button: {
      marginTop: "20px",
      backgroundColor: "#4285F4",
      color: "white",
    },
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            pt: 5,
          }}
        >
          <Box>
            <img
              src="https://c.animaapp.com/YKPFj7gL/img/image-8@2x.png"
              alt="logo"
            />
          </Box>

          <Typography variant="h3" sx={{ color: "#2E2D2D" }}>
            Welcome Back!
          </Typography>
          <Typography
            sx={{ color: "#777171", fontSize: "18px", fontWeight: 500 }}
          >
            Please login to your account.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              onClick={() =>
                (window.location.href = "http://localhost/auth/google")
              }
              startIcon={
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={gImg}
                  alt=""
                />
              }
              sx={{
                border: "2px solid #4D8733",
                textTransform: "none",
                p: "5px 30px",
                fontSize: "22px",
                borderRadius: "12px",
                color: "#2E2D2D",
              }}
            >
              {" "}
              Google
            </Button>
          </Box>
        </Box>
        <Box className="sideImgBox" sx={{ width: "650px", height: "650px" }}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={img}
            alt=""
            loading="lazy"
          />
        </Box>
      </Box>
    </>
  );
};

export default App;
