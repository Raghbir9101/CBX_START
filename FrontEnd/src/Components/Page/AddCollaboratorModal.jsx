
import {
  Box,
  Modal,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

const AddCollaboratorModal = ({ open, handleClose, formData, setFormData }) => {
  const [collaborators, setCollaborators] = useState(
    formData.collaborators || []
  );
  const [newCollaborator, setNewCollaborator] = useState("");
  const [anchorEls, setAnchorEls] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddCollaborator = () => {
    if (validateEmail(newCollaborator)) {
      const isDuplicate = formData.collaborators.some(
        (collaborator) => collaborator.email === newCollaborator
      );
      if (isDuplicate) {
        setEmailError("This email is already added as a collaborator");
      } else {
        setCollaborators((prev) => [
          ...prev,
          { email: newCollaborator, role: "Viewer" },
        ]);
        setNewCollaborator("");
      }
    }
  };

  const handleDeleteCollaborator = (index) => {
    setCollaborators((prevData) => {
      const newCollaborators = prevData.filter((_, i) => i !== index);
      return newCollaborators;
    });
  };

  const handleRoleChange = (index, role) => {
    setCollaborators((prevData) => {
      const newCollaborators = [...prevData];
      newCollaborators[index].role = role;
      return newCollaborators;
    });
  };

  const handleClick = (index, event) => {
    setAnchorEls({ ...anchorEls, [index]: event.currentTarget });
  };

  const handleCloseMenu = (index, role) => {
    if (role) {
      handleRoleChange(index, role);
    }
    setAnchorEls({ ...anchorEls, [index]: null });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-page-modal-title"
      aria-describedby="create-page-modal-description"
      sx={{ overflowY: "auto" }}
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <IconButton sx={{ p: "4px" }}>
            <ChevronLeftOutlinedIcon sx={{ color: "#333333" }} />
          </IconButton>
          <Typography
            sx={{ color: "#333333", fontWeight: 500, fontSize: "24px" }}
          >
            Add Collaborator
          </Typography>
        </Box>
        <Box sx={{ mt: 2, display: "flex" }}>
          <input
            onChange={(e) => setNewCollaborator(e.target.value)}
            value={newCollaborator}
            type="email"
            placeholder="Enter E-mail Address"
            className="passwordInput"
          />
          <Button
            sx={{
              textTransform: "none",
              background: "#4D8733",
              ml: 1,
              "&:hover": {
                background: "#4D8733",
              },
            }}
            variant="contained"
            onClick={handleAddCollaborator}
          >
            Add
          </Button>
        </Box>

        {collaborators.map((collaborator, index) => (
          <Box display="flex" gap="10px" alignItems="center" mt={2} key={index}>
            <Typography flex={2}>{collaborator.email}</Typography>
            <Box flex={1}>
              <Button
                sx={{ textTransform: "none", color: "#4D8733" }}
                endIcon={<KeyboardArrowDownIcon />}
                onClick={(e) => handleClick(index, e)}
              >
                {collaborator.role}
              </Button>
              <Menu
                anchorEl={anchorEls[index]}
                open={Boolean(anchorEls[index])}
                onClose={() => handleCloseMenu(index)}
                // sx={{
                //   ".MuiPaper-root": {
                //     borderRadius: "16px",
                //   },
                // }}
              >
                <MenuItem onClick={() => handleCloseMenu(index, "Viewer")}>
                  Viewer
                </MenuItem>
                <MenuItem onClick={() => handleCloseMenu(index, "Editor")}>
                  Editor
                </MenuItem>
              </Menu>
            </Box>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => handleDeleteCollaborator(index)}
              >
                <DeleteOutlineIcon
                  sx={{ width: "20px", height: "20px", color: "#4D8733" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        ))}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
              onClick={() => {
                setFormData((p) => {
                  return { ...p, collaborators };
                });
                handleClose();
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCollaboratorModal;
