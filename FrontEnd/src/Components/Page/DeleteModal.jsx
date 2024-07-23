import { Box, Modal, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import HTTP from "../../HTTP";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { Context } from "../Context/Context";
import toast from "react-hot-toast";

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

const DeleteModal = ({
  open,
  handleClose,
  selectedPage,
  setSelectedPage,
  setPages,
}) => {
  const nav = useNavigate();
  const { pages } = useContext(Context);
  const { pageID } = useParams();
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-page-modal-title"
        aria-describedby="create-page-modal-description"  sx={{ overflowY: "auto" }}
      >
        <Box sx={modalStyle}>
          <Box sx={{ textAlign: "center" }}>
            <Typography>Are you sure you want to delete </Typography>
            <Typography>this page?</Typography>
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
                onClick={async () => {
                  await HTTP.delete(`pages/${selectedPage?._id}`);
                  setPages((p) => {
                    return p.filter((item) => {
                      return item._id != selectedPage?._id;
                    });
                  });
                  if (pageID == selectedPage?._id) {
                    nav(`/page/${pages[0]?._id}`);
                  }
                  toast.success("Page deleted successfully.");
                  handleClose();
                }}
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

export default DeleteModal;
