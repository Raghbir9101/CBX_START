import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Calculator from "../Calculator/Calculator";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextEditorWithSave from "../TextEditor/TextEditorWithSave";
import Clock from "../Clock/Clock";
import Todo from "../Todo/Todo";
import Bookmark from "../Bookmark/Bookmark";
import Embed from "../Embed/Embed";
import CurrencyConverter from "../CurrencyConverter/CurrencyConverter";
import { Context } from "../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import CreatePageModal from "./CreateNewPage";
import HTTP from "../../HTTP";
import SettingsIcon from "@mui/icons-material/Settings";
import EditPageModal from "./EditNewPage";

import "./Page.css";
import TabButtons from "./TabButtons";
import Navbar from "../Navbar/Navbar";
import Delete from "@mui/icons-material/Delete";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import GoogleCalendar from "../GoogleCalendar/GoogleCalendar";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "300px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "25px 25px",
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

function Page() {
  const { loginUser, token } = useContext(Context);
  const { pageID } = useParams();

  const [bgImage, setBgImage] = useState(
    "https://static.start.me/f_auto,q_auto/backgrounds/iifsjzygnlokefem069v"
  );

  const { pages } = useContext(Context);
  const [pageData, setPageData] = useState([]);
  const [pageMetaData, setPageMetaData] = useState([]);
  const [pass, setPass] = useState("");
  const [filteredPageData, setFilteredPageData] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [passwordModal, setPasswordModal] = useState(false);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(pageData[parseInt(source.droppableId)].items);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      const newPageData = Array.from(pageData);
      newPageData[parseInt(source.droppableId)].items = items;

      setPageData(newPageData);
    } else {
      const sourceItems = Array.from(
        pageData[parseInt(source.droppableId)].items
      );
      const [movedItem] = sourceItems.splice(source.index, 1);
      const destinationItems = Array.from(
        pageData[parseInt(destination.droppableId)].items
      );
      destinationItems.splice(destination.index, 0, movedItem);

      const newPageData = Array.from(pageData);
      newPageData[parseInt(source.droppableId)].items = sourceItems;
      newPageData[parseInt(destination.droppableId)].items = destinationItems;

      setPageData(newPageData);
    }
  };

  useEffect(() => {
    if (pageID == "undefined" || !pageID) return;

    // let tempPageData = findByID(pages, pageID);
    // let tempPage = tempPageData?.data || [];
    if (pageData.length > 0 && loginUser == null) {
      return;
    }
    HTTP.get(`getPageData/${pageID}`).then(async (res) => {
      if (res.data.error) {
        if (res.data.errorCode == "ENTER_PASSWORD") {
          return setPasswordModal(true);
          // let pass = prompt("Please enter page password");
          // if (!pass) return alert("Invalid Password !");
          // let { data: tempPage } = await HTTP.get(
          //   `getPageData/${pageID}?password=${pass}`
          // );
          // if (tempPage.error && tempPage.error != "ENTER_PASSWORD") {
          //   return alert(res.data.error);
          // }
          // setFilteredPageData(tempPage.data);
          // return setPageData(tempPage.data);
        }

        return alert(res.data.error);
      }
      setPageMetaData(res.data);
      setFilteredPageData(res.data.data);
      setPageData(res.data.data);
    });
  }, [loginUser, pageID]);

  const controllerRef = useRef(null);

  useEffect(() => {
    if (!loginUser || !token || pageID == "undefined" || !pageID) return;
    let tempPageData = findByID(pages, pageID);
    if (loginUser) {
      if (tempPageData.role != "EDITOR" && tempPageData.role != "OWNER") return;
    }
    const debounceTimeout = setTimeout(() => {
      if (controllerRef.current) {
        controllerRef.current.abort(); // Cancel the previous request
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      HTTP.put(`pages/${pageID}`, { data: pageData })
        .then((response) => {})
        .catch((error) => {
          if (axios.isCancel(error)) {
          } else {
            console.error("Something went wrong: ", error);
          }
        });
    }, 300); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(debounceTimeout);
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [pageData]);

  function filterData(data, filterObject, search) {
    let notTabFiltering = Object.keys(filterObject).length == 0;
    if (notTabFiltering && search == "") return data;
    // Create a new array to hold the filtered data
    const filteredData = data.map((page) => {
      // Create a new page object with the same structure but empty items arrays
      return {
        ...page,
        items: page.items.filter((item) => {
          return (
            (notTabFiltering ? true : filterObject[item.type] === 1) &&
            item?.data?.name.toLowerCase().includes(search)
          );
        }),
      };
    });

    // Return the filtered data array
    return filteredData;
  }

  useEffect(() => {
    let tempFilteredObj = filterData([...pageData], filters, search);
    setFilteredPageData(tempFilteredObj);
  }, [pageData, filters, search]);

  return (
    <>
      <Box paddingBottom={"100px"} bgcolor={"#f4f4f4"}>
        <Navbar
          search={search}
          setSearch={setSearch}
          pageMetaData={pageMetaData}
          setPageData={setPageData}
          setPageMetaData={setPageMetaData}
        />
        <Box sx={{ bgcolor: "#f4f4f4" }}>
          <TabButtons
            setPageData={setPageData}
            setFilteredPageData={setFilteredPageData}
            filters={filters}
            setFilters={setFilters}
            setSearch={setSearch}
          />
          <Box
            minHeight={"100vh"}
            p={"10px"}
            width={"100%"}
            gap={"40px"}
            display={"flex"}
            flexDirection={"column"}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Box
                display={"flex"}
                minHeight={"50vh"}
                justifyContent={"space-evenly"}
                gap={"20px"}
              >
                {filteredPageData.map((box, boxIndex) => (
                  <Droppable droppableId={`${boxIndex}`} key={boxIndex}>
                    {(provided) => (
                      <Box
                        maxWidth={
                          pageData.length == 5
                            ? "19%"
                            : pageData.length == 3
                            ? "33.33%"
                            : "50%"
                        }
                        width={
                          pageData.length == 5
                            ? "19%"
                            : pageData.length == 3
                            ? "33.33%"
                            : "50%"
                        }
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        // bgcolor={"#0000001f"}
                        minHeight={"50vh"}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={"20px"}
                      >
                        {box.items.map((item, itemIndex) => {
                          return (
                            <Draggable
                              key={item?.id || itemIndex}
                              draggableId={
                                item?.id || `${boxIndex}-${itemIndex}`
                              }
                              index={itemIndex}
                            >
                              {(provided) => (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  // {...provided.dragHandleProps}
                                  // bgcolor={"white"}
                                  // minHeight={"100px"}
                                  display={"flex"}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  sx={{ margin: "10px 0", cursor: "move" }}
                                >
                                  {/* <Calculator/> */}
                                  {/* <ElementWrapper item={item} provided={provided}> */}
                                  {(() => {
                                    if (item.type == "Calculator") {
                                      return (
                                        <Calculator
                                          handleDelete={() => {
                                            if (
                                              pageMetaData.role != "OWNER" &&
                                              pageMetaData.role != "EDITOR"
                                            )
                                              return alert(
                                                "You don't have rights to edit or delete"
                                              );
                                            let newData = deleteObject(
                                              [...pageData],
                                              boxIndex,
                                              itemIndex
                                            );
                                            setPageData(newData);
                                          }}
                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              temp[boxIndex].items[
                                                itemIndex
                                              ].data = newData;
                                              return temp;
                                            });
                                          }}
                                          data={item.data}
                                          provided={provided}
                                          item={item}
                                        />
                                      );
                                    } else if (item.type == "Note") {
                                      return (
                                        <TextEditorWithSave
                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              temp[boxIndex].items[
                                                itemIndex
                                              ].data = newData;
                                              return temp;
                                            });
                                          }}
                                          handleDelete={() => {
                                            if (
                                              pageMetaData.role != "OWNER" &&
                                              pageMetaData.role != "EDITOR"
                                            )
                                              return alert(
                                                "You don't have rights to edit or delete"
                                              );
                                            let newData = deleteObject(
                                              [...pageData],
                                              boxIndex,
                                              itemIndex
                                            );
                                            setPageData(newData);
                                          }}
                                          provided={provided}
                                          item={item}
                                          data={item.data}
                                        />
                                      );
                                    } else if (item.type == "Clock") {
                                      return (
                                        <Clock
                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              temp[boxIndex].items[
                                                itemIndex
                                              ].data = newData;
                                              return temp;
                                            });
                                          }}
                                          handleDelete={() => {
                                            if (
                                              pageMetaData.role != "OWNER" &&
                                              pageMetaData.role != "EDITOR"
                                            )
                                              return alert(
                                                "You don't have rights to edit or delete"
                                              );
                                            let newData = deleteObject(
                                              [...pageData],
                                              boxIndex,
                                              itemIndex
                                            );
                                            setPageData(newData);
                                          }}
                                          data={item.data}
                                          provided={provided}
                                          item={item}
                                        />
                                      );
                                    } else if (item.type == "Todo") {
                                      return (
                                        <Todo
                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              temp[boxIndex].items[
                                                itemIndex
                                              ].data = newData;
                                              return temp;
                                            });
                                          }}
                                          handleDelete={() => {
                                            if (
                                              pageMetaData.role != "OWNER" &&
                                              pageMetaData.role != "EDITOR"
                                            )
                                              return alert(
                                                "You don't have rights to edit or delete"
                                              );
                                            let newData = deleteObject(
                                              [...pageData],
                                              boxIndex,
                                              itemIndex
                                            );
                                            setPageData(newData);
                                          }}
                                          provided={provided}
                                          item={item}
                                          data={item.data}
                                        />
                                      );
                                    } else if (item.type == "Bookmark") {
                                      return (
                                        <Bookmark
                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              temp[boxIndex].items[
                                                itemIndex
                                              ].data = newData;
                                              return temp;
                                            });
                                          }}
                                          handleDelete={() => {
                                            if (
                                              pageMetaData.role != "OWNER" &&
                                              pageMetaData.role != "EDITOR"
                                            )
                                              return alert(
                                                "You don't have rights to edit or delete"
                                              );
                                            let newData = deleteObject(
                                              [...pageData],
                                              boxIndex,
                                              itemIndex
                                            );
                                            setPageData(newData);
                                          }}
                                          provided={provided}
                                          item={item}
                                          data={item.data}
                                        />
                                      );
                                    } else if (item.type == "Embed") {
                                      return (
                                        <Embed
                                          setPageData={setPageData}
                                          handleDelete={() => {
                                            if (
                                              pageMetaData.role != "OWNER" &&
                                              pageMetaData.role != "EDITOR"
                                            )
                                              return alert(
                                                "You don't have rights to edit or delete"
                                              );
                                            let newData = deleteObject(
                                              [...pageData],
                                              boxIndex,
                                              itemIndex
                                            );
                                            setPageData(newData);
                                          }}
                                          provided={provided}
                                          item={item}
                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              temp[boxIndex].items[
                                                itemIndex
                                              ].data = newData;
                                              return temp;
                                            });
                                          }}
                                          url={item.data.url}
                                          data={item.data}
                                        />
                                      );
                                    } else if (item.type == "Google Calendar") {
                                      // console.log("google")
                                      return (
                                        <GoogleCalendar
                                          setPageData={setPageData}
                                          handleDelete={() => {
                                            if (
                                              pageMetaData.role != "OWNER" &&
                                              pageMetaData.role != "EDITOR"
                                            )
                                              return alert(
                                                "You don't have rights to edit or delete"
                                              );
                                            let newData = deleteObject(
                                              [...pageData],
                                              boxIndex,
                                              itemIndex
                                            );
                                            setPageData(newData);
                                          }}
                                          provided={provided}
                                          item={item}
                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              temp[boxIndex].items[
                                                itemIndex
                                              ].data = newData;
                                              return temp;
                                            });
                                          }}
                                          url={item.data.url}
                                          data={item.data}
                                        />
                                      );
                                    } else if (
                                      item.type == "Currency Converter"
                                    ) {
                                      return (
                                        <CurrencyConverter
                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              temp[boxIndex].items[
                                                itemIndex
                                              ].data = newData;
                                              return temp;
                                            });
                                          }}
                                          data={item.data}
                                          handleDelete={() => {
                                            if (
                                              pageMetaData.role != "OWNER" &&
                                              pageMetaData.role != "EDITOR"
                                            )
                                              return alert(
                                                "You don't have rights to edit or delete"
                                              );
                                            let newData = deleteObject(
                                              [...pageData],
                                              boxIndex,
                                              itemIndex
                                            );
                                            setPageData(newData);
                                          }}
                                          provided={provided}
                                          item={item}
                                        />
                                      );
                                    }
                                  })()}
                                  {/* </ElementWrapper> */}
                                </Box>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                ))}
              </Box>
            </DragDropContext>
          </Box>
        </Box>
      </Box>
      {/* Check password modal  */}
      <Modal
        open={passwordModal}
        onClose={() => {
          setPasswordModal(false);
        }}
        aria-labelledby="create-page-modal-title"
        aria-describedby="create-page-modal-description"
      >
        <Box sx={modalStyle}>
          <TextField
            value={pass}
            onChange={(e) => {
              setPass(e.target.value || "");
            }}
            fullWidth
            label="Enter Password"
            sx={{
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
          <Box
            sx={{
              mt: "10px",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "20px",
              mt: 3,
            }}
          >
            <Button
              onClick={() => setPasswordModal(false)}
              sx={{
                borderColor: "#4D8733",
                color: "#4D8733",
                "&:hover": {
                  borderColor: "#4D8733",
                },
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "#4D8733",
                "&:hover": {
                  background: "#4D8733",
                },
              }}
              onClick={async () => {
                let { data: tempPage } = await HTTP.get(
                  `getPageData/${pageID}?password=${pass}`
                );
                if (tempPage.error && tempPage.error != "ENTER_PASSWORD") {
                  return alert(tempPage.error);
                }
                setPageMetaData(tempPage);
                setFilteredPageData(tempPage.data);
                setPageData(tempPage.data);
                return setPasswordModal(false);
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Page;

function deleteObject(data, pageIndex, objectIndex) {
  // Check if the provided indexes are valid
  if (
    pageIndex >= 0 &&
    pageIndex < data.length &&
    objectIndex >= 0 &&
    objectIndex < data[pageIndex].items.length
  ) {
    // Remove the object at the specified index
    data[pageIndex].items.splice(objectIndex, 1);
  } else {
    console.error("Invalid indexes provided.");
  }
  return data;
}

export function ElementWrapper({
  provided,
  item,
  children,
  ActionButtons,
  handleDelete,
  editing,
  handleTitleChange,
}) {
  const [open, setOpen] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.style.minHeight = `${contentRef.current.scrollHeight}px`;
    } else {
      contentRef.current.style.minHeight = `${0}px`;
    }
  }, [open]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      position={"relative"}
      width={"100%"}
      borderRadius={"13px"}
      overflow={"hidden"}
      bgcolor={"white"}
      p={1}
    >
      <Box
        {...provided.dragHandleProps}
        sx={{
          cursor: "move !important",
          display: "flex",
          alignItems: "center",
          marginRight: "10px",
          padding: "10px",
          width: "100%",
          justifyContent: "space-between",
          position: "relative",
        }}
        gap={"10px"}
      >
        <Box display={"flex"} gap={"10px"}>
          {!editing && (
            <Typography
              sx={{
                color: "#333333",
                fontWeight: 520,
                whiteSpace: "nowrap",
                flex: 1,
                width: "100%",
              }}
            >
              {item?.data?.name || item.type}
            </Typography>
          )}
          {editing && (
            <input
              onChange={(e) => {
                if (handleTitleChange) {
                  handleTitleChange(e.target.value);
                }
              }}
              defaultValue={item?.data?.name || item.type || ""}
              style={{
                all: "unset",
                bgcolor: "gray",
                cursor: "text",
                width: "100%",
                fontWeight: "bold",
              }}
            />
          )}
        </Box>
        <Box
          display={"flex"}
          gap={"5px"}
          position={"absolute"}
          right={0}
          bgcolor={"white"}
        >
          <IconButton size="small" onClick={() => setOpen((p) => !p)}>
            <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
          </IconButton>
          {!!ActionButtons && <ActionButtons />}
          <Tooltip title="Delete" arrow>
            <IconButton
              size="small"
              onClick={() => {
                handleDelete();
              }}
            >
              <DeleteOutlineOutlinedIcon
                sx={{ width: "18px", height: "18px" }}
              />
              {/* <Delete sx={{ width: "16px", height: "16px" }} /> */}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {open && (
        <Box display={"flex"} justifyContent={"center"}>
          <Box sx={{ borderBottom: "1px solid #DEDEDE", width: "90%" }}></Box>
        </Box>
      )}
      <Box
        ref={contentRef}
        sx={{
          cursor: "default",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {open && children}
      </Box>
    </Box>
  );
}
