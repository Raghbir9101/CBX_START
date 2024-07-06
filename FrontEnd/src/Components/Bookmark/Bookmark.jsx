import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uid } from "uuid";
import HTTP from "../../HTTP";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ElementWrapper } from "../Page/Page";

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

function Bookmark({ data, onChange , provided, item}) {
  const [links, setLinks] = useState(data.URLs || []);
  const [newLink, setNewLink] = useState("");

  const handleAddLink = () => {
    let tempNewLink = formatURL(newLink);
    if (!isValidURL(tempNewLink)) return alert("Please enter a valid url!");
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
    onChange({ ...data, URLs: links });
  }, [links]);

  return (
    <ElementWrapper provided={provided} item={item} >
      <Box minHeight={"10px"} p={"10px"} sx={{ cursor: "default" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="links">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {links.map((item, index) => (
                  <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <LinkComponent item={item} setLinks={setLinks} />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>

        <TextField
          size="small"
          placeholder="Add URL or web address"
          type="url"
          sx={{ width: "100%", mt: 2 }}
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAddLink} size="small">
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </ElementWrapper>
  );
}

function LinkComponent({ item, setLinks }) {
  const [siteData, setSiteData] = useState({ ...item });

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
    <Link
      sx={{ cursor: "pointer" }}
      href={item.link}
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            height={"15px"}
            width={"15px"}
            src={siteData.favicon}
            alt="favicon"
          />
          <Typography>
            {(item.name || siteData.name || item.link || "").length > 15
              ? `${(item.name || siteData.name || "").slice(0, 15)}...`
              : item.name || siteData.name || ""}
          </Typography>
        </Box>
        <IconButton size="small">
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
      </Box>
    </Link>
    // </Box>
  );
}

export default Bookmark;
