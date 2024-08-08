import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uid } from "uuid";
import HTTP from "../../HTTP";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ElementWrapper } from "../Page/Page";
import Save from "@mui/icons-material/Save";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import toast from "react-hot-toast";
import UpdateLinkModal from "./UpdateLinkModal";

function isValidURL(url) {
  const regex = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-zA-Z0-9$-_@.&+!*'(),]|(\\:[0-9]+))+\\.)+[a-zA-Z]{2,})" + // domain name and extension
      "(\\/[a-zA-Z0-9$-_@.&+!*'(),]*)*" + // path
      "(\\?[a-zA-Z0-9$-_@.&+!*'(),]*)?" + // query string
      "(\\#[a-zA-Z0-9$-_@.&+!*'(),]*)?$" // fragment locator
  );

  return regex.test(url);
}

function Bookmark({
  data,
  onChange,
  provided,
  item,
  handleDelete,
  pageMetaData,
}) {
  const [links, setLinks] = useState(data.URLs || []);
  const [newLink, setNewLink] = useState("");
  const [collapsed, setCollapsed] = useState(data?.collapsed);

  const handleAddLink = () => {
    let tempNewLink = formatURL(newLink);
    if (!isValidURL(tempNewLink))
      return toast.error("Please enter a valid url!");
    setLinks((p) => [
      ...p,
      {
        _id: uid(),
        link: tempNewLink,
      },
    ]);
    setNewLink("");
  };

  const formatURL = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedLinks = Array.from(links);
    const [movedLink] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, movedLink);
    setLinks(reorderedLinks);
  };

  useEffect(() => {
    onChange({ ...data, URLs: links, collapsed });
  }, [links, collapsed]);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.data.name || "");

  function ActionButtons() {
    return (
      <>
        <IconButton
          onClick={() => {
            setEditing((p) => !p);
            onChange({ ...data, name: title, URLs: links });
          }}
          size="small"
        >
          {!editing ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.4522 5.14722C16.891 4.70855 17.1376 4.11353 17.1376 3.49307C17.1377 2.87261 16.8913 2.27753 16.4526 1.83874C16.014 1.39995 15.419 1.1534 14.7985 1.15332C14.178 1.15324 13.583 1.39965 13.1442 1.83832L2.06819 12.917C1.8755 13.1091 1.733 13.3456 1.65324 13.6058L0.556925 17.2176C0.535476 17.2894 0.533856 17.3656 0.552236 17.4383C0.570617 17.5109 0.608313 17.5772 0.661324 17.6301C0.714336 17.683 0.780686 17.7206 0.853334 17.7389C0.925983 17.7571 1.00222 17.7554 1.07396 17.7338L4.68656 16.6383C4.94647 16.5593 5.183 16.4177 5.37539 16.2259L16.4522 5.14722Z"
                stroke="#79797E"
                stroke-width="1.03738"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.3276 3.64355L14.6473 6.96325"
                stroke="#79797E"
                stroke-width="1.03738"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <Save
              sx={{
                fontSize: "18px",
                color: item.data.name != title ? "red" : "none",
              }}
            />
          )}
        </IconButton>
        {/* <IconButton size="small">
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99636 3.4898C10.5693 3.4898 11.0337 3.02535 11.0337 2.45242C11.0337 1.87949 10.5693 1.41504 9.99636 1.41504C9.42344 1.41504 8.95898 1.87949 8.95898 2.45242C8.95898 3.02535 9.42344 3.4898 9.99636 3.4898Z"
            stroke="#79797E"
            stroke-width="2.07476"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.2595 3.4898C17.8325 3.4898 18.2969 3.02535 18.2969 2.45242C18.2969 1.87949 17.8325 1.41504 17.2595 1.41504C16.6866 1.41504 16.2222 1.87949 16.2222 2.45242C16.2222 3.02535 16.6866 3.4898 17.2595 3.4898Z"
            stroke="#79797E"
            stroke-width="2.07476"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.73562 3.4898C3.30855 3.4898 3.773 3.02535 3.773 2.45242C3.773 1.87949 3.30855 1.41504 2.73562 1.41504C2.16269 1.41504 1.69824 1.87949 1.69824 2.45242C1.69824 3.02535 2.16269 3.4898 2.73562 3.4898Z"
            stroke="#79797E"
            stroke-width="2.07476"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </IconButton> */}
      </>
    );
  }

  return (
    <>
      <ElementWrapper
        editable={pageMetaData.role == "OWNER" || pageMetaData.role == "EDITOR"}
        collapsed={data?.collapsed}
        setCollapsed={setCollapsed}
        handleTitleChange={(val) => setTitle(val)}
        ActionButtons={ActionButtons}
        editing={editing}
        handleDelete={handleDelete}
        provided={provided}
        item={item}
      >
        <Box minHeight={"10px"} p={"10px"} sx={{ cursor: "default" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="links">
              {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef}>
                  {links.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <LinkComponent
                            editable={
                              pageMetaData.role == "OWNER" ||
                              pageMetaData.role == "EDITOR"
                            }
                            item={item}
                            setLinks={setLinks}
                          />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>

          {(pageMetaData.role == "OWNER" || pageMetaData.role == "EDITOR") && (
            <TextField
              size="small"
              placeholder="Add URL or web address"
              type="url"
              sx={{
                width: "100%",
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#B4D33B",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4D8733",
                  },
                },
              }}
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  handleAddLink();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleAddLink}
                      sx={{ p: "4px" }}
                      size="small"
                      disabled={!newLink}
                    >
                      <AddIcon sx={{ color: newLink ? "#333333" : "#ccc" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Box>
      </ElementWrapper>
    </>
  );
}

function LinkComponent({ item, setLinks, editable }) {
  const [siteData, setSiteData] = useState({
    ...item,
    favicon: item.favicon
      ? item.favicon
      : `https://www.google.com/s2/favicons?sz=64&domain_url=${item.link}`,
  });
  const [readOnly, setReadOnly] = useState(true);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = (item) => {
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // e.stopPropagation();

    setLinks((p) => {
      let temp = [...p];
      return temp.filter((i) => {
        return item._id != i._id;
      });
    });
  };
  const handleChangeLinkName = (newName) => {
    setLinks((p) => {
      let temp = [...p];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i]._id == item._id) {
          temp[i].name = newName;
          return temp;
        }
      }
    });
  };

  useEffect(() => {
    if (item.favicon && item.name) return;
    HTTP.post("getSiteData", { url: item.link }).then((res) => {
      setLinks((p) => {
        let temp = [...p];
        for (let i = 0; i < temp.length; i++) {
          if (item._id == temp[i]._id) {
            temp[i] = {
              ...item,
              ...res.data,
            };
            return temp;
          }
        }
      });
      setSiteData(res.data);
    });
  }, [item.link]);

  return (
    // <Box sx={{ background: "#4D873305", borderRadius: "16px" }}>
    <>
      <Link
        sx={{ cursor: "pointer" }}
        // href={item.link}
        onClick={() => {
          if (!readOnly) return;
          window.open(item.link);
        }}
        target={"_blank"}
        title={`${siteData.name || ""},\n${siteData.description || ""}`}
        display={"flex"}
        alignItems={"center"}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            width: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              // width: "80%"
              overflow: "hidden",
            }}
          >
            <img
              height={"15px"}
              width={"15px"}
              src={siteData.favicon}
              alt="favicon"
            />
            {readOnly ? (
              <Typography sx={{ textWrap: "nowrap", overflow: "hidden" }}>
                {/* {(item.name || siteData.name || item.link || "").length > 15
                  ? `${(item.name || siteData.name || "").slice(0, 15)}...`
                  : item.name || siteData.name || ""} */}
                {item.name || siteData.name || item.link || ""}
              </Typography>
            ) : (
              // <Typography  spellCheck="false" onClick={(e) => e.stopPropagation()} sx={{ cursor: "text", outline: "none", width:"100%", overflow:"hidden" }} ref={ref} contentEditable={!readOnly}>
              //   {item.name || siteData.name || ""}
              // </Typography>
              <input
                style={{ all: "unset", cursor: "text", width: "100%" }}
                defaultValue={item.name || siteData.name || ""}
                spellCheck="false"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  cursor: "text",
                  outline: "none",
                  width: "100%",
                  overflow: "hidden",
                }}
                ref={ref}
                contentEditable={!readOnly}
              ></input>
            )}
          </Box>

          <Box
            display={"flex"}
            bgcolor={"white"}
            position={"absolute"}
            right={0}
          >
            {editable && (
              <>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditModal();
                    // if (readOnly) {
                    //   setReadOnly(false);
                    // } else {
                    //   setReadOnly(true);

                    //   if (ref.current) {
                    //     handleChangeLinkName(ref.current.value);
                    //   }
                    // }
                  }}
                  size="small"
                >
                  {readOnly ? (
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.9568 5.27285C17.3877 4.84215 17.6297 4.25795 17.6298 3.64877C17.6299 3.03959 17.3879 2.45533 16.9573 2.02452C16.5266 1.59371 15.9424 1.35164 15.3332 1.35156C14.724 1.35149 14.1398 1.59341 13.709 2.02411L2.83435 12.9013C2.64516 13.09 2.50525 13.3222 2.42693 13.5776L1.35055 17.1238C1.3295 17.1943 1.3279 17.2691 1.34595 17.3404C1.364 17.4117 1.40101 17.4768 1.45306 17.5288C1.5051 17.5807 1.57025 17.6176 1.64157 17.6356C1.7129 17.6535 1.78775 17.6518 1.85819 17.6306L5.40511 16.555C5.66029 16.4774 5.89251 16.3384 6.08141 16.1501L16.9568 5.27285Z"
                        stroke="#79797E"
                        stroke-width="1.01852"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.9243 3.79688L15.1836 7.05621"
                        stroke="#79797E"
                        stroke-width="1.01852"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <Save sx={{ fontSize: "18px" }} />
                  )}
                </IconButton>
                <IconButton size="small" onClick={handleOpenModal}>
                  {/* <DeleteOutlineOutlinedIcon
            sx={{ color: "#B5B5B5", width: "20px", height: "20px" }}
          /> */}
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.884277 3.70605H14.6343"
                      stroke="#616161"
                      strokeWidth="0.900086"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.1066 3.70605V14.4005C13.1066 15.1644 12.3427 15.9283 11.5788 15.9283H3.93989C3.176 15.9283 2.41211 15.1644 2.41211 14.4005V3.70605"
                      stroke="#616161"
                      strokeWidth="0.900086"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.70361 3.70595V2.17817C4.70361 1.41428 5.4675 0.650391 6.23139 0.650391H9.28695C10.0508 0.650391 10.8147 1.41428 10.8147 2.17817V3.70595"
                      stroke="#616161"
                      strokeWidth="0.900086"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.23145 7.52539V12.1087"
                      stroke="#616161"
                      strokeWidth="0.900086"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.28711 7.52539V12.1087"
                      stroke="#616161"
                      strokeWidth="0.900086"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      </Link>
      {/* Delete modal */}
      <DeleteConfirmationModal
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />

      {/* Edit Modal */}
      <UpdateLinkModal
        handleCloseEditModal={handleCloseEditModal}
        openEditModal={openEditModal}
        item={item}
        setLinks={setLinks}
      />
    </>
    // </Box>
  );
}

export default Bookmark;
