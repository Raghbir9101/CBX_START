import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  Typography,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import DefaultPFP from "../../Icons/Default_pfp.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../Context/Context";
import CreatePageModal from "../Page/CreateNewPage";
import EditPageModal from "../Page/EditNewPage";
import "./Navbar.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import searchIcon from "../../Icons/search.svg";
import plus from "../../Icons/add.svg";
import pluss from "../../Icons/plusGreen.svg";
import share from "../../Icons/share.svg";
import logo from "../../Icons/logooo.svg";
import searchIcons from "../../Icons/searchIcon.svg";
import AddNewData from "./AddNewData";
import ShowAllPageModal from "../Page/ShowAllPageModal";
import SharePageModal from "./SharePageModal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HTTP from "../../HTTP";
import toast from "react-hot-toast";

const Navbar = ({
  setPageData,
  pageMetaData,
  setPageMetaData,
  search,
  setSearch,
}) => {
  const nav = useNavigate();
  const { pageID } = useParams();
  const { handleLogout, pages, setPages, token, loginUser } =
    useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const searchInputRef = useRef(null);
  const [selectedPage, setSelectedPage] = useState(null);

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

  const handleOpenAllPagesModal = () => setIsShowModalOpen(true);
  const handleCloseAllPagesModal = () => setIsShowModalOpen(false);
  const handleOpenModal = () => {
    setIsShowModalOpen(false);
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);
  const handleEditOpenModal = () => setEditModalOpen(true);
  const handleEditCloseModal = () => setEditModalOpen(false);
  const handleOpenShareModal = () => setIsShareModalOpen(true);
  const handleCloseShareModal = () => setIsShareModalOpen(false);

  const handleCreatePage = async (pageData) => {
    let { data: res } = await HTTP.post(`addNewPage`, pageData);
    if (res.error) return alert(res.error || "Internal Server Error!");
    setPages((p) => [...p, { ...res, role: "OWNER" }]);
  };

  const handleEditPage = async (pageData) => {
    // console.log(pageData)
    let { data: res } = await HTTP.put(`pages/${pageData._id}`, pageData);
    if (res.error) return alert(res.error || "Internal Server Error!");

    setPages((p) => {
      let temp = [...p];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i]._id == pageData._id) {
          temp[i] = { ...temp[i], ...res };
          setPageMetaData((p) => {
            return { ...temp[i], ...res };
          });
          return temp;
        }
      }
      return temp;
    });
  };

  // Menu
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Popover
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    if (popoverAnchorEl) {
      setPopoverAnchorEl(null);
    } else {
      setPopoverAnchorEl(event.currentTarget);
    }
  };
  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };
  const isPopoverOpen = Boolean(popoverAnchorEl);
  return (
    <Box className="navMainBox">
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ width: "100%" }}
      >
        {searchVisible && (
          <Box
            className={`pageInputBox ${searchVisible ? "visible" : ""}`}
            ref={searchInputRef}
          >
            <input
              className="pageSearchInput"
              type="text"
              placeholder="Seach on your page"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <img className="pSearchIcon" src={searchIcons} alt="search" />

            <CloseOutlinedIcon
              className="pCloseIcon"
              onClick={() => {
                setSearchVisible(false);
                setSearch("");
              }}
              sx={{ width: "16px", height: "16px" }}
            />
          </Box>
        )}

        <Box width={"33%"}>
          <div className="group">
            <img
              className="image"
              alt="Image"
              src="https://c.animaapp.com/YKPFj7gL/img/image-8@2x.png"
            />
          </div>
        </Box>

        {token && (
          <Box width={"33%"} display={"flex"} justifyContent={"center"}>
            <Button
              onClick={handleOpenAllPagesModal}
              className="pageNameBtn"
              endIcon={<KeyboardArrowDownIcon />}
            >
              {pageMetaData?.pageName || ""}
            </Button>
          </Box>
        )}

        {token && (
          <Box
            width={"33%"}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                className="addBtn"
                sx={{
                  color: popoverAnchorEl
                    ? "#4D8733 !important"
                    : "#fff !important",
                  background: popoverAnchorEl ? "#fff" : "",
                  "&:hover": {
                    background: popoverAnchorEl ? "none" : "none",
                    color: "inherit",
                  },
                }}
                startIcon={
                  popoverAnchorEl ? (
                    <img
                      src={pluss}
                      alt="add"
                      style={{ width: "14px", height: "14px" }}
                    />
                  ) : (
                    <img
                      src={plus}
                      alt="add"
                      style={{ width: "14px", height: "14px" }}
                    />
                  )
                }
                variant="outlined"
                onClick={handlePopoverOpen}
              >
                Add
              </Button>
            </Box>

            <Box
              onClick={() => setSearchVisible(!searchVisible)}
              sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: "20px", height: "20px" }}
                src={searchIcon}
                alt="search"
              />
            </Box>

            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              onClick={handleOpenShareModal}
            >
              <img
                style={{ width: "22px", height: "22px" }}
                src={share}
                alt="share"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              onClick={handleClickMenu}
            >
              <img
                style={{
                  objectFit: "cover",
                  borderRadius: "100%",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                }}
                src={loginUser?.photo || ""}
                onError={(e) => (e.target.src = DefaultPFP)}
                alt="profile"
              />
            </Box>
          </Box>
        )}
      </Box>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "16px",
            mt: "10px",
          },
        }}
      >
        <MenuItem>{loginUser?.userName || ""}</MenuItem>
        <MenuItem>{loginUser?.email || ""}</MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
            toast.success("Logout successfully.");
            nav("/login");
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      {/* Create Page Modal */}
      {modalOpen && (
        <CreatePageModal
          open={modalOpen}
          handleClose={handleCloseModal}
          handleCreatePage={handleCreatePage}
        />
      )}

      {/* Edit Page Modal */}
      {editModalOpen && (
        <EditPageModal
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          open={editModalOpen}
          handleClose={handleEditCloseModal}
          handleEditPage={handleEditPage}
        />
      )}

      {/*Show all pages*/}
      <ShowAllPageModal
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        open={isShowModalOpen}
        handleClose={handleCloseAllPagesModal}
        handleOpenModal={handleOpenModal}
        handleEditOpenModal={handleEditOpenModal}
        pageMetaData={pageMetaData}
      />

      {/* Add New Data Popover */}
      <AddNewData
        setPageData={setPageData}
        open={isPopoverOpen}
        anchorEl={popoverAnchorEl}
        handlePopoverClose={handlePopoverClose}
      />

      {/* Share Modal */}
      <SharePageModal
        setPageMetaData={setPageMetaData}
        open={isShareModalOpen}
        handleClose={handleCloseShareModal}
        pageMetaData={pageMetaData}
      />
    </Box>
  );
};

function Sbutton({ children, sx, ...props }) {
  return (
    <Button
      className="SButton"
      size="small"
      {...props}
      sx={{ textTransform: "none", minWidth: 0, ...sx }}
    >
      {children}
    </Button>
  );
}

export default Navbar;
