

import { Box, TextField, InputAdornment, IconButton, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uid } from "uuid"
import HTTP from '../../HTTP';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';



function isValidURL(url) {
    const regex = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-zA-Z0-9$-_@.&+!*\'(),]|(\\:[0-9]+))+\\.)+[a-zA-Z]{2,})' + // domain name and extension
        '(\\/[a-zA-Z0-9$-_@.&+!*\'(),]*)*' + // path
        '(\\?[a-zA-Z0-9$-_@.&+!*\'(),]*)?' + // query string
        '(\\#[a-zA-Z0-9$-_@.&+!*\'(),]*)?$'  // fragment locator
    );

    return regex.test(url);
}

function Bookmark({ data, onChange }) {
    const [links, setLinks] = useState(data.URLs || []);
    const [newLink, setNewLink] = useState("");

    const handleAddLink = () => {
        let tempNewLink = formatURL(newLink);
        if (!isValidURL(tempNewLink)) return alert("Please enter a valid url!");
        setLinks((p) => [...p, {
            _id: uid(),
            link: tempNewLink,
        }]);
        setNewLink("");
    };

    const formatURL = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
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
        onChange({ ...data, URLs: links })
    }, [links])

    return (
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
                size='small'
                placeholder='Add URL or web address'
                type='url'
                sx={{ width: "100%" }}
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleAddLink} size='small'>
                                <AddIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

function LinkComponent({ item, setLinks }) {
    const [siteData, setSiteData] = useState({ ...item });

    useEffect(() => {
        if (item.favicon && item.name) return;
        HTTP.post("getSiteData", { url: item.link })
            .then(res => {
                // console.log(res.data)
                setLinks(p => {
                    let temp = [...p];
                    for (let i = 0; i < temp.length; i++) {
                        if (item._id == temp[i]._id) {
                            temp[i] = {
                                ...item,
                                ...res.data
                            }
                            return temp;
                        }
                    }
                })
                setSiteData(res.data);
            });

    }, [item.link]);



    return (
        <Link
            sx={{ cursor: "pointer" }}
            href={item.link}
            target={"_blank"}
            title={`${siteData.name || ""},\n${siteData.description || ""}`}
            display={"flex"}
            gap={"5px"}
            alignItems={"center"}
        >
            <img
                height={"15px"}
                width={"15px"}
                // src={item.favicon || siteData.favicon || ""}
                src={siteData.favicon}
                // onError={(e) => e.target.src = `https://s2.googleusercontent.com/s2/favicons?domain=${item.link}&size=30px`}
                // onLoad={(e) => {
                //     setLinks(p => {
                //         let temp = [...p];
                //         for (let i = 0; i < temp.length; i++) {
                //             if (item._id == temp[i]._id) {
                //                 temp[i] = {
                //                     ...item,
                //                     // ...siteData,
                //                     favicon: e.target.src,
                //                 }
                //                 return temp;
                //             }
                //         }
                //     })
                // }}
                alt="favicon"
            />
            <Typography>
                {(item.name || siteData.name || item.link || "").length > 25 ? `${(item.name || siteData.name || "").slice(0, 25)}...` : (item.name || siteData.name || "")}
            </Typography>
        </Link>
    );
}

export default Bookmark;
