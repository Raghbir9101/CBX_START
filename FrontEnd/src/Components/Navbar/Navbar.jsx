import React, { useContext, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../Context/Context";
import CreatePageModal from "../Page/CreateNewPage";
import EditPageModal from "../Page/EditNewPage";
import "./Navbar.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import searchIcon from "../../Icons/search.svg";
import plus from "../../Icons/add.svg";
import pluss from "../../Icons/plusGreen.svg";
import share from "../../Icons/share.svg";
import logo from "../../Icons/cbxLogo.svg";
import AddNewData from "./AddNewData";
import ShowAllPageModal from "../Page/ShowAllPageModal";
import SharePageModal from "./SharePageModal";

const Navbar = () => {
  const nav = useNavigate();
  const { pageID } = useParams();
  const { handleLogout, pages, setPages, token } = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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
    setPages((p) => [...p, res]);
  };

  const handleEditPage = async (pageData) => {
    let { data: res } = await HTTP.put(`pages/${pageID}`, pageData);
    if (res.error) return alert(res.error || "Internal Server Error!");

    setPages((p) => {
      let temp = [...p];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i]._id == pageID) {
          temp[i] = res;
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
      >
        {/* <Box display={"flex"} gap={"10px"}>
          {token && (
            <Sbutton startIcon={<MenuIcon sx={{ color: "black" }} />}>
              <Typography>Pages</Typography>
            </Sbutton>
          )}

          {token &&
            pages.map((item) => {
              return (
                <Sbutton
                  onClick={() => {
                    nav("/page/" + item._id);
                  }}
                >
                  <Typography>{item.pageName || ""}</Typography>
                </Sbutton>
              );
            })}

          {token && (
            <Sbutton title={"Add new Page"} onClick={handleOpenModal}>
              <AddIcon />
            </Sbutton>
          )}
        </Box> */}
        {/* <Box display={"flex"} gap={"10px"}>
          {token && (
            <Sbutton
              onClick={() => {
                handleLogout();
                nav("/login");
              }}
            >
              <Typography>Logout</Typography>
            </Sbutton>
          )}
          {!token && (
            <Sbutton onClick={() => nav("/login")}>
              <Typography>Login</Typography>
            </Sbutton>
          )}
          {token && (
            <Sbutton>
              <Typography>Share</Typography>
            </Sbutton>
          )}
          {token && (
            <Sbutton>
              <AddIcon />
            </Sbutton>
          )}
          {token && (
            <Sbutton onClick={handleEditOpenModal}>
              <SettingsIcon />
            </Sbutton>
          )}
          <Sbutton sx={{ borderRadius: "50%", padding: 0 }}>
            <Box
              borderRadius={"50%"}
              height={"32px"}
              width={"32px"}
              overflow={"hidden"}
            >
              <img
                draggable={false}
                style={{ width: "100%", height: "100%" }}
                src="https://lh3.googleusercontent.com/a/ACg8ocJT0qY5tWE0jbHJMnBF7ZcLWffYEqmfX665vNor9zabZNCUIek=s96-c"
              />
            </Box>
          </Sbutton>
        </Box> */}

        <Box>
          {/* <img src={logo} alt="Logo" loading="lazy" /> */}
          <Typography className="toolName">CBX START</Typography>
        </Box>

        <Box>
          <Button
            // onClick={handleOpenModal}
            onClick={handleOpenAllPagesModal}
            className="pageNameBtn"
            endIcon={<KeyboardArrowDownIcon />}
          >
            Page Start
          </Button>
        </Box>

        {token && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
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
                  <img src={pluss} alt="add" />
                ) : (
                  <img src={plus} alt="add" />
                )
              }
              variant="outlined"
              onClick={handlePopoverOpen}
            >
              Add
            </Button>

            <Box sx={{ cursor: "pointer" }}>
              <img src={searchIcon} alt="search" />
            </Box>

            <Box sx={{ cursor: "pointer" }} onClick={handleOpenShareModal}>
              <img
                style={{ width: "28px", height: "28px" }}
                src={share}
                alt="share"
              />
            </Box>

            <Box onClick={handleClickMenu}>
              <img
                style={{
                  objectFit: "cover",
                  borderRadius: "100%",
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                }}
                src="https://t4.ftcdn.net/jpg/06/43/02/01/240_F_643020191_XOHPJqX5xKqXii8FztvoSIUlaWVtGjbs.jpg"
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
      >
        <MenuItem>Raghbir Singh</MenuItem>
        <MenuItem>raghbir786@gmail.com</MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
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
          open={editModalOpen}
          handleClose={handleEditCloseModal}
          handleEditPage={handleEditPage}
        />
      )}

      {/*Show all pages*/}
      <ShowAllPageModal
        open={isShowModalOpen}
        handleClose={handleCloseAllPagesModal}
        handleOpenModal={handleOpenModal}
        handleEditOpenModal={handleEditOpenModal}
      />

      {/* Add New Data Popover */}
      <AddNewData
        open={isPopoverOpen}
        anchorEl={popoverAnchorEl}
        handlePopoverClose={handlePopoverClose}
      />

      {/* Share Modal */}
      <SharePageModal
        open={isShareModalOpen}
        handleClose={handleCloseShareModal}
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
