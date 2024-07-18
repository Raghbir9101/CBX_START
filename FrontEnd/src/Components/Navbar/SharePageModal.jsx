import { Box, Modal, Typography, Button, MenuItem, Menu } from "@mui/material";
import React, { useContext, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SecurityIcon from "@mui/icons-material/Security";
import PublicIcon from "@mui/icons-material/Public";
import { Context } from "../Context/Context";
import HTTP from "../../HTTP";
import toast from "react-hot-toast";

const modalStyle = {
  position: "absolute",
  top: "300px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 520,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "18px",
};

const SharePageModal = ({
  open,
  handleClose,
  pageMetaData,
  setPageMetaData,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [role, setRole] = useState("Viewer");
  const { setPages } = useContext(Context);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (selectedRole) => {
    setAnchorEl(null);
    if (selectedRole) {
      setRole(selectedRole);
    }
  };

  const handleVisibilityChange = async (val) => {
    if (pageMetaData.role != "OWNER" && pageMetaData.role != "EDITOR")
      return toast.error("You don't have rights to edit.");
    let { data: res } = await HTTP.put(`pages/${pageMetaData._id}`, {
      visibility: val,
    });
    if (res.error) return toast.error(res.error || "Internal Server Error!");
    setPages((p) => {
      let temp = [...p];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i]._id == pageMetaData._id) {
          temp[i] = { ...temp[i], ...res };
          setPageMetaData((p) => {
            return { ...temp[i], ...res };
          });
          return temp;
        }
      }
      return temp;
    });
    toast.success("Visibility changed successfully.");
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-page-modal-title"
        aria-describedby="create-page-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{
              color: "#333333",
              fontWeight: 500,
              fontSize: "24px",
              textAlign: "center",
            }}
          >
            Share page
          </Typography>

          {/* <Box sx={{ mt: 2, mb: 2, position: "relative" }}>
            <input
              type="email"
              placeholder="Search or invite people by e-mail"
              className="passwordInput"
            />
            <Button
              sx={{ position: "absolute", right: 0, top: "1px", p: "5px 20px" }}
              type="submit"
              variant="contained"
              className="createPageBtn"
            >
              Invite
            </Button>
          </Box> */}
          <Box sx={{ mt: 2, mb: 2, position: "relative" }}>
            <input
              type="email"
              placeholder="Search or invite people by e-mail"
              className="passwordInput"
              value={window.location.href}
            />
            <Button
              sx={{
                position: "absolute",
                right: 0,
                p: "5px 20px",
                height: "100%",
              }}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Copied");
              }}
              type="submit"
              variant="contained"
              className="createPageBtn"
            >
              Copy
            </Button>
          </Box>

          <Box
            sx={{
              padding: "10px 0px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              onClick={() => handleVisibilityChange("PRIVATE")}
              sx={{ cursor: "pointer" }}
              display={"flex"}
              alignItems={"center"}
              gap={"10px"}
              bgcolor={
                pageMetaData?.visibility == "PRIVATE" ? "#d1ffbc" : "#f4f4f4"
              }
              p={"5px 10px"}
              borderRadius={"10px"}
            >
              <SecurityIcon />
              <Box>
                <Typography>Private Page</Typography>
                <Typography fontSize={"12px"} color={"gray"}>
                  Only Collaborators and owner can access the page.
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => handleVisibilityChange("PUBLIC")}
              sx={{ cursor: "pointer" }}
              display={"flex"}
              alignItems={"center"}
              gap={"10px"}
              bgcolor={
                pageMetaData?.visibility == "PUBLIC" ? "#d1ffbc" : "#f4f4f4"
              }
              p={"5px 10px"}
              borderRadius={"10px"}
            >
              <PublicIcon />
              <Box>
                <Typography>Public Page</Typography>
                <Typography fontSize={"12px"} color={"gray"}>
                  Anyone with the link can view the page.
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => handleVisibilityChange("PASSWORD_PROTECTED")}
              sx={{ cursor: "pointer" }}
              display={"flex"}
              alignItems={"center"}
              gap={"10px"}
              bgcolor={
                pageMetaData?.visibility == "PASSWORD_PROTECTED"
                  ? "#d1ffbc"
                  : "#f4f4f4"
              }
              p={"5px 10px"}
              borderRadius={"10px"}
            >
              <PublicIcon />
              <Box>
                <Typography>Password Protected Page</Typography>
                <Typography fontSize={"12px"} color={"gray"}>
                  Anyone with the link and password can view the page.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
                src="https://t4.ftcdn.net/jpg/06/43/02/01/240_F_643020191_XOHPJqX5xKqXii8FztvoSIUlaWVtGjbs.jpg"
                alt=""
              />
              <Typography>Raghbir (You)</Typography>
            </Box>
            <Button sx={{ textTransform: "none" }}>Owner</Button>
          </Box> */}

          {/* When accepted */}
          {/* <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
                src="https://t4.ftcdn.net/jpg/06/43/02/01/240_F_643020191_XOHPJqX5xKqXii8FztvoSIUlaWVtGjbs.jpg"
                alt=""
              />
              <Box>
                <Typography sx={{ color: "#333333", fontWeight: 500 }}>
                  Starlight
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                  fendardis@gmail.com
                </Typography>
              </Box>
            </Box>
            <Button sx={{ textTransform: "none" }}>Viewer</Button>
          </Box> */}

          {/* <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 550 }}>
                fendardis@gmail.com
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                Invitation sent - not yet accepted |{" "}
                <span style={{ color: "#4D8733", fontWeight: 500 }}>
                  Resend
                </span>
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{ textTransform: "none" }}
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClick}
              >
                {role}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleCloseMenu()}
                sx={{
                  ".MuiPaper-root": {
                    borderRadius: "16px",
                  },
                }}
              >
                <MenuItem onClick={() => handleCloseMenu("Viewer")}>
                  Viewer
                </MenuItem>
                <MenuItem onClick={() => handleCloseMenu("Editor")}>
                  Make Editor
                </MenuItem>
                <MenuItem value="" sx={{ color: "#FD6D6D" }}>
                  Remove Invitation
                </MenuItem>
              </Menu>{" "}
            </Box>
          </Box> */}
        </Box>
      </Modal>
    </>
  );
};

export default SharePageModal;
