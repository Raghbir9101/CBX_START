
import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

function HorizontalResizableDiv({ columnId, onResize }) {
    const ref = useRef(null);
    const [startX, setStartX] = useState(null);
    const [parentStartWidth, setParentRefStartWidth] = useState(null);
    const [startWidth, setStartWidth] = useState(null);
    const [resizing, setResizing] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (resizing) {
                const domElement = document.getElementById(columnId);

                const mouseMoved = event.clientX - startX;
                const newWidth = startWidth + mouseMoved;

                domElement.style.width = `${newWidth}px`;
            }
        };

        const handleMouseUp = (event) => {
            // const domElements = document.getElementsByClassName(field);
            const domElement = document.getElementById(columnId);
            setResizing(false);
            const mouseMoved = event.clientX - startX;
            const newParentWidth = parentStartWidth + mouseMoved;
            domElement.style.width = `${newParentWidth}px`;

            document.body.style.userSelect = "unset"
            // domElement.classList.remove("hideChildrens")
            ref.current.classList.remove("resizeLineShow")
            onResize(`${newParentWidth}px`)
        };

        if (resizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [resizing, startX, startWidth]);

    const handleMouseDown = (event) => {
        const domElement = document.getElementById(columnId);

        setStartX(event.clientX);
        setStartWidth(domElement.offsetWidth);
        setParentRefStartWidth(domElement.offsetWidth);
        setResizing(true);
        document.body.style.userSelect = "none"
        ref.current.classList.add("resizeLineShow")

    };

    return (

        <Box ref={ref} className="resizeLine" height={"100%"} borderRight={"3px dotted gray"} bgcolor="transparent" position={"absolute"} right={"-10px"} sx={{ cursor: "col-resize", width: "10px" }} onDrag={(e) => e.preventDefault()} onMouseDown={handleMouseDown} draggable={false}>

        </Box>
    );
}

export default HorizontalResizableDiv;
