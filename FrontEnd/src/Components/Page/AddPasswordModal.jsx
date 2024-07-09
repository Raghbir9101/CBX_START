import { Box, Modal, Typography, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const modalStyle = {
  position: "absolute",
  top: "300px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "18px",
};

const AddPasswordModal = ({ open, handleClose, formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [passwords, setPasswords] = useState({
    pass: formData?.password || "",
    conPass: formData?.password || ""
  })
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowRePassword = () => {
    setShowRePassword(!showRePassword);
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <IconButton sx={{ p: "4px" }}>
              <ChevronLeftOutlinedIcon sx={{ color: "#333333" }} />
            </IconButton>
            <Typography
              sx={{ color: "#333333", fontWeight: 500, fontSize: "24px" }}
            >
              Create Password
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Box sx={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="passwordInput"
                defaultValue={passwords?.pass || ""}
                onChange={(e) => {
                  setPasswords(p => {
                    return { ...p, pass: e.target.value }
                  })
                }}
              />
              <IconButton
                onClick={handleShowPassword}
                sx={{ position: "absolute", right: "10px", mt: "1px" }}
              >
                {showPassword ? (
                  <VisibilityOutlinedIcon
                    sx={{ width: "16px", height: "16px" }}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    sx={{ width: "16px", height: "16px" }}
                  />
                )}
              </IconButton>
            </Box>
            <Box sx={{ mt: 1, position: "relative" }}>
              <input
                type={showRePassword ? "text" : "password"}
                placeholder="Re-enter Password"
                className="passwordInput"
                defaultValue={passwords?.conPass || ""}
                onChange={(e) => {
                  setPasswords(p => {
                    return { ...p, conPass: e.target.value }
                  })
                }}
              />
              <IconButton
                onClick={handleShowRePassword}
                sx={{ position: "absolute", right: "10px", mt: "1px" }}
              >
                {showRePassword ? (
                  <VisibilityOutlinedIcon
                    sx={{ width: "16px", height: "16px" }}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    sx={{ width: "16px", height: "16px" }}
                  />
                )}
              </IconButton>
            </Box>
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: "20px",
                mt: 3,
              }}
            >
              <Button
                onClick={()=>{
                  handleClose()
                }}
                variant="outlined"
                className="cancelBtn"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="createPageBtn"
                onClick={() => {
                  if (passwords.conPass != passwords.pass) return alert("Password and Confirm Password does not match!");
                  setFormData(p => {
                    return { ...p, password: passwords.pass }
                  })
                  handleClose()
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddPasswordModal;
