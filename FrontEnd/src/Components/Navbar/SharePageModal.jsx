import { Box, Modal, Typography, Button, MenuItem, Menu } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

const SharePageModal = ({ open, handleClose }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [role, setRole] = useState("Viewer");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (selectedRole) => {
    setAnchorEl(null);
    if (selectedRole) {
      setRole(selectedRole);
    }
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

          <Box sx={{ mt: 2, mb: 2, position: "relative" }}>
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
          </Box>

          <Box
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
          </Box>

          {/* When accepted */}
          <Box
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
          </Box>

          <Box
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
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SharePageModal;
