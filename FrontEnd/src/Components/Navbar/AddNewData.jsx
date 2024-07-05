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

const AddNewData = ({ open, anchorEl, handlePopoverClose }) => {
  return (
    <Popover
      sx={{
        // pointerEvents: "none",
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
      <Box sx={{ p: "24px 18px 24px 24px" }}>
        <Box className="gridContainer">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              width: "100px",
            }}
          >
            <Box>
              <IconButton sx={{ border: "1px solid #DBDBDB" }}>
                <TextSnippetOutlinedIcon sx={{ color: "#4D8733" }} />
              </IconButton>
            </Box>

            <Typography className="text">Note</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              width: "100px",
            }}
          >
            <Box>
              <IconButton sx={{ border: "1px solid #DBDBDB" }}>
                <FormatListBulletedOutlinedIcon sx={{ color: "#4D8733" }} />
              </IconButton>
            </Box>

            <Typography className="text">To do List</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              width: "100px",
            }}
          >
            <Box>
              <IconButton sx={{ border: "1px solid #DBDBDB" }}>
                <BookmarkBorderOutlinedIcon sx={{ color: "#4D8733" }} />
              </IconButton>
            </Box>

            <Typography className="text">Bookmarks</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              width: "100px",
            }}
          >
            <Box>
              <IconButton sx={{ border: "1px solid #DBDBDB" }}>
                <CodeOffOutlinedIcon sx={{ color: "#4D8733" }} />
              </IconButton>
            </Box>

            <Typography className="text">Embed</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              width: "100px",
            }}
          >
            <Box>
              <IconButton sx={{ border: "1px solid #DBDBDB" }}>
                <FeedOutlinedIcon sx={{ color: "#4D8733" }} />
              </IconButton>
            </Box>

            <Typography className="text">Newsfeed</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              width: "100px",
            }}
          >
            <Box>
              <IconButton sx={{ border: "1px solid #DBDBDB" }}>
                <CalendarMonthOutlinedIcon sx={{ color: "#4D8733" }} />
              </IconButton>
            </Box>

            <Typography className="text">Calendar</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              width: "100px",
            }}
          >
            <Box>
              <IconButton sx={{ border: "1px solid #DBDBDB" }}>
                <CurrencyExchangeOutlinedIcon sx={{ color: "#4D8733" }} />
              </IconButton>
            </Box>

            <Typography className="text" sx={{ width: "50px" }}>
              Currency Convertor
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              width: "100px",
            }}
          >
            <Box>
              <IconButton sx={{ border: "1px solid #DBDBDB" }}>
                <QueryBuilderOutlinedIcon sx={{ color: "#4D8733" }} />
              </IconButton>
            </Box>

            <Typography className="text" sx={{ width: "50px" }}>
              Analog Clock
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              width: "100px",
            }}
          >
            <Box>
              <IconButton sx={{ border: "1px solid #DBDBDB" }}>
                <QueryBuilderOutlinedIcon sx={{ color: "#4D8733" }} />
              </IconButton>
            </Box>

            <Typography className="text" sx={{ width: "50px" }}>
              World clock
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              width: "100px",
            }}
          >
            <Box>
              <IconButton sx={{ border: "1px solid #DBDBDB" }}>
                <CloudOutlinedIcon sx={{ color: "#4D8733" }} />
              </IconButton>
            </Box>

            <Typography className="text" sx={{ width: "50px" }}>
              Weather
            </Typography>
          </Box>
        </Box>
      </Box>
    </Popover>
  );
};

export default AddNewData;
