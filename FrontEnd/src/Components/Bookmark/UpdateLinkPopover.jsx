import React from "react";
import { Popover, Box, Button, Typography, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import closeIcon from "../../Icons/closeModal.svg";

function UpdateLinkPopover({ open, anchorEl, handleClose, item, setLinks }) {
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
    handleClose();
  };

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
          onClick={handleClose}
        />
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          sx: { zIndex: 1100 },
        }}
        sx={{
          p: "20px 25px 25px 25px",
          borderRadius: "18px",

          "& .MuiPaper-root": {
            borderRadius: "18px",
            p: "20px 25px 25px 25px",
            background: "#FFF",
            // boxShadow: "15px 11px 100px 0px rgba(79, 91, 121, 0.25)",
            width: 450,
          },
        }}
      >
        <Box component={"form"} onSubmit={handleSave}>
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
            <IconButton size="small" onClick={handleClose}>
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
      </Popover>
    </>
  );
}

export default UpdateLinkPopover;

// anchorOrigin={{
//   vertical: "bottom",
//   horizontal: "center",
// }}
// transformOrigin={{
//   vertical: "top",
//   horizontal: "center",
// }}
