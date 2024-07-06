import "./App.css";
import { Box } from "@mui/material";
import AllRoutes from "./Components/Routes/AllRoutes";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Context } from "./Components/Context/Context";
import { useNavigate } from "react-router-dom";
import HTTP from "./HTTP";

function App() {
  const {
    token,
    setToken,
    setLoginUser,
    loginUser,
    pages,
    setPages,
    isLoading,
    setIsLoading,
  } = useContext(Context);

  const nav = useNavigate();

  useEffect(() => {
    try {
      setIsLoading(true);
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");
      if (code == null) {
        if (!token) {
          return;
        }
        HTTP.get("getUserData").then(({ data: res }) => {
          console.log(res);
          setLoginUser(res);
          setPages(res.pages || []);
          nav("/page/" + res.pages[0]._id);
          setIsLoading(false);
        });
        return;
      }

      // .get("https://data.ceoitbox.com/auth/google/callback?code=" + code)
      axios
        .get("http://localhost/auth/google/callback?code=" + code)
        .then(({ data: res }) => {
          if (res.error) {
            setIsLoading(false);
            return;
          }
          console.log(res);
          if (!token && !loginUser) {
            setToken(res.token);
            setLoginUser(res.body);
            setPages(res.body.pages || []);
          }

          sessionStorage.setItem("token", res.token);
          setIsLoading(false);
          nav("/page/" + res.body.pages[0]._id);
        });
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }
  }, []);
  return (
    <Box>
      <AllRoutes />
    </Box>
  );
}

export default App;