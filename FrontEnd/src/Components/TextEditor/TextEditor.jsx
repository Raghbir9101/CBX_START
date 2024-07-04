import React, { useContext, useMemo, useState } from "react";
import ReactDOM from "react-dom";
// import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";
// import "jodit";

const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    //defaultActionOnPaste: "insert_clear_html",
    buttons: ["bold", "italic", "underline" , "ul", "ol", "hr", "fontsize"],
    uploader: {
        insertImageAsBase64URI: false,
    },
    width: "100%",
    maxWidth:"100%",
    height: 400,
};




export default function TextEditor({ data, setData }) {
    const memoizedEditor = useMemo(() => (
        <JoditEditor
                value={data}
                config={{ ...editorConfig }} 
                onChange={(value) => setData(value)}
            />
    ), []);


    return (
        <div
            onClick={(e)=>e.stopPropagation()}
            onDrag={(e)=>e.stopPropagation()}
            onDragStart={(e)=>stopPropagation()}
            style={{ maxWidth: editorConfig.width, margin: "0 auto", width:"100%" }}
        >
            {memoizedEditor}
        </div>
    );
}