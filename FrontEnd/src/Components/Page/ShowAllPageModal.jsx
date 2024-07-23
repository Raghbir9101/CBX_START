import React, { useContext, useState } from "react";
import {
  Modal,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteModal from "./DeleteModal";
import { Context } from "../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DuplicateModal from "./DuplicateModal";
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

const ShowAllPageModal = ({
  open,
  handleClose,
  handleOpenModal,
  handleEditOpenModal,
  pageMetaData,
  setSelectedPage,
  selectedPage,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { pages, setPages } = useContext(Context);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedPage(null)
  };
  const [openDuplicateModal, setOpenDuplicateModal] = useState(false);
  const handleOpenDuplicateModal = () => {
    setOpenDuplicateModal(true);
  };
  const handleCloseDuplicateModal = () => {
    setOpenDuplicateModal(false);
    setSelectedPage(null)
  };
  const { pageID } = useParams();
  const nav = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPages = pages.filter((page) =>
    page.pageName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-page-modal-title"
        aria-describedby="create-page-modal-description" sx={{ overflowY: "auto" }}
      >
        <Box sx={modalStyle}>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <input
                type="text"
                placeholder="Search"
                className="searchInput"
                style={{ paddingLeft: "35px" }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <SearchRoundedIcon
                sx={{
                  color: "#ACB1C6",
                  width: "20px",
                  height: "20px",
                  position: "absolute",
                  left: "10px",
                }}
              />
              <IconButton
                className="searchIcon"
                size="small"
                onClick={handleClear}
              >
                {/* <SearchRoundedIcon
                  sx={{ color: "#ACB1C6", width: "20px", height: "20px" }}
                /> */}
                <CloseOutlinedIcon
                  sx={{ color: "#ACB1C6", width: "20px", height: "20px" }}
                />
              </IconButton>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: "14px", color: "#8B8888" }}>
                Your Pages
              </Typography>
              {filteredPages.map((item) => {
                return (
                  <Box
                    sx={{
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: "5px",
                      height: "40px",
                      cursor: "pointer",
                      background: pageID == item?._id ? "#d1ffbc" : "",
                      "&:hover": {
                        background: pageID == item?._id ? "#d1ffbc" : "#f7fafc",
                      },
                    }}
                    onClick={() => {
                      nav("/page/" + item._id);
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <ChevronRightRoundedIcon />
                      <Typography>{item.pageName || ""}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {(item.role == "OWNER" || item.role == "EDITOR") && (
                        <Tooltip title="Duplicate this page" arrow>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDuplicateModal(e);
                              setSelectedPage(item);
                            }}
                          >
                            <ContentCopyIcon
                              sx={{
                                color: "#B5B5B5",
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                      {(item.role == "OWNER" || item.role == "EDITOR") &&
                        (
                          <Tooltip title="Edit this page" arrow>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditOpenModal(e);
                                setSelectedPage(item);
                              }}
                            >
                              <EditOutlinedIcon
                                sx={{
                                  color: "#B5B5B5",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                      {(item.role == "OWNER" || item.role == "EDITOR") && (
                        <Tooltip title="Delete this page" arrow>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDeleteModal(e);
                              setSelectedPage(item);
                            }}
                          >
                            <DeleteOutlineOutlinedIcon
                              sx={{
                                color: "#B5B5B5",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Footer */}
          <Box mt={4}>
            <Box>
              <Button
                onClick={handleOpenModal}
                type="submit"
                variant="contained"
                className="createNewPageBtn"
              >
                Create a new page
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <DuplicateModal
        open={openDuplicateModal}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        handleClose={handleCloseDuplicateModal}
      />
      <DeleteModal
        open={openDeleteModal}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        setPages={setPages}
        handleClose={handleCloseDeleteModal}
      />
    </>
  );
};

export default ShowAllPageModal;
