import React, { useEffect, useRef, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import { Link, useLocation } from "react-router-dom";
import search from "../../Icons/gsearch.svg";
import clear from "../../Icons/cross.svg";
import googleSearch from "../../Icons/googleSearchIcon.svg";

const clearedPageData = [
  {
      "items": []
  },
  {
      "items": []
  },
  {
      "items": []
  },
  {
      "items": []
  },
  {
      "items": []
  }
];


const TabButtons = ({ filters,
  setFilters, setPageData, setFilteredPageData }) => {
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setSearchVisible(false);
      }
    };

    if (searchVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchVisible]);

  const handleCloseClick = () => {
    setSearchVisible(false);
  };

  const toggleFilter = (filterName) => {
    setFilters(p => {
      let temp = { ...p };
      if(temp[filterName]) delete temp[filterName]
      else temp[filterName] = 1
      return temp
    })
  }
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "25px",
          p: 4,
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        <Button
          onClick={()=>{
            setFilters([])
          }}
          className="headingBtns"
          sx={{ boxShadow: 1}}
          // startIcon={
          //   <IconButton className="iconBtns" sx={{ p: "4px", mr: 1 }}>
          //     <TextSnippetOutlinedIcon sx={{ width: "16px", height: "16px" }} />
          //   </IconButton>
          // }
        >
          Reset
        </Button>
        <Button
          onClick={()=>{
            toggleFilter("Note")
          }}
          className="headingBtns"
          sx={{ boxShadow: 1, transform:filters.Note ? "scale(110%)" : "none"}}
          startIcon={
            <IconButton className="iconBtns" sx={{ p: "4px", mr: 1 }}>
              <TextSnippetOutlinedIcon sx={{ width: "16px", height: "16px" }} />
            </IconButton>
          }
        >
          Notes
        </Button>

        <Link >
          <Button onClick={()=>{
            toggleFilter("Todo")
          }}
            sx={{ boxShadow: 1, transform:filters.Todo ? "scale(110%)" : "none" }}
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

        <Button onClick={()=>{
            toggleFilter("Bookmark")
          }}
          sx={{ boxShadow: 1, transform:filters.Bookmark ? "scale(110%)" : "none" }}
          className="headingBtns"
          startIcon={
            <IconButton className="iconBtns" sx={{ p: "4px", mr: 1 }}>
              <LinkOffOutlinedIcon sx={{ width: "16px", height: "16px" }} />
            </IconButton>
          }
        >
          Links
        </Button>
        <Button onClick={()=>{
            setPageData(clearedPageData)
            setFilteredPageData(clearedPageData)
          }}
          sx={{ boxShadow: 1 }}
          className="headingBtns"
          // startIcon={
          //   <IconButton className="iconBtns" sx={{ p: "4px", mr: 1 }}>
          //     <LinkOffOutlinedIcon sx={{ width: "16px", height: "16px" }} />
          //   </IconButton>
          // }
        >
          Clear Page
        </Button>

        {searchVisible && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              // width: "100%",
            }}
            ref={searchInputRef}
          >
            <Box className="inputBox" sx={{ position: "relative" }}>
              <input
                className="googleSearchInput"
                type="text"
                placeholder="Google Search"
              />
              <img className="gsearchIcon" src={search} alt="search" />
              <img
                className="closeIcon"
                src={clear}
                alt="close"
                onClick={handleCloseClick}
              />
            </Box>
          </Box>
        )}

        {/* Search Icon */}
        {!searchVisible && <Box sx={{ position: "absolute", right: 0, mr: "10px", zIndex: 999 }}>
          <IconButton
            onClick={handleSearchClick}
            sx={{
              background: "#fff",
              boxShadow: 1,
              "&:hover": {
                boxShadow: 2,
                background: "#fff",
              },
            }}
          >
            <img src={googleSearch} alt="search" />
          </IconButton>
        </Box>}
      </Box>
    </Box>
  );
};

export default TabButtons;

{
  /* <Button
          sx={{ boxShadow: 1 }}
          className="headingBtns"
          startIcon={
            <IconButton className="iconBtns" sx={{ p: "4px", mr: 1 }}>
              <ChecklistOutlinedIcon sx={{ width: "16px", height: "16px" }} />
            </IconButton>
          }
        >
          Task List
        </Button> */
}
