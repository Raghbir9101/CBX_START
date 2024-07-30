import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Page from "../Page/Page";
import Login from "../Login/Login";
import { Context } from "../Context/Context";
import HomePage from "../Homepage/Homepage";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import TodoList from "../Page/Pages/TodoList";
import AdminPanel from "../AdminPanel/AdminPanel";
import LandingPage from "../LandingPage/LandingPage";
function AllRoutes() {
  const { token, pages, loginUser } = useContext(Context);

  return (
    <Box>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/signIn" element={<HomePage />} /> */}
        <Route
          path="/login"
          element={
            token ? <Navigate to={"/page/" + pages[0]?._id} /> : <Login></Login>
          }
        />
        <Route path="/page/:pageID" element={<Page />} />
        <Route
          path="/adminPanel"
          element={
            !token || !loginUser?.isAdmin ? (
              <Navigate to={"/login"} />
            ) : (
              <AdminPanel />
            )
          }
        />
      </Routes>
    </Box>
  );
}

export default AllRoutes;
