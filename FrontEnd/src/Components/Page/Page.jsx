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
import Navbar from "../Navbar/Navbar";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import "./Page.css";

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

    let tempPageData = findByID(pages, pageID);
    let tempPage = tempPageData?.data || [];
    if (tempPage.length == 0 || loginUser == null) {
      HTTP.get(`getPageData/${pageID}`).then(async (res) => {
        if (res.data.error) {
          if (res.data.errorCode == "ENTER_PASSWORD") {
            let pass = prompt("Please enter page password");
            let { data: tempPage } = await HTTP.get(
              `getPageData/${pageID}?password=${pass}`
            );
            return setPageData(tempPage.data);
          }

          return alert(res.data.error);
        }
        setPageData(res.data.data);
      });
    } else {
      setPageData(tempPage);
    }
  }, [loginUser, pageID]);

  const controllerRef = useRef(null);

  useEffect(() => {
    if (!loginUser || !token) return;
    let tempPageData = findByID(pages, pageID);
    if (loginUser) {
      if (tempPageData.role != "EDITOR" && tempPageData.role != "OWNER") return;
    }
    console.log(tempPageData.role);
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

  return (
    <Box sx={{ bgcolor: "#f4f4f4" }}>
      <Navbar />

      <Box
        sx={{
          // bgcolor: "#E0F7D240",
          // bgcolor: "#f4f4f4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "25px",
          p: 4,
        }}
      >
        <Button
          className="headingBtns"
          sx={{ boxShadow: 1 }}
          startIcon={
            <IconButton className="iconBtns" sx={{ p: "4px", mr: 1 }}>
              <TextSnippetOutlinedIcon sx={{ width: "16px", height: "16px" }} />
            </IconButton>
          }
        >
          Notes
        </Button>

        <Button
          sx={{ boxShadow: 1 }}
          className="headingBtns"
          startIcon={
            <IconButton className="iconBtns" sx={{ p: "4px", mr: 1 }}>
              <FormatListBulletedOutlinedIcon
                sx={{ width: "16px", height: "16px" }}
              />
            </IconButton>
          }
        >
          To do List
        </Button>

        <Button
          sx={{ boxShadow: 1 }}
          className="headingBtns"
          startIcon={
            <IconButton className="iconBtns" sx={{ p: "4px", mr: 1 }}>
              <ChecklistOutlinedIcon sx={{ width: "16px", height: "16px" }} />
            </IconButton>
          }
        >
          Task List
        </Button>

        <Button
          sx={{ boxShadow: 1 }}
          className="headingBtns"
          startIcon={
            <IconButton className="iconBtns" sx={{ p: "4px", mr: 1 }}>
              <LinkOffOutlinedIcon sx={{ width: "16px", height: "16px" }} />
            </IconButton>
          }
        >
          Links
        </Button>
      </Box>
      <Box
        minHeight={"100vh"}
        p={"10px"}
        width={"100%"}
        gap={"40px"}
        display={"flex"}
        flexDirection={"column"}
        sx={
          {
            // bgcolor: "transparent",
          }
        }
      >
        {/* <Navbar /> */}

        <DragDropContext onDragEnd={onDragEnd}>
          <Box
            display={"flex"}
            minHeight={"50vh"}
            justifyContent={"space-evenly"}
            gap={"20px"}
          >
            {pageData.map((box, boxIndex) => (
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
                              <ElementWrapper item={item} provided={provided}>
                                {(() => {
                                  if (item.type == "Calculator") {
                                    return <Calculator data={item.data} />;
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
                                        data={item.data}
                                      />
                                    );
                                  } else if (item.type == "Clock") {
                                    return <Clock data={item.data} />;
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
                                        data={item.data}
                                      />
                                    );
                                  } else if (item.type == "Embed") {
                                    return (
                                      <Embed
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
                                      <CurrencyConverter data={item.data} />
                                    );
                                  }
                                })()}
                              </ElementWrapper>
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
  );
}

export default Page;

function ElementWrapper({ provided, item, children }) {
  const [open, setOpen] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    console.log(`${contentRef.current.scrollHeight}px`);
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
          <Typography>{item?.data?.name || item.type}</Typography>
          <IconButton size="small" onClick={() => setOpen((p) => !p)}>
            <KeyboardArrowDownIcon sx={{ fontSize: "14px" }} />
          </IconButton>
        </Box>
        <Box display={"flex"} gap={"5px"}>
          <IconButton size="small">
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
          </IconButton>
          <IconButton size="small">
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
          </IconButton>
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
