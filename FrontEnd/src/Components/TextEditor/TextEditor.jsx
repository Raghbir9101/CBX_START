// import React, { useContext, useMemo, useState } from "react";
// import ReactDOM from "react-dom";
// // import "jodit/build/jodit.min.css";
// import JoditEditor from "jodit-react";
// // import "jodit";

// const editorConfig = {
//     readonly: false,
//     toolbar: true,
//     spellcheck: true,
//     language: "en",
//     toolbarButtonSize: "medium",
//     toolbarAdaptive: false,
//     showCharsCounter: true,
//     showWordsCounter: true,
//     showXPathInStatusbar: false,
//     askBeforePasteHTML: true,
//     askBeforePasteFromWord: true,
//     //defaultActionOnPaste: "insert_clear_html",
//     buttons: ["bold", "italic", "underline" , "ul", "ol", "hr", "fontsize"],
//     uploader: {
//         insertImageAsBase64URI: false,
//     },
//     width: "100%",
//     maxWidth:"100%",
//     height: 400,
// };




// export default function TextEditor({ data, setData }) {
//     const memoizedEditor = useMemo(() => (
//         <JoditEditor
//                 value={data}
//                 config={{ ...editorConfig }} 
//                 onChange={(value) => setData(value)}
//             />
//     ), []);


//     return (
//         <div
//             onClick={(e)=>e.stopPropagation()}
//             onDrag={(e)=>e.stopPropagation()}
//             onDragStart={(e)=>stopPropagation()}
//             style={{ maxWidth: editorConfig.width, margin: "0 auto", width:"100%" }}
//         >
//             {memoizedEditor}
//         </div>
//     );
// }


import FontDownload from "@mui/icons-material/FontDownload";
import { Box, IconButton, MenuItem } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import CustomSelect from "./CustomSelect";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import FormatUnderlined from "@mui/icons-material/FormatUnderlined";
import FormatStrikethrough from "@mui/icons-material/FormatStrikethrough";
import FormatListNumbered from "@mui/icons-material/FormatListNumbered";
import { CustomCheckFieldIcon } from "./Icons.jsx";
import FormatAlignCenter from "@mui/icons-material/FormatAlignCenter";
import AddLink from "@mui/icons-material/AddLink";
import FormatClear from "@mui/icons-material/FormatClear";
import FormatColorText from "@mui/icons-material/FormatColorText";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import zIndex from "@mui/material/styles/zIndex";


const FormattingOptions = ({ handleHTMLChange }) => {
    const colorRef = useRef(null);
    const fontFamilyRef = useRef(null);
    const fontSizeRef = useRef(null);
    const alignRef = useRef(null);
    const [fontFamily, setFontFamily] = useState("Arial");
    const [fontSize, setFontSize] = useState("3");
    const [align, setAlign] = useState("justifyLeft");
    const [size, setSize] = useState(1)

    const executeCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        let allBoxes = Array.from(document.getElementsByClassName("editableBox"));
        const event = new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true,
            key: "Control",
            code: "ControlLeft",
            keyCode: 17, // Ctrl key code
            which: 17,
            ctrlKey: true,
        });
        allBoxes.forEach((e) => {
            e.dispatchEvent(event);
        });
        handleHTMLChange()
        // editorRef.current.focus();
    };

    const handleColorChange = (event) => {
        executeCommand("foreColor", event.target.value);
        handleHTMLChange()
    };
    const applyFormat = (command, value = null) => {
        document.execCommand(command, false, value);
        handleHTMLChange()
    };
    const insertLink = () => {
        const url = prompt("Enter the URL:");
        if (url) {
            const text = prompt("Enter the text for the link:");
            if (text) {
                // Create the link
                applyFormat(
                    "insertHTML",
                    `<a target="_blank" href="${url}">${text}</a>`
                );
            }
        }
    };

    // Function to change font size
    const handleFontSizeChange = (action) => {
        // Set a placeholder size using execCommand
        let val = size
        if (action == "-1") {
            document.execCommand('fontSize', false, val--);
            if (val <= 1) {
                setSize(1)
            } else {
                setSize(val--)
            }
        } else {
            document.execCommand('fontSize', false, val++);
            if (val >= 7) {
                setSize(7)
            } else {
                setSize(val++)
            }

        }
    };
    const handleFontSizeChang2 = (val) => {
        // Set a placeholder size using execCommand
        document.execCommand('fontSize', false, val);
        setFontSize(val)
        handleHTMLChange()
    };
    // Function to change font family
    const handleFontFamilyChange = (event) => {
        executeCommand("fontName", event.target.value);
        setFontFamily(event.target.value);
        handleHTMLChange()
    };
    const handleAlignChange = (event) => {
        executeCommand(event.target.value);
        setAlign(event.target.value);
        handleHTMLChange()
    };

    let colorInput = useMemo(() => {
        return <input ref={colorRef} type="color" onChange={handleColorChange} />
    }, [])

    return (
        <Box
            display={"flex"}
            sx={{
                backgroundColor: "white",
            }}
            alignItems={"center"}
            gap={"5px"}
            flexWrap={"wrap"}
        >
            {/* <Box>
                <IconButton
                    size="small"
                    onClick={() => {
                        fontFamilyRef.current.click();
                    }}
                >

                    <FontDownload sx={{ fontSize: "14px" }} />
                </IconButton>
                <CustomSelect
                    ref={fontFamilyRef}
                    onChange={handleFontFamilyChange}
                    defaultValue="Arial"
                    value={fontFamily}
                    sx={{ position: "absolute", opacity: "0", zIndex: 0 }}
                >
                    <MenuItem value={""} disabled>
                        Font Family
                    </MenuItem>
                    <MenuItem value="Arial">Arial</MenuItem>
                    <MenuItem value="Verdana">Verdana</MenuItem>
                    <MenuItem value="Helvetica">Helvetica</MenuItem>
                    <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                    <MenuItem value="Courier New">Courier New</MenuItem>
                    <MenuItem value="Georgia">Georgia</MenuItem>
                    <MenuItem value="Palatino">Palatino</MenuItem>
                    <MenuItem value="Garamond">Garamond</MenuItem>
                    <MenuItem value="Bookman">Bookman</MenuItem>
                    <MenuItem value="Comic Sans MS">Comic Sans MS</MenuItem>
                    <MenuItem value="Trebuchet MS">Trebuchet MS</MenuItem>
                    <MenuItem value="Arial Black">Arial Black</MenuItem>
                    <MenuItem value="Impact">Impact</MenuItem>
                    <MenuItem value="Lucida Sans Unicode">Lucida Sans Unicode</MenuItem>
                    <MenuItem value="Tahoma">Tahoma</MenuItem>
                    <MenuItem value="Geneva">Geneva</MenuItem>
                    <MenuItem value="Optima">Optima</MenuItem>
                    <MenuItem value="Monaco">Monaco</MenuItem>
                    <MenuItem value="Bradley Hand">Bradley Hand</MenuItem>
                    <MenuItem value="Brush Script MT">Brush Script MT</MenuItem>
                    <MenuItem value="Luminari">Luminari</MenuItem>
                    <MenuItem value="Chalkduster">Chalkduster</MenuItem>
                    <MenuItem value="Copperplate">Copperplate</MenuItem>
                    <MenuItem value="Papyrus">Papyrus</MenuItem>
                </CustomSelect>
            </Box> */}
            <Box>
                <IconButton size="small"
                >
                    <FormatSizeIcon sx={{ fontSize: "14px" }} />
                    <CustomSelect
                        ref={fontSizeRef}
                        onChange={(e) => {
                            handleFontSizeChang2(e.target.value)
                        }}
                        defaultValue="3"
                        value={fontSize}
                        sx={{ position: "absolute", opacity: "0" }}
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                    </CustomSelect>
                </IconButton>
            </Box>
            <IconButton size="small"
                sx={{ color: "rgb(46, 45, 45)" }}
                onClick={() => executeCommand("bold")}
            >
                <FormatBold sx={{ fontSize: "14px" }} />
            </IconButton>
            <IconButton size="small"
                sx={{ color: "rgb(46, 45, 45)" }}
                onClick={() => executeCommand("italic")}
            >
                <FormatItalic sx={{ fontSize: "14px" }} />
            </IconButton>
            <IconButton size="small"
                sx={{ color: "rgb(46, 45, 45)" }}
                onClick={() => executeCommand("underline")}
            >
                <FormatUnderlined sx={{ fontSize: "14px" }} />
            </IconButton>
            <IconButton size="small"
                sx={{ color: "black" }}
                onClick={() => {
                    executeCommand("strikeThrough");
                }}
            >
                <FormatStrikethrough sx={{ fontSize: "14px" }} />
            </IconButton>
            <IconButton size="small"
                sx={{ color: "rgb(46, 45, 45)" }}
                onClick={() => {
                    colorRef.current.click();
                }}
            >
                <div
                    style={{
                        marginBottom: "10px",
                        opacity: "0",
                        position: "absolute",
                    }}
                >
                    {colorInput}
                    {/* <input ref={colorRef} type="color" onChange={handleColorChange} /> */}
                </div>
                <FormatColorText sx={{ fontSize: "14px" }} />
            </IconButton>
            <IconButton size="small"
                sx={{ color: "rgb(46, 45, 45)" }}
                onClick={() => executeCommand("insertUnorderedList")}
            >
                <FormatListBulleted sx={{ fontSize: "14px" }} />
            </IconButton>
            <IconButton size="small"
                sx={{ color: "rgb(46, 45, 45)" }}
                onClick={() => executeCommand("insertOrderedList")}
            >
                <FormatListNumbered sx={{ fontSize: "14px" }} />
            </IconButton>
        </Box>
    );
};
// const FormattingOptions = () => {
//     const colorRef = useRef(null);
//     const fontFamilyRef = useRef(null);
//     const fontSizeRef = useRef(null);
//     const alignRef = useRef(null);
//     const [fontFamily, setFontFamily] = useState("Arial");
//     const [fontSize, setFontSize] = useState("3");
//     const [align, setAlign] = useState("justifyLeft");
//     const [size, setSize] = useState(1)

//     const executeCommand = (command, value = null) => {
//         document.execCommand(command, false, value);
//         let allBoxes = Array.from(document.getElementsByClassName("editableBox"));
//         const event = new KeyboardEvent("keyup", {
//             bubbles: true,
//             cancelable: true,
//             key: "Control",
//             code: "ControlLeft",
//             keyCode: 17, // Ctrl key code
//             which: 17,
//             ctrlKey: true,
//         });
//         allBoxes.forEach((e) => {
//             e.dispatchEvent(event);
//         });
//         // editorRef.current.focus();
//     };

//     const handleColorChange = (event) => {
//         executeCommand("foreColor", event.target.value);
//     };
//     const applyFormat = (command, value = null) => {
//         document.execCommand(command, false, value);
//     };
//     const insertLink = () => {
//         const url = prompt("Enter the URL:");
//         if (url) {
//             const text = prompt("Enter the text for the link:");
//             if (text) {
//                 // Create the link
//                 applyFormat(
//                     "insertHTML",
//                     `<a target="_blank" href="${url}">${text}</a>`
//                 );
//             }
//         }
//     };

//     // Function to change font size
//     const handleFontSizeChange = (action) => {
//         // Set a placeholder size using execCommand
//         let val = size
//         if (action == "-1") {
//             document.execCommand('fontSize', false, val--);
//             if (val <= 1) {
//                 setSize(1)
//             } else {
//                 setSize(val--)
//             }
//         } else {
//             document.execCommand('fontSize', false, val++);
//             if (val >= 7) {
//                 setSize(7)
//             } else {
//                 setSize(val++)
//             }

//         }
//     };
//     const handleFontSizeChang2 = (val) => {
//         // Set a placeholder size using execCommand
//         document.execCommand('fontSize', false, val);
//         setFontSize(val)
//     };
//     // Function to change font family
//     const handleFontFamilyChange = (event) => {
//         executeCommand("fontName", event.target.value);
//         setFontFamily(event.target.value);
//     };
//     const handleAlignChange = (event) => {
//         executeCommand(event.target.value);
//         setAlign(event.target.value);
//     };
//     return (
//         <Box
//             display={"flex"}
//             sx={{
//                 boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
//                 ml: "10px",
//                 // position: "absolute",
//                 // top: "-40px",
//                 // left: "-300%",
//                 backgroundColor: "white",
//             }}
//             alignItems={"center"}
//             gap={"5px"}
//             flexWrap={"wrap"}
//         >
//             <Box>
//                 <IconButton
//                     onClick={() => {
//                         fontFamilyRef.current.click();
//                     }}
//                 >
//                     <FontDownload />
//                     <CustomSelect
//                         ref={fontFamilyRef}
//                         onChange={handleFontFamilyChange}
//                         defaultValue="Arial"
//                         value={fontFamily}
//                         sx={{ position: "absolute", opacity: "0" }}
//                     >
//                         <MenuItem value={""} disabled>
//                             Font Family
//                         </MenuItem>
//                         <MenuItem value="Arial">Arial</MenuItem>
//                         <MenuItem value="Verdana">Verdana</MenuItem>
//                         <MenuItem value="Helvetica">Helvetica</MenuItem>
//                         <MenuItem value="Times New Roman">Times New Roman</MenuItem>
//                         <MenuItem value="Courier New">Courier New</MenuItem>
//                         <MenuItem value="Georgia">Georgia</MenuItem>
//                         <MenuItem value="Palatino">Palatino</MenuItem>
//                         <MenuItem value="Garamond">Garamond</MenuItem>
//                         <MenuItem value="Bookman">Bookman</MenuItem>
//                         <MenuItem value="Comic Sans MS">Comic Sans MS</MenuItem>
//                         <MenuItem value="Trebuchet MS">Trebuchet MS</MenuItem>
//                         <MenuItem value="Arial Black">Arial Black</MenuItem>
//                         <MenuItem value="Impact">Impact</MenuItem>
//                         <MenuItem value="Lucida Sans Unicode">Lucida Sans Unicode</MenuItem>
//                         <MenuItem value="Tahoma">Tahoma</MenuItem>
//                         <MenuItem value="Geneva">Geneva</MenuItem>
//                         <MenuItem value="Optima">Optima</MenuItem>
//                         <MenuItem value="Monaco">Monaco</MenuItem>
//                         <MenuItem value="Bradley Hand">Bradley Hand</MenuItem>
//                         <MenuItem value="Brush Script MT">Brush Script MT</MenuItem>
//                         <MenuItem value="Luminari">Luminari</MenuItem>
//                         <MenuItem value="Chalkduster">Chalkduster</MenuItem>
//                         <MenuItem value="Copperplate">Copperplate</MenuItem>
//                         <MenuItem value="Papyrus">Papyrus</MenuItem>
//                     </CustomSelect>
//                 </IconButton>
//             </Box>
//             <Box>
//                 <IconButton
//                     onMouseOver={() => {
//                         fontSizeRef.current.click();
//                     }}
//                 >
//                     <FormatSizeIcon />
//                     <CustomSelect
//                         ref={fontSizeRef}
//                         onChange={(e) => {
//                             handleFontSizeChang2(e.target.value)
//                         }}
//                         defaultValue="3"
//                         value={fontSize}
//                         sx={{ position: "absolute", opacity: "0" }}
//                     >
//                         <MenuItem value="1">1</MenuItem>
//                         <MenuItem value="2">2</MenuItem>
//                         <MenuItem value="3">Normal</MenuItem>
//                         <MenuItem value="4">4</MenuItem>
//                         <MenuItem value="5">5</MenuItem>
//                         <MenuItem value="6">6</MenuItem>
//                         <MenuItem value="7">7</MenuItem>
//                     </CustomSelect>
//                 </IconButton>
//             </Box>
//             <IconButton
//                 sx={{ color: "rgb(46, 45, 45)" }}
//                 onClick={() => executeCommand("bold")}
//             >
//                 <FormatBold />
//             </IconButton>
//             <IconButton
//                 sx={{ color: "rgb(46, 45, 45)" }}
//                 onClick={() => executeCommand("italic")}
//             >
//                 <FormatItalic />
//             </IconButton>
//             <IconButton
//                 sx={{ color: "rgb(46, 45, 45)" }}
//                 onClick={() => executeCommand("underline")}
//             >
//                 <FormatUnderlined />
//             </IconButton>
//             <IconButton
//                 sx={{ color: "black" }}
//                 onClick={() => {
//                     executeCommand("strikeThrough");
//                 }}
//             >
//                 <FormatStrikethrough />
//             </IconButton>
//             <IconButton
//                 sx={{ color: "black" }}
//                 onClick={() => {
//                     executeCommand("removeFormat");
//                 }}
//             >
//                 <FormatClear />
//             </IconButton>
//             <IconButton
//                 sx={{ color: "rgb(46, 45, 45)" }}
//                 onClick={() => {
//                     colorRef.current.click();
//                 }}
//             >
//                 <div
//                     style={{
//                         marginBottom: "10px",
//                         opacity: "0",
//                         position: "absolute",
//                     }}
//                 >
//                     <input ref={colorRef} type="color" onChange={handleColorChange} />
//                 </div>
//                 <FormatColorText />
//             </IconButton>
//             <IconButton
//                 sx={{ color: "rgb(46, 45, 45)" }}
//                 onClick={() => executeCommand("insertUnorderedList")}
//             >
//                 <FormatListBulleted />
//             </IconButton>
//             <IconButton
//                 sx={{ color: "rgb(46, 45, 45)" }}
//                 onClick={() => executeCommand("insertOrderedList")}
//             >
//                 <FormatListNumbered />
//             </IconButton>
//             <IconButton
//                 onClick={() => {
//                     setDetails((prev) => [
//                         ...prev,
//                         {
//                             value: "",
//                             type: "checkbox",
//                             checked: false,
//                             nested: null,
//                         },
//                     ]);
//                 }}
//                 title="Add Checkbox Field"
//             >
//                 <CustomCheckFieldIcon create />
//             </IconButton>
//             <Box>
//                 <IconButton
//                     onClick={() => {
//                         fontFamilyRef.current.click();
//                     }}
//                 >
//                     <FormatAlignCenter />
//                     <CustomSelect
//                         ref={alignRef}
//                         value={align}
//                         onChange={handleAlignChange}
//                         sx={{ position: "absolute", opacity: "0" }}
//                     >
//                         <MenuItem value={"justifyLeft"}>Left</MenuItem>
//                         <MenuItem value="justifyCenter">Center</MenuItem>
//                         <MenuItem value="justifyRight">Right</MenuItem>
//                         <MenuItem value="justifyFull">Justify</MenuItem>
//                     </CustomSelect>
//                 </IconButton>
//             </Box>
//             <IconButton onClick={insertLink}>
//                 <AddLink />
//             </IconButton>
//         </Box>
//     );
// };

export { FormattingOptions };


export default function TextEditor({ data, setData }) {
    const ref = useRef(null)
    const handleHTMLChange = () => {
        if (ref.current) {
            setData(ref.current.innerHTML || "")
        }
    }
    return <Box>
        <Box  overflow={"auto"} display={"flex"}>
            <Box flex={1} maxHeight={"50vh"} minHeight={"100px"} ref={ref} onKeyUp={(e) => setData(e.target.innerHTML || "")} spellCheck={"false"} dangerouslySetInnerHTML={{ __html: data }} className="textEditor" contentEditable="true" sx={{ outline: "none", minHeight: "100px", cursor: "text" }}>

            </Box>
        </Box>
        <FormattingOptions handleHTMLChange={handleHTMLChange} />
    </Box>

}