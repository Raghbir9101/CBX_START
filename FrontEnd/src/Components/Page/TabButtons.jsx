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
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";
import { v4 } from "uuid";

const addObjectToShortestArray = (data, newObject) => {
  let shortestArray = data[0].items;
  let shortestArrayIndex = 0;

  data.forEach((dataItem, dataIndex) => {
    if (dataItem.items.length < shortestArray.length) {
      shortestArray = dataItem.items;
      shortestArrayIndex = dataIndex;
    }
  });

  data[shortestArrayIndex].items.push(newObject);
  return data;
};

// const clearedPageData = [
//   {
//     items: [<Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />],
//   },
//   {
//     items: [<Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />],
//   },
//   {
//     items: [<Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />],
//   },
//   {
//     items: [<Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />],
//   },
//   {
//     items: [<Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />, <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />],
//   },
// ];

const TabButtons = ({
  filters,
  setFilters,
  setPageData,
  setFilteredPageData,
  setSearch,
  collapseAllItems,
  collapseAll,
}) => {
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);
  const [googleSearch, setGoogleSearch] = useState("");
  const [googleSearchSuggestions, setGoogleSearchSuggestions] = useState([]);
  const searchInputRef = useRef(null);
  const [hoveredButton, setHoveredButton] = useState(null);

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
        setGoogleSearch("");
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
    setGoogleSearch("");
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
    setSearch("");
  };

  useEffect(() => {
    if (!googleSearch) return setGoogleSearchSuggestions([]);

    let temp = setTimeout(() => {
      HTTP.get(`googlesearch?q=${googleSearch}`).then((res) => {
        setGoogleSearchSuggestions(res?.data?.[1] || []);
      });
    }, 300);

    return () => {
      clearTimeout(temp);
    };
  }, [googleSearch]);

  const addNewItem = (type) => {
    let newItem;
    switch (type) {
      case "Note":
        newItem = {
          id: v4(),
          type: "Note",
          data: {
            name: "Notes",
            html: "",
            collapsed: true,
          },
        };
        break;
      case "Todo":
        newItem = {
          id: v4(),
          type: "Todo",
          data: {
            name: "Todo List",
            items: [],
            collapsed: true,
          },
        };
        break;
      case "Link":
        newItem = {
          id: v4(),
          type: "Bookmark",
          data: {
            name: "My Links",
            URLs: [],
            collapsed: true,
          },
        };
        break;
      default:
        return;
    }
    setPageData((prevPageData) =>
      addObjectToShortestArray([...prevPageData], newItem)
    );
    setHoveredButton(null);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "25px",
          flexWrap: "wrap",
          position: "relative",
          p: "10px 0px 10px 0px",
        }}
      >
        <Box className="hoverShowparent">
          <Button
            onMouseEnter={() => setHoveredButton("Note")}
            // onMouseLeave={() => setHoveredButton(null)}
            onClick={() => {
              toggleFilter("Note");
            }}
            className={filters["Note"] ? "isActive" : "headingBtns"}
            sx={{
              height: "fit-content",
              boxShadow: 1,
              "&:hover": {
                boxShadow: 2,
              },
              // transform: filters.Note ? "scale(110%)" : "none",
            }}
            startIcon={
              <IconButton
                size="small"
                className={filters["Note"] ? "isActiveIcons" : "iconBtns"}
                sx={{ mr: "2px" }}
              >
                <TextSnippetOutlinedIcon sx={{ width: "14px", height: "14px" }} />
              </IconButton>
            }
          >
            Notes
          </Button>
          <IconButton className="hoverShow"
            onClick={() => addNewItem("Note")}
            sx={{
              border: "1px solid #4D8733",
              p: "2px",
              background: "#fff",
              color: "#4D8733",
              "&:hover": {
                background: "#4D8733",
                color: "#fff",
              },
            }}
          >
            <AddIcon sx={{ width: "16px", height: "16px" }} />
          </IconButton>
        </Box>

        <Box className="hoverShowparent">
          <Link>
            <Button
              onMouseEnter={() => setHoveredButton("Todo")}
              // onMouseLeave={() => setHoveredButton(null)}
              onClick={() => {
                toggleFilter("Todo");
              }}
              sx={{
                boxShadow: 1,
                "&:hover": {
                  boxShadow: 2,
                },
                // transform: filters.Todo ? "scale(110%)" : "none",
              }}
              className={filters["Todo"] ? "isActive" : "headingBtns"}
              startIcon={
                <IconButton
                  size="small"
                  className={filters["Todo"] ? "isActiveIcons" : "iconBtns"}
                  sx={{ mr: "2px" }}
                >
                  <FormatListBulletedOutlinedIcon
                    sx={{ width: "14px", height: "14px" }}
                  />
                </IconButton>
              }
            >
              To do List
            </Button>
          </Link>

          <IconButton className="hoverShow"
            onClick={() => addNewItem("Todo")}
            sx={{
              border: "1px solid #4D8733",
              p: "2px",
              background: "#fff",
              color: "#4D8733",
              "&:hover": {
                background: "#4D8733",
                color: "#fff",
              },
            }}
          >
            <AddIcon sx={{ width: "16px", height: "16px" }} />
          </IconButton>
        </Box>

        <Box className="hoverShowparent">
          <Button
            onMouseEnter={() => setHoveredButton("Link")}
            // onMouseLeave={() => setHoveredButton(null)}
            onClick={() => {
              toggleFilter("Bookmark");
            }}
            sx={{
              boxShadow: 1,
              "&:hover": {
                boxShadow: 2,
              },
              // transform: filters.Bookmark ? "scale(110%)" : "none",
            }}
            className={filters["Bookmark"] ? "isActive" : "headingBtns"}
            startIcon={
              <IconButton
                size="small"
                className={filters["Bookmark"] ? "isActiveIcons" : "iconBtns"}
                sx={{ mr: "2px" }}
              >
                <LinkOffOutlinedIcon sx={{ width: "14px", height: "14px" }} />
              </IconButton>
            }
          >
            Links
          </Button>

          <span>
            <IconButton className="hoverShow"
              onClick={() => addNewItem("Link")}
              sx={{
                border: "1px solid #4D8733",
                height: "10px",
                p: "2px",
                background: "#fff",
                color: "#4D8733",
                "&:hover": {
                  background: "#4D8733",
                  color: "#fff",
                },

              }}
            >
              <AddIcon sx={{ width: "10px", height: "10px" }} />
            </IconButton>
          </span>
        </Box>



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
          <Tooltip title="Collapse All" arrow>
            <IconButton
              size="small"
              onClick={collapseAllItems}
              sx={{
                boxShadow: 1,
                background: "#fff",

                "&:hover": {
                  boxShadow: 2,
                  background: "#fff",
                },
              }}
            >
              <ArrowDownwardIcon
                sx={{
                  width: "16px",
                  height: "16px",
                  color: "#4d8733",
                  transform: `rotate( ${!collapseAll ? "180deg" : "0deg"} )`,
                  transition: ".3s all",
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset" arrow>
            <IconButton
              size="small"
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
              <RestartAltIcon
                sx={{ color: "#4d8733", width: "16px", height: "16px" }}
              />
            </IconButton>
          </Tooltip>
          {!searchVisible && (
            <Tooltip title="Google Search" arrow>
              <IconButton
                size="small"
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
                  style={{ width: "16px", height: "16px" }}
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
            position: "relative",
            p: "10px 0px",
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
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  window.open(
                    `https://www.google.com/search?q=${e.target.value}`
                  );
                  handleCloseClick();
                }
              }}
              onChange={(e) => {
                setGoogleSearch(e.target.value);
              }}
            />
            <img
              className="gsearchIcon"
              style={{ width: "20px", height: "20px" }}
              src={gImg}
              alt="search"
            />
            <img
              className="closeIcon"
              src={clear}
              alt="close"
              onClick={handleCloseClick}
            />

            {googleSearchSuggestions.length > 0 && (
              <Box
                overflow={"hidden"}
                position={"absolute"}
                sx={{ boxShadow: 1 }}
                bgcolor={"white"}
                width={"100%"}
                top={`calc( 100% + 5px )`}
                zIndex={"99"}
                borderRadius={"20px"}
              >
                {(googleSearchSuggestions || []).map((item) => {
                  return (
                    <MenuItem
                      onClick={() => {
                        window.open(`https://www.google.com/search?q=${item}`);
                        handleCloseClick();
                      }}
                      width={"100%"}
                      padding={"10px 20px"}
                    >
                      {item}
                    </MenuItem>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TabButtons;
