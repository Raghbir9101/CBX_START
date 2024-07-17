import { Box, Modal, Typography, Button } from "@mui/material";
import React, { useState } from "react";

const modalStyle = {
  position: "absolute",
  top: "300px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "18px",
};

const DeleteConformationModal = ({
  open,
  handleClose,
  handleDeleteUser,
  userId,
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-page-modal-title"
        aria-describedby="create-page-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{ textAlign: "center" }}>
            <Typography>Are you sure you want to delete </Typography>
            <Typography>this user?</Typography>
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "50px",
                mt: 3,
              }}
            >
              <Button
                onClick={handleClose}
                variant="outlined"
                className="cancelBtn"
              >
                No
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="createPageBtn"
                onClick={() => handleDeleteUser(userId)}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteConformationModal;
