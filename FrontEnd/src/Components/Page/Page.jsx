import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
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
  const [filteredPageData, setFilteredPageData] = useState([]);
  const [filters, setFilters] = useState({});

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
    // if (!loginUser) return;

    // let tempPageData = findByID(pages, pageID);
    // let tempPage = tempPageData?.data || [];
    // if (tempPage.length == 0 || loginUser == null) {
    HTTP.get(`getPageData/${pageID}`).then(async (res) => {
      if (res.data.error) {
        if (res.data.errorCode == "ENTER_PASSWORD") {
          let pass = prompt("Please enter page password");
          let { data: tempPage } = await HTTP.get(
            `getPageData/${pageID}?password=${pass}`
          );
          setFilteredPageData(tempPage.data);
          return setPageData(tempPage.data);
        }

        return alert(res.data.error);
      }

      setFilteredPageData(res.data.data);
      setPageData(res.data.data);
    });
  }, [loginUser, pageID]);

  const controllerRef = useRef(null);

  useEffect(() => {
    if (!loginUser || !token) return;
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

      HTTP.put(
        `pages/${pageID}`,
        { data: pageData },
        { signal: controller.signal }
      )
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

  function filterData(data, filterObject) {
    if (Object.keys(filterObject).length == 0) return data;
    // Create a new array to hold the filtered data
    const filteredData = data.map((page) => {
      // Create a new page object with the same structure but empty items arrays
      return {
        ...page,
        items: page.items.filter((item) => filterObject[item.type] === 1),
      };
    });

    // Return the filtered data array
    return filteredData;
  }

  useEffect(() => {
    let tempFilteredObj = filterData(pageData, filters);
    setFilteredPageData(tempFilteredObj);
  }, [pageData, filters]);

  return (
    <Box>
      <Navbar setPageData={setPageData} />
      <Box sx={{ bgcolor: "#f4f4f4" }}>
        <TabButtons
          setPageData={setPageData}
          setFilteredPageData={setFilteredPageData}
          filters={filters}
          setFilters={setFilters}
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
                            key={itemIndex}
                            draggableId={`${boxIndex}-${itemIndex}`}
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
                                        data={item.data}
                                        provided={provided}
                                        item={item}
                                      />
                                    );
                                  } else if (item.type == "Note") {
                                    return (
                                      <TextEditorWithSave
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
                                        data={item.data}
                                      />
                                    );
                                  } else if (item.type == "Clock") {
                                    return (
                                      <Clock
                                        data={item.data}
                                        provided={provided}
                                        item={item}
                                      />
                                    );
                                  } else if (item.type == "Todo") {
                                    return (
                                      <Todo
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
                                        data={item.data}
                                      />
                                    );
                                  } else if (item.type == "Bookmark") {
                                    return (
                                      <Bookmark
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
                                        data={item.data}
                                      />
                                    );
                                  } else if (item.type == "Embed") {
                                    return (
                                      <Embed
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
                                        data={item.data}
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
  );
}

export default Page;

export function ElementWrapper({ provided, item, children, ActionButtons }) {
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
        }}
        gap={"10px"}
      >
        <Box display={"flex"} gap={"10px"}>
          <Typography sx={{ color: "#333333", fontWeight: 520 }}>
            {item?.data?.name || item.type}
          </Typography>
          <IconButton size="small" onClick={() => setOpen((p) => !p)}>
            <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Box>
        <Box display={"flex"} gap={"5px"}>
          {!!ActionButtons && <ActionButtons />}
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

// Navbar.jsx
// function Navbar() {
//   const nav = useNavigate();
//   const { pageID } = useParams();
//   const { handleLogout, pages, setPages, token } = useContext(Context);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const handleOpenModal = () => setModalOpen(true);
//   const handleCloseModal = () => setModalOpen(false);
//   const handleEditOpenModal = () => setEditModalOpen(true);
//   const handleEditCloseModal = () => setEditModalOpen(false);

//   const handleCreatePage = async (pageData) => {
//     let { data: res } = await HTTP.post(`addNewPage`, pageData);
//     if (res.error) return alert(res.error || "Internal Server Error!");
//     setPages((p) => [...p, res]);
//   };

//   const handleEditPage = async (pageData) => {
//     let { data: res } = await HTTP.put(`pages/${pageID}`, pageData);
//     if (res.error) return alert(res.error || "Internal Server Error!");

//     setPages((p) => {
//       let temp = [...p];
//       for (let i = 0; i < temp.length; i++) {
//         if (temp[i]._id == pageID) {
//           temp[i] = res;
//         }
//       }
//       return temp;
//     });
//   };

//   return (
//     <Box display={"flex"} justifyContent={"space-between"}>
//       <Box display={"flex"} gap={"10px"}>
//         {token && (
//           <Sbutton startIcon={<MenuIcon sx={{ color: "black" }} />}>
//             <Typography>Pages</Typography>
//           </Sbutton>
//         )}

//         {token &&
//           pages.map((item) => {
//             return (
//               <Sbutton
//                 onClick={() => {
//                   nav("/page/" + item._id);
//                 }}
//               >
//                 <Typography>{item.pageName || ""}</Typography>
//               </Sbutton>
//             );
//           })}
//         {token && (
//           <Sbutton title={"Add new Page"} onClick={handleOpenModal}>
//             <AddIcon />
//           </Sbutton>
//         )}
//       </Box>

//       {modalOpen && (
//         <CreatePageModal
//           open={modalOpen}
//           handleClose={handleCloseModal}
//           handleCreatePage={handleCreatePage}
//         />
//       )}
//       {editModalOpen && (
//         <EditPageModal
//           open={editModalOpen}
//           handleClose={handleEditCloseModal}
//           handleEditPage={handleEditPage}
//         />
//       )}

//       <Box display={"flex"} gap={"10px"}>
//         {token && (
//           <Sbutton
//             onClick={() => {
//               handleLogout();
//               nav("/login");
//             }}
//           >
//             <Typography>Logout</Typography>
//           </Sbutton>
//         )}
//         {!token && (
//           <Sbutton onClick={() => nav("/login")}>
//             <Typography>Login</Typography>
//           </Sbutton>
//         )}
//         {token && (
//           <Sbutton>
//             <Typography>Share</Typography>
//           </Sbutton>
//         )}
//         {token && (
//           <Sbutton>
//             <AddIcon />
//           </Sbutton>
//         )}
//         {token && (
//           <Sbutton onClick={handleEditOpenModal}>
//             {/* <MoreVertIcon /> */}
//             <SettingsIcon />
//           </Sbutton>
//         )}
//         <Sbutton sx={{ borderRadius: "50%", padding: 0 }}>
//           <Box
//             borderRadius={"50%"}
//             height={"32px"}
//             width={"32px"}
//             overflow={"hidden"}
//           >
//             <img
//               draggable={false}
//               style={{ width: "100%", height: "100%" }}
//               src="https://lh3.googleusercontent.com/a/ACg8ocJT0qY5tWE0jbHJMnBF7ZcLWffYEqmfX665vNor9zabZNCUIek=s96-c"
//             />
//           </Box>
//         </Sbutton>
//       </Box>
//     </Box>
//   );
// }

// function Sbutton({ children, sx, ...props }) {
//   return (
//     <Button
//       className="SButton"
//       size="small"
//       {...props}
//       sx={{ textTransform: "none", minWidth: 0, ...sx }}
//     >
//       {children}
//     </Button>
//   );
// }
