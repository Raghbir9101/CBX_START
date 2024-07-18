import "./App.css";
import { Box, IconButton, Tooltip } from "@mui/material";
import AllRoutes from "./Components/Routes/AllRoutes";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Context } from "./Components/Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import HTTP from "./HTTP";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import toast from "react-hot-toast";
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
    apiLink,
  } = useContext(Context);

  const nav = useNavigate();

  useEffect(() => {
    try {
      setIsLoading(true);
      let splittedHref = window.location.href.split("/");
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");
      if (code == null) {
        if (!token) {
          return;
        }
        HTTP.get("getUserData").then(({ data: res }) => {
          setLoginUser(res);
          setPages(res.pages || []);
          if (splittedHref[3] == "page") {
            for (let i of res.pages || []) {
              if (i._id == splittedHref[4]) {
                nav("/page/" + splittedHref[4]);
                return setIsLoading(false);
              }
            }
          }
          nav("/page/" + res.pages[0]._id);
          setIsLoading(false);
        });
        return;
      }

      // .get("https://data.ceoitbox.com/auth/google/callback?code=" + code)
      axios
        .get(apiLink + "/auth/google/callback?code=" + code)
        // .get("http://localhost/auth/google/callback?code=" + code)
        .then(({ data: res }) => {
          if (res.error) {
            toast.error(res.error);
            setIsLoading(false);
            return;
          }
          if (!token && !loginUser) {
            setToken(res.token);
            setLoginUser(res.body);
            setPages(res.body.pages || []);
          }

          sessionStorage.setItem("token", res.token);
          setIsLoading(false);
          for (let i of res?.body?.pages) {
            if (i._id == splittedHref) {
              return nav("/page/" + splittedHref);
            }
          }
          nav("/page/" + res.body.pages[0]._id);
        });
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }
  }, []);

  return (
    <Box>
      {loginUser?.isAdmin && (
        <Tooltip title="Admin Panel">
          <IconButton
            onClick={() => {
              nav("/AdminPanel");
            }}
            size="large"
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 100,
              bgcolor: "#d7d7d7",
              "&:hover": { bgcolor: "#d7d7d7" },
            }}
          >
            <AdminPanelSettingsIcon sx={{ color: "#4d8733" }} />
          </IconButton>
        </Tooltip>
      )}
      <AllRoutes />
    </Box>
  );
}

export default App;
