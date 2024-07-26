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
import HorizontalResizableDiv from "./Resize";
import WorldClock from "../WorldClock/WorldClock";
import NewsFeed from "../RssFeeds/RssFeeds";

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

const deleteModalStyle = {
  position: "absolute",
  top: "300px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
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
  const [collapseAll, setCollapseAll] = useState(true);
  const [open, setOpen] = useState(false);

  function collapseAllItems() {
    let tempCollapse = !collapseAll;

    setPageData((p) => {
      let temp = [...p];

      for (let i = 0; i < temp.length; i++) {
        let items = [...(temp[i].items || [])];
        for (let j = 0; j < items.length; j++) {
          items[j].data.collapsed = tempCollapse;
        }
        temp[i].items = items;
      }
      return temp;
    });
    setCollapseAll((p) => !p);
  }

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
    if (pageData.length > 0 && loginUser == null) {
      return;
    }
    HTTP.get(`getPageData/${pageID}`).then(async (res) => {
      if (res.data.error) {
        if (res.data.errorCode == "ENTER_PASSWORD") {
          return setPasswordModal(true);
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
    if (!pageData || (pageData || []).length == 0) return;
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
        .then((response) => { })
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
            (item?.data?.name || "").toLowerCase().includes(search)
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
      <Box bgcolor={"#f4f4f4"}>
        <Navbar
          search={search}
          setSearch={setSearch}
          pageMetaData={pageMetaData}
          setPageData={setPageData}
          setPageMetaData={setPageMetaData}
        />
        <Box sx={{ bgcolor: "#f4f4f4" }}>
          <TabButtons
            collapseAll={collapseAll}
            collapseAllItems={collapseAllItems}
            setPageData={setPageData}
            setFilteredPageData={setFilteredPageData}
            filters={filters}
            setFilters={setFilters}
            setSearch={setSearch}
          />
          <Box
            width={"100%"}
            gap={"40px"}
            display={"flex"}
            flexDirection={"column"}
            sx={{ p: "0px 10px 10px 10px", overflowX: "auto" }}
          // sx={{ overflowX: "auto", scrollbarWidth: "thin" }}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Box
                display={"flex"}
                // minHeight={"50vh"}
                // justifyContent={"space-evenly"}
                pr={"20px"}
                gap={"30px"}
                minHeight={"100vh"}

              >
                {filteredPageData.map((box, boxIndex) => (
                  <Droppable
                    className="columns"
                    droppableId={`${boxIndex}`}
                    key={boxIndex + pageID}
                  >
                    {(provided) => (
                      <Box
                        className="columns"
                        flexShrink={0}
                        id={`${boxIndex}`}
                        position={"relative"}
                        // maxWidth={
                        //   pageData.length == 5
                        //     ? "19%"
                        //     : pageData.length == 3
                        //       ? "33.33%"
                        //       : "50%"
                        // }
                        // paddingBottom={"100px"}
                        width={
                          box?.width
                            ? box.width
                            : pageData.length == 5
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
                              key={(item?.id+pageID) || itemIndex}
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

                                  {(() => {
                                    
                                    if (item.type == "Calculator") {
                                      return (
                                        <Calculator
                                          pageMetaData={pageMetaData}
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
                                              for (let i = 0; i < temp[boxIndex].items.length; i++) {
                                                if (temp[boxIndex].items[i].id == item.id) {
                                                  temp[boxIndex].items[i].data = newData;
                                                  return temp;
                                                }
                                              }
                                              return temp;
                                            });
                                            // setPageData((p) => {
                                            //   let temp = [...p];
                                            //   temp[boxIndex].items[
                                            //     itemIndex
                                            //   ].data = newData;
                                            //   return temp;
                                            // });
                                          }}
                                          data={item.data}
                                          provided={provided}
                                          item={item}
                                        />
                                      );
                                    } else if (item.type == "Note") {
                                      return (
                                        <TextEditorWithSave
                                          pageMetaData={pageMetaData}
                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              for (let i = 0; i < temp[boxIndex].items.length; i++) {
                                                if (temp[boxIndex].items[i].id == item.id) {
                                                  temp[boxIndex].items[i].data = newData;
                                                  return temp;
                                                }
                                              }
                                              return temp;
                                            });
                                            // setPageData((p) => {
                                            //   let temp = [...p];
                                            //   temp[boxIndex].items[
                                            //     itemIndex
                                            //   ].data = newData;
                                            //   return temp;
                                            // });
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
                                          pageMetaData={pageMetaData}
                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              for (let i = 0; i < temp[boxIndex].items.length; i++) {
                                                if (temp[boxIndex].items[i].id == item.id) {
                                                  temp[boxIndex].items[i].data = newData;
                                                  return temp;
                                                }
                                              }
                                              return temp;
                                            });

                                            // setPageData((p) => {
                                            //   let temp = [...p];
                                            //   temp[boxIndex].items[
                                            //     itemIndex
                                            //   ].data = newData;
                                            //   return temp;
                                            // });
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
                                          pageMetaData={pageMetaData}

                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              for (let i = 0; i < temp[boxIndex].items.length; i++) {
                                                if (temp[boxIndex].items[i].id == item.id) {
                                                  temp[boxIndex].items[i].data = newData;
                                                  return temp;
                                                }
                                              }
                                              return temp;
                                            });
                                            // setPageData((p) => {
                                            //   let temp = [...p];
                                            //   temp[boxIndex].items[
                                            //     itemIndex
                                            //   ].data = newData;
                                            //   return temp;
                                            // });
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
                                          pageMetaData={pageMetaData}
                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              for (let i = 0; i < temp[boxIndex].items.length; i++) {
                                                if (temp[boxIndex].items[i].id == item.id) {
                                                  temp[boxIndex].items[i].data = newData;
                                                  return temp;
                                                }
                                              }
                                              return temp;
                                            });
                                            // setPageData((p) => {
                                            //   let temp = [...p];
                                            //   temp[boxIndex].items[
                                            //     itemIndex
                                            //   ].data = newData;
                                            //   return temp;
                                            // });
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
                                          pageMetaData={pageMetaData}
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
                                              for (let i = 0; i < temp[boxIndex].items.length; i++) {
                                                if (temp[boxIndex].items[i].id == item.id) {
                                                  temp[boxIndex].items[i].data = newData;
                                                  return temp;
                                                }
                                              }
                                              return temp;
                                            });
                                            // setPageData((p) => {
                                            //   let temp = [...p];
                                            //   temp[boxIndex].items[
                                            //     itemIndex
                                            //   ].data = newData;
                                            //   return temp;
                                            // });
                                          }}
                                          url={item.data.url}
                                          data={item.data}
                                        />
                                      );
                                    } else if (item.type == "Google Calendar") {
                                      return (
                                        <GoogleCalendar
                                          pageMetaData={pageMetaData}
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
                                              for (let i = 0; i < temp[boxIndex].items.length; i++) {
                                                if (temp[boxIndex].items[i].id == item.id) {
                                                  temp[boxIndex].items[i].data = newData;
                                                  return temp;
                                                }
                                              }
                                              return temp;
                                            });
                                            // setPageData((p) => {
                                            //   let temp = [...p];
                                            //   temp[boxIndex].items[
                                            //     itemIndex
                                            //   ].data = newData;
                                            //   return temp;
                                            // });
                                          }}
                                          url={item.data.url}
                                          data={item.data}
                                        />
                                      );
                                    } else if (item.type == "Currency Converter") {
                                      return (
                                        <CurrencyConverter
                                          pageMetaData={pageMetaData}
                                          onChange={(newData) => {
                                            setPageData((p) => {
                                              let temp = [...p];
                                              for (let i = 0; i < temp[boxIndex].items.length; i++) {
                                                if (temp[boxIndex].items[i].id == item.id) {
                                                  temp[boxIndex].items[i].data = newData;
                                                  return temp;
                                                }
                                              }
                                              return temp;
                                            });
                                            // setPageData((p) => {
                                            //   let temp = [...p];
                                            //   temp[boxIndex].items[
                                            //     itemIndex
                                            //   ].data = newData;
                                            //   return temp;
                                            // });
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
                                    else if (item.type == "World Clock") {
                                      return <WorldClock
                                        pageMetaData={pageMetaData}
                                        onChange={(newData) => {
                                          setPageData((p) => {
                                            let temp = [...p];
                                            for (let i = 0; i < temp[boxIndex].items.length; i++) {
                                              if (temp[boxIndex].items[i].id == item.id) {
                                                temp[boxIndex].items[i].data = newData;
                                                return temp;
                                              }
                                            }
                                            return temp;
                                          });
                                          // setPageData((p) => {
                                          //   let temp = [...p];
                                          //   temp[boxIndex].items[
                                          //     itemIndex
                                          //   ].data = newData;
                                          //   return temp;
                                          // });
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
                                    }
                                    else if (item.type == "News Feed") {
                                      return <NewsFeed
                                        pageMetaData={pageMetaData}
                                        onChange={(newData) => {
                                          setPageData((p) => {
                                            let temp = [...p];
                                            for (let i = 0; i < temp[boxIndex].items.length; i++) {
                                              if (temp[boxIndex].items[i].id == item.id) {
                                                temp[boxIndex].items[i].data = newData;
                                                return temp;
                                              }
                                            }
                                            return temp;
                                          });
                                          // setPageData((p) => {
                                          //   let temp = [...p];
                                          //   temp[boxIndex].items[
                                          //     itemIndex
                                          //   ].data = newData;
                                          //   return temp;
                                          // });
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
                                    }
                                  })()}
                                  {/* </ElementWrapper> */}
                                </Box>

                              )}

                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                        <HorizontalResizableDiv
                          columnId={boxIndex}
                          onResize={(width) => {
                            setPageData((p) => {
                              let temp = [...p];
                              temp[boxIndex].width = width;
                              return temp;
                            });
                          }}
                        />
                        {/* <Box height={"100%"} border={"2px solid gray"} position={"absolute"} right={"-10px"} sx={{cursor:"col-resize"}} >

                        </Box> */}
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
  collapsed,
  setCollapsed,
  editable,
}) {
  // const [open, setOpen] = useState(true);
  const contentRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpenDeleteModal = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (collapsed && contentRef.current) {
      contentRef.current.style.minHeight = `${contentRef.current.scrollHeight || 400
        }px`;
    } else {
      contentRef.current.style.minHeight = `${0}px`;
    }
  }, [collapsed]);

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
          {editable && (
            <>
              {" "}
              <IconButton size="small" onClick={() => setCollapsed((p) => !p)}>
                <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
              </IconButton>
              {/* <IconButton size="small" onClick={() => setOpen((p) => !p)}>
            <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
          </IconButton> */}
              {!!ActionButtons && <ActionButtons />}
              <Tooltip title="Delete" arrow>
                <IconButton
                  size="small"
                  // onClick={() => {
                  //   handleDelete();
                  // }}
                  onClick={handleOpenDeleteModal}
                >
                  <DeleteOutlineOutlinedIcon
                    sx={{ width: "18px", height: "18px" }}
                  />
                  {/* <Delete sx={{ width: "16px", height: "16px" }} /> */}
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>
      {/* {open && (
        <Box display={"flex"} justifyContent={"center"}>
          <Box sx={{ borderBottom: "1px solid #DEDEDE", width: "90%" }}></Box>
        </Box>
      )} */}
      {collapsed && (
        <Box display={"flex"} justifyContent={"center"}>
          <Box sx={{ borderBottom: "1px solid #DEDEDE", width: "90%" }}></Box>
        </Box>
      )}
      <Box
        ref={contentRef}
        sx={{
          cursor: "default",
          opacity: collapsed ? 1 : 0,
          visibility: collapsed ? "visible" : "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {/* {open && children} */}
        {collapsed && children}
      </Box>
      {/* Delete Conformation modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-page-modal-title"
        aria-describedby="create-page-modal-description"
      >
        <Box sx={deleteModalStyle}>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: "18px " }}>
              Are you sure you want to delete{" "}
            </Typography>
            <Typography sx={{ fontSize: "18px " }}>this widget?</Typography>
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "50px",
                mt: 3,
              }}
            >
              <Button
                onClick={handleClose}
                variant="outlined"
                className="cancelBtn"
              >
                No
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="createPageBtn"
                onClick={() => handleDelete()}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
