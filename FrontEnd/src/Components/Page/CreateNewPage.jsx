import React, { useContext, useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
} from "@mui/material";
import { Context } from "../Context/Context";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Page.css";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import AddPasswordModal from "./AddPasswordModal";
import AddCollaboratorModal from "./AddCollaboratorModal";
import toast from "react-hot-toast";

const modalStyle = {
  position: "absolute",
  top: "300px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "18px",
};

const CreatePageModal = ({ open, handleClose, handleCreatePage }) => {
  const { loginUser } = useContext(Context);
  const [formData, setFormData] = useState({
    pageName: "",
    userID: loginUser?._id, // This assumes each user has a unique ID, use your logic here
    visibility: "PRIVATE", // Default visibility
    isPasswordProtected: false,
    password: "",
    collaborators: [],
  });
  const [newCollabEmail, setNewCollabEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [openPasswordModal, setOpenPaswordModal] = useState(false);
  const [openCollaboratorModal, setOpenCollaboratorModal] = useState(false);

  const handleOpenPasswordModal = () => setOpenPaswordModal(true);
  const handleClosePasswordModal = () => setOpenPaswordModal(false);

  const handleOpenCollaboratorModal = () => setOpenCollaboratorModal(true);
  const handleCloseCollaboratorModal = () => setOpenCollaboratorModal(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddCollaborator = () => {
    if (validateEmail(newCollabEmail)) {
      const isDuplicate = formData.collaborators.some(
        (collaborator) => collaborator.email === newCollabEmail
      );
      if (isDuplicate) {
        setEmailError("This email is already added as a collaborator");
      } else {
        setFormData((prevData) => ({
          ...prevData,
          collaborators: [
            ...prevData.collaborators,
            { email: newCollabEmail, role: "VIEWER" },
          ],
        }));
        setNewCollabEmail("");
        setEmailError("");
      }
    } else {
      setEmailError("Invalid email format");
    }
  };

  const handleDeleteCollaborator = (index) => {
    setFormData((prevData) => {
      const newCollaborators = prevData.collaborators.filter(
        (_, i) => i !== index
      );
      return { ...prevData, collaborators: newCollaborators };
    });
  };

  const handleRoleChange = (index, role) => {
    setFormData((prevData) => {
      const newCollaborators = [...prevData.collaborators];
      newCollaborators[index].role = role;
      return { ...prevData, collaborators: newCollaborators };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreatePage(formData);
    toast.success("Page created successfully.");
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-page-modal-title"
        aria-describedby="create-page-modal-description"  sx={{ overflowY: "auto" }}
      >
        <Box sx={modalStyle}>
          <Typography className="createPageHeading">Create a Page</Typography>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => {
                setFormData((p) => {
                  return { ...p, pageName: e.target.value };
                });
              }}
              type="text"
              placeholder="Page Name"
              className="pageNameInput"
            />
            <textarea
              onChange={(e) => {
                setFormData((p) => {
                  return { ...p, description: e.target.value };
                });
              }}
              placeholder="Description"
              className="description"
            />
            <Box>
              <FormControl fullWidth margin="normal">
                <InputLabel id="visibility-label">Visibility</InputLabel>
                <Select
                  labelId="visibility-label"
                  name="visibility"
                  label="Visibility"
                  value={formData.visibility}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="PRIVATE">Private</MenuItem>
                  <MenuItem value="PUBLIC">Public</MenuItem>
                  <MenuItem value="PASSWORD_PROTECTED">
                    Password Protected
                  </MenuItem>
                </Select>
              </FormControl>
              {/* <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name="isPasswordProtected"
                    checked={formData.isPasswordProtected}
                    onChange={handleChange}
                  />
                }
                label="Password Protected"
              /> */}
            </Box>

            {/* Footer */}
            <Box
              mt={3}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <IconButton onClick={handleOpenPasswordModal} disabled={formData.visibility != "PASSWORD_PROTECTED"}>
                  <HttpsOutlinedIcon color="#989696" />
                </IconButton>
                <IconButton onClick={handleOpenCollaboratorModal}>
                  <PersonAddAltOutlinedIcon color="#989696" />
                </IconButton>
              </Box>

              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
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
                    Create page
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Add password modal */}
      {openPasswordModal && (
        <AddPasswordModal
          formData={formData}
          setFormData={setFormData}
          open={openPasswordModal}
          handleClose={handleClosePasswordModal}
        />
      )}
      {/* Add collaborator modal */}
      {openCollaboratorModal && (
        <AddCollaboratorModal
          formData={formData}
          setFormData={setFormData}
          open={openCollaboratorModal}
          handleClose={handleCloseCollaboratorModal}
        />
      )}
    </>
  );
};

export default CreatePageModal;
