import React, { useContext, useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
} from "@mui/material";
import { Context } from "../Context/Context";
import { useParams } from "react-router-dom";
import Delete from "@mui/icons-material/Delete";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import AddPasswordModal from "./AddPasswordModal";
import AddCollaboratorModal from "./AddCollaboratorModal";
import toast from "react-hot-toast";

const modalStyle = {
  minWidth: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "fit-content",
  p: 4,
  borderRadius: "18px",
};

function findByID(arr = [], id) {
  for (let i of arr) {
    if (i._id == id) {
      return i;
    }
  }
  return null;
}

const EditPageModal = ({
  open,
  handleClose,
  handleEditPage,
  selectedPage,
  setSelectedPage,
}) => {
  const { pageID } = useParams();
  const { loginUser, pages } = useContext(Context);
  const [formData, setFormData] = useState(selectedPage);
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
    handleEditPage(formData);
    toast.success("Update successfully.");
    handleClose();
    setSelectedPage(null);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-page-modal-title"
        aria-describedby="create-page-modal-description" sx={{ overflowY: "auto", padding: "20px", display: "flex", justifyContent: "center" }}
      >
        <Box sx={modalStyle}>
          <Typography className="createPageHeading">Edit Page</Typography>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Page Name"
              className="pageNameInput"
              name="pageName"
              defaultValue={selectedPage?.pageName || ""}
              onChange={(e) => {
                setFormData((p) => {
                  return { ...p, pageName: e.target.value };
                });
              }}
            />
            <textarea
              onChange={(e) => {
                setFormData((p) => {
                  return { ...p, description: e.target.value };
                });
              }}
              defaultValue={selectedPage?.description || ""}
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
                <IconButton
                  disabled={formData.visibility != "PASSWORD_PROTECTED"}
                  onClick={handleOpenPasswordModal}
                >
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
                    onClick={() => {
                      handleClose();
                      setSelectedPage(null);
                    }}
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

export default EditPageModal;
