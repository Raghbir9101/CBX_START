import { Box } from "@mui/material";
import React from "react";
import TabButtons from "../TabButtons";

const TodoList = () => {
  return (
    <>
      <Box sx={{ background: "#F4F4F4", minHeight: "100vh", width: "100%" }}>
        <TabButtons />

        <Box>All Todos</Box>
      </Box>
    </>
  );
};

export default TodoList;
