import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import { Link, useLocation } from "react-router-dom";

const TabButtons = () => {
  const location = useLocation();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "25px",
          p: 4,
        }}
      >
        <Button
          className="headingBtns"
          sx={{ boxShadow: 1 }}
          startIcon={
            <IconButton className="iconBtns" sx={{ p: "4px", mr: 1 }}>
              <TextSnippetOutlinedIcon sx={{ width: "16px", height: "16px" }} />
            </IconButton>
          }
        >
          Notes
        </Button>

        <Link to="/todo-list">
          <Button
            sx={{ boxShadow: 1 }}
            className={
              location.pathname === "/todo-list" ? "isActive" : "headingBtns"
            }
            startIcon={
              <IconButton
                className={
                  location.pathname === "/todo-list"
                    ? "isActiveIcons"
                    : "iconBtns"
                }
                sx={{ p: "4px", mr: 1 }}
              >
                <FormatListBulletedOutlinedIcon
                  sx={{ width: "16px", height: "16px" }}
                />
              </IconButton>
            }
          >
            To do List
          </Button>
        </Link>

        <Button
          sx={{ boxShadow: 1 }}
          className="headingBtns"
          startIcon={
            <IconButton className="iconBtns" sx={{ p: "4px", mr: 1 }}>
              <ChecklistOutlinedIcon sx={{ width: "16px", height: "16px" }} />
            </IconButton>
          }
        >
          Task List
        </Button>

        <Button
          sx={{ boxShadow: 1 }}
          className="headingBtns"
          startIcon={
            <IconButton className="iconBtns" sx={{ p: "4px", mr: 1 }}>
              <LinkOffOutlinedIcon sx={{ width: "16px", height: "16px" }} />
            </IconButton>
          }
        >
          Links
        </Button>
      </Box>
    </>
  );
};

export default TabButtons;
