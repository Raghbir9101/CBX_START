import { Box, Modal, Typography, Button, IconButton } from "@mui/material";
import React from "react";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";

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

const AddCollaboratorModal = ({ open, handleClose }) => {
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
              Add Collaborator
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <input
              type="text"
              placeholder="Enter Password"
              className="passwordInput"
            />
          </Box>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ textTransform: "none", color: "#4d8733" }}
              startIcon={
                <LinkOffOutlinedIcon
                  sx={{ width: "18px", height: "18px", color: "#4d8733" }}
                />
              }
            >
              Copy Link
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Button
                onClick={handleClose}
                variant="outlined"
                className="cancelBtn"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="createPageBtn"
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

export default AddCollaboratorModal;
