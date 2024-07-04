

import React, { useContext, useState } from 'react';
import { Modal, Box, Button, TextField, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl, Typography, IconButton } from '@mui/material';
import { Context } from '../Context/Context';
import DeleteIcon from '@mui/icons-material/Delete';

const modalStyle = {
    position: 'absolute',
    top: '300px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll'
};

const CreatePageModal = ({ open, handleClose, handleCreatePage }) => {
    const { loginUser } = useContext(Context);
    const [formData, setFormData] = useState({
        pageName: '',
        userID: loginUser?._id, // This assumes each user has a unique ID, use your logic here
        visibility: 'PRIVATE', // Default visibility
        isPasswordProtected: false,
        password: '',
        collaborators: [],
    });
    const [newCollabEmail, setNewCollabEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAddCollaborator = () => {
        if (validateEmail(newCollabEmail)) {
            const isDuplicate = formData.collaborators.some(collaborator => collaborator.email === newCollabEmail);
            if (isDuplicate) {
                setEmailError("This email is already added as a collaborator");
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    collaborators: [...prevData.collaborators, { email: newCollabEmail, role: 'VIEWER' }],
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
            const newCollaborators = prevData.collaborators.filter((_, i) => i !== index);
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
        handleClose();
    };

    return (
        <Modal
            sx={{ overflowY: 'scroll' }}
            open={open}
            onClose={handleClose}
            aria-labelledby="create-page-modal-title"
            aria-describedby="create-page-modal-description"
        >
            <Box sx={modalStyle}>
                <h2 id="create-page-modal-title">Create Page</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Page Name"
                        name="pageName"
                        value={formData.pageName}
                        onChange={handleChange}
                        fullWidth
                        size='small'
                        margin="normal"
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="visibility-label">Visibility</InputLabel>
                        <Select
                            labelId="visibility-label"
                            name="visibility"
                            label="Visibility"
                            value={formData.visibility}
                            onChange={handleChange}
                            fullWidth
                            size='small'
                        >
                            <MenuItem value="PRIVATE">Private</MenuItem>
                            <MenuItem value="PUBLIC">Public</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isPasswordProtected"
                                checked={formData.isPasswordProtected}
                                onChange={handleChange}
                            />
                        }
                        label="Password Protected"
                    />
                    {formData.isPasswordProtected && (
                        <TextField
                            size='small'
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    )}
                    <Box display="flex" alignItems="center" gap="10px" mt={2}>
                        <TextField
                            type="email"
                            sx={{ flex: 1 }}
                            onChange={(e) => setNewCollabEmail(e.target.value)}
                            size='small'
                            label="Add new Collaborator"
                            // placeholder="Collaborators"
                            value={newCollabEmail}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <Button onClick={handleAddCollaborator} variant="contained">Add</Button>
                    </Box>
                    {formData.collaborators.map((collaborator, index) => (
                        <Box display="flex" gap="10px" alignItems="center" mt={2} key={index}>
                            <Typography flex={2}>
                                {collaborator.email}
                            </Typography>
                            <FormControl sx={{ flex: 1 }} margin="normal">
                                <InputLabel>Role</InputLabel>
                                <Select
                                    labelId={`role-label-${index}`}
                                    value={collaborator.role}
                                    onChange={(e) => handleRoleChange(index, e.target.value)}
                                    size='small'
                                    label="Role"
                                >
                                    <MenuItem value="VIEWER">Viewer</MenuItem>
                                    <MenuItem value="EDITOR">Editor</MenuItem>
                                </Select>
                            </FormControl>
                            <IconButton onClick={() => handleDeleteCollaborator(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Create
                        </Button>
                        <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ ml: 2 }}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default CreatePageModal;
