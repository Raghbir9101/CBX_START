import { Box, Modal, Typography, Button, IconButton, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import React, { useState } from "react";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import Delete from "@mui/icons-material/Delete";

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
  const [collaborators, setCollaborators] = useState(formData.collaborators || [])
  const [newCollaborator, setNewCollaborator] = useState("");

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
        setCollaborators(p => {
          return [...p, { email: newCollaborator, role: "VIEWER" }]
        })
        // setFormData((prevData) => ({
        //   ...prevData,
        //   collaborators: [
        //     ...prevData.collaborators,
        //     { email: newCollaborator, role: "VIEWER" },
        //   ],
        // }));
        // setFormData((prevData) => ({
        //   ...prevData,
        //   collaborators: [
        //     ...prevData.collaborators,
        //     { email: newCollaborator, role: "VIEWER" },
        //   ],
        // }));
        // setNewCollabEmail("");
        // setEmailError("");
      }
      setNewCollaborator("")
    } else {
      // setEmailError("Invalid email format");
    }
  };

  const handleDeleteCollaborator = (index) => {
    setCollaborators((prevData) => {
      const newCollaborators = prevData.filter(
        (_, i) => i !== index
      );
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
          <Box sx={{ mt: 2, display: "flex" }}>
            {/* <Typography sx={{ color: "#9A9898", fontSize: "14px", mb: 1 }}>
              Invite by e-mail
            </Typography> */}
            <input
              onChange={(e) => {
                setNewCollaborator(e.target.value)
              }}
              value={newCollaborator}
              type="email"
              placeholder="Enter E-mail Address"
              className="passwordInput"
            />
            <Button onClick={handleAddCollaborator}>Add</Button>
          </Box>

          {/* <Box sx={{ mt: 2 }}></Box> */}
          {collaborators.map((collaborator, index) => (
            <Box
              display="flex"
              gap="10px"
              alignItems="center"
              mt={2}
              key={index}
            >
              <Typography flex={2}>{collaborator.email}</Typography>
              <FormControl sx={{ flex: 1 }} margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  labelId={`role-label-${index}`}
                  value={collaborator.role}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                  size="small"
                  label="Role"
                >
                  <MenuItem value="VIEWER">Viewer</MenuItem>
                  <MenuItem value="EDITOR">Editor</MenuItem>
                </Select>
              </FormControl>
              <IconButton onClick={() => handleDeleteCollaborator(index)}>
                <Delete />
              </IconButton>
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
            {/* <Button
              sx={{ textTransform: "none", color: "#4d8733" }}
              startIcon={
                <LinkOffOutlinedIcon
                  sx={{ width: "18px", height: "18px", color: "#4d8733" }}
                />
              }
            >
              Copy Link
            </Button> */}
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
                onClick={() => {
                  setFormData(p => {
                    return { ...p, collaborators }
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

export default AddCollaboratorModal;
