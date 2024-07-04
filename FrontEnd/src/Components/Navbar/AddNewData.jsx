import React from "react";
import { Popover, Box } from "@mui/material";

const AddNewData = ({ open, anchorEl, handlePopoverClose }) => {
  return (
    <Popover
      sx={{
        pointerEvents: "none",
        borderRadius: "16px",
        mt: "18px",
        width: "320px",
        height: "auto",
        "& .MuiPaper-root": {
          borderRadius: "16px",
          border: "1px solid #EDF2E6",
          width: "320px",
          height: "auto",
        },
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Box>Hello I am popover</Box>
    </Popover>
  );
};

export default AddNewData;
