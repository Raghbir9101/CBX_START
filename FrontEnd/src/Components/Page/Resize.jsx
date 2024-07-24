import { Box, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

function HorizontalResizableDiv({ columnId, onResize }) {
  const ref = useRef(null);
  const btnRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [parentStartWidth, setParentRefStartWidth] = useState(null);
  const [startWidth, setStartWidth] = useState(null);
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (resizing) {
        const domElement = document.getElementById(columnId);

        const mouseMoved = event.clientX - startX;
        let newWidth = startWidth + mouseMoved;
        if (newWidth < 200) {
          newWidth = 200;
        }
        if (newWidth > 800) {
          newWidth = 800;
        }
        domElement.style.width = `${newWidth}px`;
      }
    };

    const handleMouseUp = (event) => {
      // const domElements = document.getElementsByClassName(field);
      ref.current.classList.remove("resizeLineShow");
      const domElement = document.getElementById(columnId);
      setResizing(false);
      const mouseMoved = event.clientX - startX;
      let newParentWidth = parentStartWidth + mouseMoved;
      if (newParentWidth < 200) {
        newParentWidth = 200;
      }
      if (newParentWidth > 800) {
        newParentWidth = 800;
      }
      domElement.style.width = `${newParentWidth}px`;

      document.body.style.userSelect = "unset";
      // domElement.classList.remove("hideChildrens")
      onResize(`${newParentWidth}px`);
    };


    if (resizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, startX, startWidth]);

  const handleMouseDown = (event) => {
    const domElement = document.getElementById(columnId);

    setStartX(event.clientX);
    setStartWidth(domElement.offsetWidth);
    setParentRefStartWidth(domElement.offsetWidth);
    setResizing(true);
    document.body.style.userSelect = "none";
    ref.current.classList.add("resizeLineShow");
  };

  return (
    <Box
      ref={ref}
      className="resizeLine"
      height={"100%"}
      borderRight={"2px solid #B4D33B"}
      bgcolor="transparent"
      position={"absolute"}
      right={"-15px"}
      sx={{ cursor: "col-resize", width: "20px" }}
      onDrag={(e) => e.preventDefault()}
      onMouseDown={handleMouseDown}
      draggable={false}
      onMouseMove={(e) => {
        const box = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - box.left;
        const offsetY = e.clientY - box.top;
        btnRef.current.style.top = `${offsetY - btnRef.current.offsetHeight / 2}px`
      }}
    >
      <Box sx={{ position: "absolute", width:"10px", height:"10px", right: 0, top: "0", transform: `translate(50%, 0%)`, bgcolor: "#B4D33B", borderRadius: "50%" }}>

      </Box>
      <Box sx={{ position: "absolute", width:"10px", height:"10px", right: 0, bottom: "0", transform: `translate(50%, 0%)`, bgcolor: "#B4D33B", borderRadius: "50%" }}>

      </Box>
      <IconButton ref={btnRef} size="small" sx={{ cursor: "col-resize", position: "absolute", right: 0, top: "30%", transform: `translate(50%, 0%)`, bgcolor: "white", "&:hover": { bgcolor: "white" } }}>
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.8151 1.54199L1.26855 5.17992L3.8151 8.81784" stroke="black" stroke-width="1.25727" stroke-linecap="round" />
          <path d="M8.54427 1.54199L11.0908 5.17992L8.54427 8.81784" stroke="black" stroke-width="1.25727" stroke-linecap="round" />
        </svg>
      </IconButton>
    </Box>
  );
}

export default HorizontalResizableDiv;
