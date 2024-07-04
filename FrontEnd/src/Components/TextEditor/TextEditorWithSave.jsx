import React, { useEffect, useState } from 'react'
import TextEditor from './TextEditor';
import { Box, Button } from '@mui/material';

function TextEditorWithSave({ data: parentData, onChange }) {
    const [data, setData] = useState(parentData.html || "");
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (editing) return;
        onChange({ ...parentData, html: data })
    }, [editing])
    return (
        <div>
            {editing && <TextEditor data={data} setData={setData} />}
            {!editing && <Box sx={{ cursor: "default", padding: "10px", wordWrap: "break-word", overflowWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: data }}></Box>}
            <Box sx={{ cursor: "default" }}>
                {editing && <Button onClick={() => setEditing(false)}>Save</Button>}
                {!editing && <Button onClick={() => setEditing(true)}>Edit</Button>}
            </Box>
        </div>
    )
}

export default TextEditorWithSave;