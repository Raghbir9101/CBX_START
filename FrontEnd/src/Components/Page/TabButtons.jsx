import React, { useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, MenuItem, Tooltip } from "@mui/material";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import { Link, useLocation } from "react-router-dom";
import search from "../../Icons/gsearch.svg";
import clear from "../../Icons/cross.svg";
import googleSearch from "../../Icons/googleSearchIcon.svg";
import gImg from "../../Icons/gImage.svg";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import axios from "axios";
import HTTP from "../../HTTP";

const clearedPageData = [
  {
    items: [],
  },
  {
    items: [],
  },
  {
    items: [],
  },
  {
    items: [],
  },
  {
    items: [],
  },
];

const TabButtons = ({
  filters,
  setFilters,
  setPageData,
  setFilteredPageData,
}) => {
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);
  const [googleSearch, setGoogleSearch] = useState("");
  const [googleSearchSuggestions, setGoogleSearchSuggestions] = useState([]);
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
        setGoogleSearch("")
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
    setGoogleSearch("")
    setSearchVisible(false);
  };

  const toggleFilter = (filterName) => {
    setFilters((p) => {
      let temp = { ...p };
      if (temp[filterName]) delete temp[filterName];
      else temp[filterName] = 1;
      return temp;
    });
  };

  const handleReset = () => {
    setFilters({});
  };

  useEffect(() => {
    if (!googleSearch) return setGoogleSearchSuggestions([]);

    let temp = setTimeout(() => {
      HTTP.get(`googlesearch?q=${googleSearch}`).then(res => {
        console.log(res)
        setGoogleSearchSuggestions(res?.data?.[1] || [])
      })
    }, 300)

    return () => {
      clearTimeout(temp)
    }
  }, [googleSearch])

  console.log(googleSearchSuggestions)
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
          onClick={() => {
            toggleFilter("Note");
          }}
          className={filters["Note"] ? "isActive" : "headingBtns"}
          sx={{
            boxShadow: 1,
            // transform: filters.Note ? "scale(110%)" : "none",
          }}
          startIcon={
            <IconButton
              className={filters["Note"] ? "isActiveIcons" : "iconBtns"}
              sx={{ p: "4px", mr: 1 }}
            >
              <TextSnippetOutlinedIcon sx={{ width: "16px", height: "16px" }} />
            </IconButton>
          }
        >
          Notes
        </Button>

        <Link>
          <Button
            onClick={() => {
              toggleFilter("Todo");
            }}
            sx={{
              boxShadow: 1,
              // transform: filters.Todo ? "scale(110%)" : "none",
            }}
            className={filters["Todo"] ? "isActive" : "headingBtns"}
            startIcon={
              <IconButton
                className={filters["Todo"] ? "isActiveIcons" : "iconBtns"}
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
          onClick={() => {
            toggleFilter("Bookmark");
          }}
          sx={{
            boxShadow: 1,
            // transform: filters.Bookmark ? "scale(110%)" : "none",
          }}
          className={filters["Bookmark"] ? "isActive" : "headingBtns"}
          startIcon={
            <IconButton
              className={filters["Bookmark"] ? "isActiveIcons" : "iconBtns"}
              sx={{ p: "4px", mr: 1 }}
            >
              <LinkOffOutlinedIcon sx={{ width: "16px", height: "16px" }} />
            </IconButton>
          }
        >
          Links
        </Button>

        {/* Search Icon */}
        <Box
          sx={{
            position: "absolute",
            right: 0,
            mr: "10px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Tooltip title="Reset" arrow>
            <IconButton
              onClick={handleReset}
              sx={{
                boxShadow: 1,
                background: "#fff",
                "&:hover": {
                  boxShadow: 2,
                  background: "#fff",
                },
              }}
            >
              <RestartAltIcon sx={{ color: "#4d8733" }} />
            </IconButton>
          </Tooltip>
          {!searchVisible && (
            <Tooltip title="Google Search" arrow>
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
                <img
                  style={{ width: "25px", height: "25px" }}
                  src={gImg}
                  alt="search"
                />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
      {searchVisible && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "relative"
          }}
          ref={searchInputRef}
        >
          <div className="gcse-search"></div>
          <Box
            className="inputBox "
            sx={{ position: "relative", boxShadow: 1, borderRadius: "12px" }}
          >
            <input
              className="googleSearchInput"
              type="text"
              placeholder="Google Search"
              onChange={(e) => {
                setGoogleSearch(e.target.value)
              }}
            />
            <img
              className="gsearchIcon"
              style={{ width: "22px", height: "22px" }}
              src={gImg}
              alt="search"
            />
            <img
              className="closeIcon"
              src={clear}
              alt="close"
              onClick={handleCloseClick}
            />

            {googleSearchSuggestions.length > 0 && <Box overflow={"hidden"} position={"absolute"} sx={{ boxShadow: 1 }} bgcolor={"white"} width={"100%"} top={`calc( 100% + 5px )`} zIndex={"99"} borderRadius={"20px"}>
              {(googleSearchSuggestions || []).map(item => {
                return <MenuItem onClick={() => {
                  window.open(`https://www.google.com/search?q=${item}`);
                  handleCloseClick()
                }} width={"100%"} padding={"10px 20px"}>
                  {item}
                </MenuItem>
              })}
            </Box>}

          </Box>
        </Box>
      )}
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
