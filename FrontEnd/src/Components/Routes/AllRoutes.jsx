import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Page from "../Page/Page";
import Login from "../Login/Login";
import { Context } from "../Context/Context";
import HomePage from "../Homepage/Homepage";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import TodoList from "../Page/Pages/TodoList";
function AllRoutes() {
  const { token, pages, isLoading } = useContext(Context);

  return (
    <Box>
      <Navbar />
      <Routes>
        {/* <Route path='/' element={!token ? <Navigate to={"/login"} /> : <></>} /> */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            token ? <Navigate to={"/page/" + pages[0]?._id} /> : <Login></Login>
          }
        />
        {/* {!isLoading && <> */}
        <Route path="/page/:pageID" element={<Page />} />
        <Route path="/todo-list" element={<TodoList />} />
        {/* </>} */}
      </Routes>
    </Box>
  );
}

export default AllRoutes;
