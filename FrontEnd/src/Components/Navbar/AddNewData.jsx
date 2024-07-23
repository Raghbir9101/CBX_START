import React from "react";
import { Popover, Box, IconButton, Typography, Divider } from "@mui/material";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CodeOffOutlinedIcon from "@mui/icons-material/CodeOffOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import { v4 } from "uuid";

function addObjectToShortestArray(data, newObject) {
  // Initialize variables to keep track of the shortest array
  let shortestArray = data[0].items;
  let shortestArrayIndex = 0;

  // Iterate through the data to find the shortest array
  data.forEach((dataItem, dataIndex) => {
    if (dataItem.items.length < shortestArray.length) {
      shortestArray = dataItem.items;
      shortestArrayIndex = dataIndex;
    }
  });

  // Push the new object into the shortest array
  data[shortestArrayIndex].items.push(newObject);
  // Return the updated data structure
  return data;
}

const items = [
  {
    icon: <TextSnippetOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "Note",
    name: "Note",
    defaultObj: {
      type: "Note",
      data: {
        name: "Note",
        html: "",
        collapsed: true,
      },
    },
  },
  {
    icon: <FormatListBulletedOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "To do List",
    name: "Todo",
    defaultObj: {
      type: "Todo",
      data: {
        name: "Todo List",
        tasks: [],
        collapsed: true,
      },
    },
  },
  {
    icon: <BookmarkBorderOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "Bookmarks",
    name: "Bookmark",
    defaultObj: {
      type: "Bookmark",
      data: {
        name: "My Links",
        URLs: [],
        collapsed: true,
      },
    },
  },
  {
    icon: <CodeOffOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "Embed",
    name: "Embed",
    defaultObj: {
      type: "Embed",
      data: {
        name: "",
        url: "",
        collapsed: true,
      },
    },
  },
  // { icon: <FeedOutlinedIcon sx={{ color: "#4D8733" }} />, label: "Newsfeed" },
  {
    icon: <CalendarMonthOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "Calendar",
    name: "Google Calendar",
    defaultObj: {
      type: "Google Calendar",
      data: {
        name: "Google Calendar",
        url: "",
        collapsed: true,
      },
    },
  },
  {
    icon: <CurrencyExchangeOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "Currency Convertor",
    name: "Currency Converter",
    defaultObj: {
      type: "Currency Converter",
      data: {
        name: "",
        collapsed: true,
      },
    },
  },
  {
    icon: <QueryBuilderOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "Analog Clock",
    name: "Clock",
    defaultObj: {
      type: "Clock",
      data: {
        name: "",
        collapsed: true,
      },
    },
  },
  {
    icon: <QueryBuilderOutlinedIcon sx={{ color: "#4D8733" }} />,
    label: "Calculator",
    name: "Calculator",
    defaultObj: {
      type: "Calculator",
      data: {
        name: "",
        url: "",
        collapsed: true,
      },
    },
  },
  // {
  //   icon: <QueryBuilderOutlinedIcon sx={{ color: "#4D8733" }} />,
  //   label: "World Clock",
  // },
  // { icon: <CloudOutlinedIcon sx={{ color: "#4D8733" }} />, label: "Weather" },
];

// Sort items alphabetically by label
const sortedItems = items.sort((a, b) => a.label.localeCompare(b.label));

const Item = ({ icon, label, name, setPageData, defaultObj }) => (
  <Box
    onClick={() => {
      setPageData((p) => {
        // console.log(addObjectToShortestArray([...p], defaultObj))
        // return p
        // console.log(defaultObj)
        return addObjectToShortestArray([...p], { ...defaultObj, id: v4() });
      });

      // console.log(name)
    }}
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

const AddNewData = ({ open, anchorEl, handlePopoverClose, setPageData }) => {
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
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            pb: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              width: "80px",
              borderRadius: "16px",
              p: 1,
              cursor: "pointer",
              "&:hover": {
                background: "#f2f5f7",
              },
            }}
          >
            <IconButton sx={{ border: "1px solid #DBDBDB" }}>
              <TextSnippetOutlinedIcon
                sx={{ color: "#4D8733", width: "18px", height: "18px" }}
              />
            </IconButton>
            <Typography
              sx={{
                whiteSpace: "wrap",
                textAlign: "center",
                width: "100%",
                fontSize: "14px",
              }}
            >
              Note
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              width: "80px",
              borderRadius: "16px",
              p: 1,
              cursor: "pointer",
              "&:hover": {
                background: "#f2f5f7",
              },
            }}
          >
            <IconButton sx={{ border: "1px solid #DBDBDB" }}>
              <FormatListBulletedOutlinedIcon
                sx={{ color: "#4D8733", width: "18px", height: "18px" }}
              />
            </IconButton>
            <Typography
              sx={{
                fontSize: "14px",
                whiteSpace: "nowrap",
                textAlign: "center",
                width: "100%",
                // lineHeight: "20px",
              }}
            >
              To do List
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              width: "80px",
              borderRadius: "16px",
              p: 1,
              cursor: "pointer",
              "&:hover": {
                background: "#f2f5f7",
              },
            }}
          >
            <IconButton sx={{ border: "1px solid #DBDBDB" }}>
              <BookmarkBorderOutlinedIcon
                sx={{ color: "#4D8733", width: "18px", height: "18px" }}
              />
            </IconButton>
            <Typography
              sx={{
                whiteSpace: "wrap",
                textAlign: "center",
                width: "100%",
                fontSize: "14px",
              }}
            >
              Link
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 1 }} />

        <Box className="gridContainer" sx={{ pr: 2 }}>
          {sortedItems.map((item, index) => {
            return (
              <Item
                defaultObj={item.defaultObj}
                setPageData={setPageData}
                key={index}
                icon={item.icon}
                name={item.name}
                label={item.label}
              />
            );
          })}
        </Box>
      </Box>
    </Popover>
  );
};

export default AddNewData;
