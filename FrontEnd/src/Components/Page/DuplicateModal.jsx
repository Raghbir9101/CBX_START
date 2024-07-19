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

const DuplicateModal = ({
  open,
  handleClose,
  selectedPage,
  setSelectedPage,
}) => {
  const nav = useNavigate();
  const { pages, setPages } = useContext(Context);
  const { pageID } = useParams();
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
            <Typography>Are you sure you want to create a duplicate of </Typography>
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
                  let tempSelectedPage = { ...selectedPage };
                  delete tempSelectedPage._id
                  let { data: newPage } = await HTTP.post(`pages`, tempSelectedPage);
                  setPages((p) => {
                    return [...p, { ...newPage, role: "OWNER" }]
                  });
                  if (pageID == selectedPage?._id) {
                    nav(`/page/${newPage?._id}`);
                  }
                  toast.success("Page created successfully.");
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

export default DuplicateModal;
