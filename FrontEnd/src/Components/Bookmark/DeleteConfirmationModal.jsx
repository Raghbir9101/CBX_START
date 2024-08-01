import React from "react";
import { Typography, Modal, Box, Button } from "@mui/material";

const deleteModalStyle = {
  position: "absolute",
  top: "300px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "18px",
  outline: "none",
};

const DeleteConfirmationModal = ({ open, handleDelete, handleClose }) => {
  return (
    <>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-page-modal-title"
        aria-describedby="create-page-modal-description"
      >
        <Box sx={deleteModalStyle}>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: "18px " }}>
              Are you sure you want to delete{" "}
            </Typography>
            <Typography sx={{ fontSize: "18px " }}>this link?</Typography>
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
                onClick={() => handleDelete()}
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

export default DeleteConfirmationModal;
