import React, { useContext, useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { Context } from "../Context/Context";
import DefaultPFP from "../../Icons/Default_pfp.jpg";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { token, loginUser, handleLogout } = useContext(Context);
  const nav = useNavigate();
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="navMainBox">
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ width: "100%" }}
      >
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
              onClick={handleClickMenu}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
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
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          sx={{
            ".MuiPaper-root": {
              borderRadius: "16px",
            },
          }}
        >
          <MenuItem>{loginUser?.userName || ""}</MenuItem>
          <MenuItem>{loginUser?.email || ""}</MenuItem>
          <MenuItem
            onClick={() => {
              handleLogout();
              nav("/login");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default AdminNavbar;
