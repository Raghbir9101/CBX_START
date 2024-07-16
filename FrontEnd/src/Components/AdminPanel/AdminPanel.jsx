import React, { useContext, useEffect, useState } from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Avatar, Button, TablePagination, Menu, MenuItem } from '@mui/material';
import HTTP from "../../HTTP"
import { Context } from '../Context/Context';
import DefaultPFP from "../../Icons/Default_pfp.jpg"
import { useNavigate } from 'react-router-dom';
const styles = {
  tableContainer: {
    marginTop: '20px',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
  },
  approveCheckbox: {
    color: 'green',
  },
  adminCheckbox: {
    color: 'blue',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  deleteButton: {
    color: 'red',
  },
};



function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { token, loginUser } = useContext(Context)
  const handleApprovalChange = async (event, userId) => {
    await HTTP.patch(`updateUsersAdmin/${userId}`, {
      isApproved: event.target.checked
    })
    const updatedUsers = users.map(user =>
      user._id === userId ? { ...user, isApproved: event.target.checked } : user
    );
    setUsers(updatedUsers);
  };

  const handleAdminChange = async (event, userId) => {
    await HTTP.patch(`updateUsersAdmin/${userId}`, {
      isAdmin: event.target.checked
    })
    const updatedUsers = users.map(user =>
      user._id === userId ? { ...user, isAdmin: event.target.checked } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = async (userId) => {
    await HTTP.delete(`deleteUsersAdmin/${userId}`)
    const updatedUsers = users.filter(user => user._id !== userId);
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
      return
    }
    HTTP.get(`getUsersAdmin`).then((res) => {
      setUsers(res.data)
    })
  }, [])
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Nav />
      <Box width={"100%"} padding={"20px"}>
        <TableContainer component={Paper} style={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableHeaderCell}>Photo</TableCell>
                <TableCell style={styles.tableHeaderCell}>User Name</TableCell>
                <TableCell style={styles.tableHeaderCell}>Email</TableCell>
                <TableCell style={styles.tableHeaderCell}>Is Approved</TableCell>
                <TableCell style={styles.tableHeaderCell}>Is Admin</TableCell>
                <TableCell style={styles.tableHeaderCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : users
              ).map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Avatar alt={user.userName} src={user.photo} style={styles.avatar} />
                  </TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Checkbox
                      defaultChecked={user.isApproved}
                      onChange={(event) => handleApprovalChange(event, user._id)}
                      style={styles.approveCheckbox}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      defaultChecked={user.isAdmin}
                      onChange={(event) => handleAdminChange(event, user._id)}
                      style={styles.adminCheckbox}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={styles.deleteButton}
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  )
}

export default AdminPanel



function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { token, loginUser, handleLogout } = useContext(Context)
  const nav = useNavigate()
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  return <Box className="navMainBox">
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ width: "100%" }}
    >
      <Box width={"33%"}>
        <div className="group">
          <img
            className="image"
            alt="Image"
            src="https://c.animaapp.com/YKPFj7gL/img/image-8@2x.png"
          />
        </div>
      </Box>

      {token && (
        <Box
          width={"33%"}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <Box onClick={handleClickMenu}>
            <img
              style={{
                objectFit: "cover",
                borderRadius: "100%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
              src={loginUser?.photo || ""}
              onError={(e) => e.target.src = DefaultPFP}
              alt="profile"
            />
          </Box>
        </Box>
      )}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "16px",
          },
        }}
      >
        <MenuItem>{loginUser?.userName || ""}</MenuItem>
        <MenuItem>{loginUser?.email || ""}</MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
            nav("/login");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  </Box>
}