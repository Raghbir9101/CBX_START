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
} from "@mui/material";
import HTTP from "../../HTTP";
import { Context } from "../Context/Context";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./AdminPanel.css";
import AdminNavbar from "./AdminNavbar";

const styles = {
  tableContainer: {
    marginTop: "20px",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    fontSize: "15px",
  },
  approveCheckbox: {
    color: "green",
  },
  adminCheckbox: {
    color: "blue",
  },
  avatar: {
    width: 35,
    height: 35,
  },
};

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { token, loginUser } = useContext(Context);

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
    const updatedUsers = users.filter((user) => user._id !== userId);
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

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <AdminNavbar />
      <Box width={"90%"} m={"auto"} pt={"20px"}>
        <TableContainer component={Paper} style={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#f3f3f3" }}>
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
                  Is Approved
                </TableCell>
                <TableCell
                  style={styles.tableHeaderCell}
                  sx={{ textAlign: "center" }}
                >
                  Is Admin
                </TableCell>
                <TableCell
                  style={styles.tableHeaderCell}
                  sx={{ textAlign: "center" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? users.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : users
              ).map((user) => (
                <TableRow key={user._id}>
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
                    <Checkbox
                      size="small"
                      defaultChecked={user.isAdmin}
                      onChange={(event) => handleAdminChange(event, user._id)}
                      style={styles.adminCheckbox}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }} className="tableCell">
                    <Tooltip title="Delete" arrow placement="right">
                      <IconButton onClick={() => handleDeleteUser(user._id)}>
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}

export default AdminPanel;
