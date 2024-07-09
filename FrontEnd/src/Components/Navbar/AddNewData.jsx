import React from "react";
import { Popover, Box, IconButton, Typography } from "@mui/material";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CodeOffOutlinedIcon from "@mui/icons-material/CodeOffOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";

const items = [
  {
    icon: <TextSnippetOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "Note",
  },
  {
    icon: <FormatListBulletedOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "To do List",
  },
  {
    icon: <BookmarkBorderOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "Bookmarks",
  },
  { icon: <CodeOffOutlinedIcon sx={{ color: "#4D8733" }} />, label: "Embed" },
  // { icon: <FeedOutlinedIcon sx={{ color: "#4D8733" }} />, label: "Newsfeed" },
  {
    icon: <CalendarMonthOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "Calendar",
  },
  {
    icon: <CurrencyExchangeOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "Currency Convertor",
  },
  {
    icon: <QueryBuilderOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "Analog Clock",
  },
  // {
  //   icon: <QueryBuilderOutlinedIcon sx={{ color: "#4D8733" }} />,
  //   label: "World Clock",
  // },
  // { icon: <CloudOutlinedIcon sx={{ color: "#4D8733" }} />, label: "Weather" },
];

// Sort items alphabetically by label
const sortedItems = items.sort((a, b) => a.label.localeCompare(b.label));

const Item = ({ icon, label }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
      width: "100px",
      borderRadius: "16px",
      p: 1,
      cursor: "pointer",
      "&:hover": {
        background: "#f2f5f7",
      },
    }}
  >
    <IconButton sx={{ border: "1px solid #DBDBDB" }}>{icon}</IconButton>
    <Typography sx={{ whiteSpace: "wrap", textAlign: "center", width: "100%" }}>
      {label}
    </Typography>
  </Box>
);

const AddNewData = ({ open, anchorEl, handlePopoverClose }) => {
  return (
    <Popover
      sx={{
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
      <Box sx={{ p: "24px 10px 24px 24px" }}>
        <Box className="gridContainer" sx={{ pr: 2 }}>
          {sortedItems.map((item, index) => (
            <Item key={index} icon={item.icon} label={item.label} />
          ))}
        </Box>
      </Box>
    </Popover>
  );
};

export default AddNewData;
