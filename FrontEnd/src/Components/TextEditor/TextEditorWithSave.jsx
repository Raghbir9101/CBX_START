import React, { useEffect, useMemo, useState } from 'react'
import TextEditor from './TextEditor';
import { Box, Button, IconButton } from '@mui/material';
import { ElementWrapper } from '../Page/Page';
import Save from '@mui/icons-material/Save';

function TextEditorWithSave({ data: parentData, onChange, provided, item, handleDelete }) {
    const [data, setData] = useState(parentData.html || "");
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(item.data.name || "");
    const [collapsed, setCollapsed] = useState(parentData?.collapsed);
    // useEffect(() => {
    //     if (editing) return;
    //     onChange({ ...parentData, html: data })
    // }, [editing])
    function ActionButtons() {
        return <>
            <IconButton onClick={() => {
                setEditing(p => !p);
                onChange({ ...parentData, name:title, html: data })
            }} size="small">
                {!editing ? <svg
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
                </svg> : <Save sx={{ fontSize: "18px" }} />}
            </IconButton>
            {/* <IconButton size="small">
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
            </IconButton> */}
        </>
    }

    const texteditor = useMemo(() => {
        return <TextEditor data={data} setData={(val) => {
            setData(val)
        }} provided={provided} item={item} />
    }, [parentData])

 

    useEffect(() => {
        onChange({ collapsed });
      }, [collapsed]);
    

    return (
        <ElementWrapper  collapsed={parentData?.collapsed} setCollapsed={setCollapsed} handleDelete={handleDelete} provided={provided} item={item} ActionButtons={ActionButtons} handleTitleChange={(val) => setTitle(val)} editing={editing} >
            <div>
                {editing && texteditor}
                {!editing && <Box className="textEditor" sx={{ cursor: "default", padding: "10px", wordWrap: "break-word", overflowWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: data }}></Box>}
            </div>
        </ElementWrapper>
    )
}

export default TextEditorWithSave;