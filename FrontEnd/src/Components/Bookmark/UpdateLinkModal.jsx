import React from "react";
import { Typography, Modal, Box, Button, IconButton } from "@mui/material";
import closeIcon from "../../Icons/closeModal.svg";
import toast from "react-hot-toast";

const editModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "20px 25px 25px 25px",
  borderRadius: "18px",
  outline: "none",
};

const UpdateLinkModal = ({
  openEditModal,
  handleCloseEditModal,
  item,
  setLinks,
}) => {
  const handleSave = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const temp = {
      ...item,
      name: formData.get("name"),
      link: formData.get("link"),
    };

    setLinks((p) => {
      let previousLink = [...p];
      for (let i = 0; i < previousLink.length; i++) {
        if (previousLink[i]._id === item._id) {
          previousLink[i] = temp;
          return previousLink;
        }
      }
    });
    toast.success("Link updated.");
    handleCloseEditModal();
  };

  return (
    <>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="create-page-modal-title"
        aria-describedby="create-page-modal-description"
      >
        <Box sx={editModalStyle} component={"form"} onSubmit={handleSave}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "20px", color: "#333", fontWeight: 600 }}
            >
              Edit Bookmark
            </Typography>
            <IconButton size="small" onClick={handleCloseEditModal}>
              <img src={closeIcon} alt="Close" />
            </IconButton>
          </Box>

          <Box sx={{ mt: "20px" }}>
            <Typography sx={{ color: "#9E9292", fontWeight: 400 }}>
              Title
            </Typography>
            <input
              type="text"
              placeholder="Title Name"
              className="editLinkInput"
              defaultValue={item.name}
              name="name"
            />
          </Box>
          <Box sx={{ mt: "20px" }}>
            <Typography sx={{ color: "#9E9292", fontWeight: 400 }}>
              URL
            </Typography>
            <input
              type="url"
              placeholder="https://uidesigns.com"
              className="editLinkInput"
              defaultValue={item.link}
              name="link"
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "end", mt: "20px" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "11.204px",
                background: "#4D8733",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 700,
                width: "84px",
                height: "38px",
                "&:hover": {
                  background: "#4D8733",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateLinkModal;
