import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  TablePagination,
  IconButton,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import HTTP from "../../HTTP";
import { Context } from "../Context/Context";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./AdminPanel.css";
import AdminNavbar from "./AdminNavbar";
import AdminDashboardTabs from "./AdminDashboardTabs";
import DeleteConformationModal from "./DeleteConformationModal";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

const styles = {
  tableContainer: {
    marginTop: "20px",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    fontSize: "15px",
    padding: "12px 12px 12px 0px",
  },
  approveCheckbox: {
    color: "#4D8733",
  },
  adminCheckbox: {
    color: "blue",
    // color: "green",
  },
  avatar: {
    width: 35,
    height: 35,
  },
  evenRow: {
    backgroundColor: "#ffffff",
  },
  oddRow: {
    // backgroundColor: "#ddf0d5",
    // backgroundColor: "#d1ffbc",
    backgroundColor: "#f7fcf5",
  },
  hoverEffect: {
    "&:hover": {
      // backgroundColor: "#f7fcf5",
      backgroundColor: "#f2ffed",
      transition: "backgroundColor 0.3s ease",
    },
  },
};

function AdminPanel() {
  const { token, loginUser } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [open, setOpen] = useState(false);
  const [userUniqueId, setUserUniqueId] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [emailSearchTerm, setEmailSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  console.log("users", users);

  const handleOpenModal = (id) => {
    setUserUniqueId(id);
    setOpen(!open);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleApprovalChange = async (event, userId) => {
    await HTTP.patch(`updateUsersAdmin/${userId}`, {
      isApproved: event.target.checked,
    });
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, isApproved: event.target.checked } : user
    );
    setUsers(updatedUsers);
  };

  const handleAdminChange = async (event, userId) => {
    await HTTP.patch(`updateUsersAdmin/${userId}`, {
      isAdmin: event.target.checked,
    });
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, isAdmin: event.target.checked } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = async (userId) => {
    await HTTP.delete(`deleteUsersAdmin/${userId}`);
    const updatedUsers = users?.filter((user) => user._id !== userId);
    handleCloseModal();
    setUserUniqueId("");
    setUsers(updatedUsers);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (!token || loginUser?.isAdmin == false) {
      return;
    }
    HTTP.get(`getUsersAdmin`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  // Filters
  const handleResetFilter = () => {
    setNameSearchTerm("");
    setEmailSearchTerm("");
    setSelectedStatus("");
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.userName.toLowerCase().includes(nameSearchTerm.toLowerCase()) &&
      user.email.toLowerCase().includes(emailSearchTerm.toLowerCase()) &&
      (selectedStatus === "" ||
        (selectedStatus === "approved" && user.isApproved) ||
        (selectedStatus === "notapproved" && !user.isApproved))
    );
  });

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <AdminNavbar />
      <Box width={"90%"} m={"auto"} pt={"20px"}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <TextField
            className="filterSearchInput"
            label="Search by Name"
            id="outlined-search"
            type="search"
            fullWidth
            margin="normal"
            size="small"
            value={nameSearchTerm}
            onChange={(e) => {
              setNameSearchTerm(e.target.value);
              setPage(0);
            }}
            sx={{
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "green",
                },
                "&:hover fieldset": {
                  borderColor: "#B4D33B",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4D8733",
                },
              },
            }}
            InputLabelProps={{
              style: {
                textTransform: "none",
                color: "#4D8733",
              },
            }}
          />

          <TextField
            className="filterSearchInput"
            label="Search by Email"
            id="outlined-search"
            type="search"
            fullWidth
            margin="normal"
            size="small"
            value={emailSearchTerm}
            onChange={(e) => {
              setEmailSearchTerm(e.target.value);
              setPage(0);
            }}
            sx={{
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "green",
                },
                "&:hover fieldset": {
                  borderColor: "#B4D33B",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4D8733",
                },
              },
            }}
            InputLabelProps={{
              style: {
                textTransform: "none",
                color: "#4D8733",
              },
            }}
          />

          <FormControl
            size="small"
            sx={{
              width: "200px",
              mt: "7px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "green",
                },
                "&:hover fieldset": {
                  borderColor: "#B4D33B",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4D8733",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#4D8733",
                "&.Mui-focused": {
                  color: "#4D8733",
                },
              },
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                textTransform: "none",
                color: "#4D8733",
              }}
            >
              Status
            </InputLabel>
            <Select
              id="demo-simple-select"
              value={selectedStatus}
              label="Status"
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(0);
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="notapproved">Not Approved</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Tooltip title="Reset" arrow placement="right">
              <Button
                startIcon={<RestartAltOutlinedIcon />}
                onClick={handleResetFilter}
                variant="contained"
                sx={{
                  background: "#4D8733",
                  textTransform: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: "7px",
                  "&:hover": {
                    background: "#4D8733",
                  },
                }}
              >
                Reset
              </Button>
            </Tooltip>
          </Box>
        </Box>
        <AdminDashboardTabs />
        {/* Dashboard table */}
        <TableContainer
          component={Paper}
          sx={{ boxShadow: 1 }}
          style={styles.tableContainer}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  // background: "#d1ffbc"
                  // background: "#f7fcf5",
                  background: "#f2ffed",
                }}
              >
                <TableCell
                  style={styles.tableHeaderCell}
                  sx={{ textAlign: "center" }}
                >
                  Image
                </TableCell>
                <TableCell
                  style={styles.tableHeaderCell}
                  sx={{ textAlign: "left", pl: 0 }}
                >
                  User Name
                </TableCell>
                <TableCell
                  style={styles.tableHeaderCell}
                  sx={{ textAlign: "left", pl: 0 }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={styles.tableHeaderCell}
                  sx={{ textAlign: "center" }}
                >
                  Approved
                </TableCell>
                <TableCell
                  style={styles.tableHeaderCell}
                  sx={{ textAlign: "center" }}
                >
                  Role
                </TableCell>
                <TableCell
                  style={styles.tableHeaderCell}
                  sx={{ textAlign: "center" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredUsers.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredUsers
              ).map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    ...styles.hoverEffect,
                    ...(index % 2 === 0 ? styles.evenRow : styles.oddRow),
                  }}
                >
                  <TableCell
                    className="tableCell"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <Avatar
                        alt={user.userName}
                        src={user.photo}
                        style={styles.avatar}
                      />
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "left", pl: 0 }}
                    className="tableCell"
                  >
                    {user.userName}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "left", pl: 0 }}
                    className="tableCell"
                  >
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }} className="tableCell">
                    <Checkbox
                      size="small"
                      defaultChecked={user.isApproved}
                      onChange={(event) =>
                        handleApprovalChange(event, user._id)
                      }
                      style={styles.approveCheckbox}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }} className="tableCell">
                    <Tooltip title="Update user role" arrow placement="right">
                      <Select
                        sx={{
                          border: "none",
                          fontSize: "12px",
                          fontSize: "500",
                          ".MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          ".MuiSelect-select": {
                            padding: "8px",
                          },
                        }}
                        size="small"
                        value={user.isAdmin ? "true" : "false"}
                        onChange={(event) => {
                          let val = event.target.value == "true" ? true : false;
                          handleAdminChange(
                            { target: { checked: val } },
                            user._id
                          );
                        }}
                      >
                        <MenuItem value={"false"}>User</MenuItem>
                        <MenuItem value={"true"}>Admin</MenuItem>
                      </Select>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }} className="tableCell">
                    <Tooltip title="Delete user" arrow placement="right">
                      <IconButton onClick={() => handleOpenModal(user._id)}>
                        <DeleteOutlinedIcon
                          style={{
                            color: "red",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 25, 50]}
          component="div"
          count={filteredUsers?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      {/* Delete modal */}
      <DeleteConformationModal
        open={open}
        handleClose={handleCloseModal}
        handleDeleteUser={handleDeleteUser}
        userId={userUniqueId}
      />
    </Box>
  );
}

export default AdminPanel;
