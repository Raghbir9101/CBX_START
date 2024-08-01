import "./App.css";
import { Box, IconButton, Tooltip } from "@mui/material";
import AllRoutes from "./Components/Routes/AllRoutes";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Context } from "./Components/Context/Context";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HTTP from "./HTTP";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import toast from "react-hot-toast";
import { useLocale } from "antd/es/locale";
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

  const location = useLocation();

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

          localStorage.setItem("token", res.token);
          // sessionStorage.setItem("token", res.token);
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

  const loadGoogleTranslateScript = () => {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };
  };

  useEffect(() => {
    if (location.pathname != "/") return;
    loadGoogleTranslateScript();
  }, [location.pathname]);
  useEffect(() => {
    let intervalID = setInterval(() => {
      const doc = document.getElementById(":1.container");

      if (doc) {
        // doc.onload = () => {
        try {
          const iframeDocument = doc.contentDocument || doc.contentWindow.document;
          const restoreButton = iframeDocument.getElementById(":1.restore");
          restoreButton.classList.add("restoreBtn")
          // restoreButton.textContent = "Reset"
          const googleTranslateElement = document.getElementById("google_translate_element");
          const select = document.querySelector(".goog-te-combo");
          if (select) {
            googleTranslateElement.appendChild(restoreButton);
            clearInterval(intervalID)
          }
        } catch (err) {
          console.log(err);
        }
      };
    }, 1000)
    return () =>{ 
      clearInterval(intervalID)
    }
    // }
  }, []); // Empty dependency array to run useEffect only once on mount

  return (
    <Box>
      {loginUser?.isAdmin && (
        <Tooltip title="Admin Panel">
          <IconButton
            onClick={() => {
              let splittedHref = window.location.href.split("/");
              if (splittedHref[splittedHref.length - 1] == "AdminPanel") {
                nav("/page/" + pages[0]._id);
              } else nav("/AdminPanel");
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
