

import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  Typography,
  Input,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uid } from "uuid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ElementWrapper } from "../Page/Page";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import Save from "@mui/icons-material/Save";

function Todo({ data, onChange, provided, item, handleDelete }) {
  const [tasks, setTasks] = useState(data.tasks || []);
  const [newTask, setNewTask] = useState("");
  const [completePercentage, setCompletePercentage] = useState(0);
  const [collapsed, setCollapsed] = useState(data?.collapsed);
  const handleAddTask = () => {
    setTasks((prev) => [
      ...prev,
      {
        _id: uid(),
        task: newTask,
        completed: false,
      },
    ]);
    setNewTask("");
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  useEffect(() => {
    const completedTasks = tasks.filter((item) => item.completed);
    const completedTasksPercentage =
      (completedTasks.length / tasks.length) * 100;
    setCompletePercentage(
      isNaN(completedTasksPercentage) ? 0 : completedTasksPercentage
    );

    onChange({ ...data, tasks, collapsed });
  }, [tasks, collapsed]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(reorderedTasks);
  };

  function EditableNote({ value = "", completed, onChange, item }) {
    const [readOnly, setReadOnly] = useState(true);
    const ref = useRef(null);


    return (
      <>
        <Tooltip title={value.length > 14 ? value : ""} arrow>
          <Typography
            onDoubleClick={() => setReadOnly(false)}
            contentEditable={!readOnly}
            style={{ textDecoration: completed ? "line-through" : "none" }}
            whiteSpace={"wrap"}
            maxWidth={"70%"}
            sx={{
              textWrap: "nowrap",
              outline: "none",
              cursor: readOnly ? "drag" : "text",
              overflow: "hidden",
            }}
            flex={1}
            ref={ref}
            // title={value || ""}
          >
            {value || ""}
            {/* {truncatedValue} */}
          </Typography>
        </Tooltip>

        <Box display={"flex"}>
          <IconButton
            onClick={() => {
              
              if (readOnly) {
                setReadOnly(false);
              } else {
                setReadOnly(true);
                if (ref.current) {
                  onChange(ref.current.textContent);
                }
              }
            }}
            size="small"
          >
            {readOnly ? (
              <svg
                width="16"
                height="17"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.9568 5.27285C17.3877 4.84215 17.6297 4.25795 17.6298 3.64877C17.6299 3.03959 17.3879 2.45533 16.9573 2.02452C16.5266 1.59371 15.9424 1.35164 15.3332 1.35156C14.724 1.35149 14.1398 1.59341 13.709 2.02411L2.83435 12.9013C2.64516 13.09 2.50525 13.3222 2.42693 13.5776L1.35055 17.1238C1.3295 17.1943 1.3279 17.2691 1.34595 17.3404C1.364 17.4117 1.40101 17.4768 1.45306 17.5288C1.5051 17.5807 1.57025 17.6176 1.64157 17.6356C1.7129 17.6535 1.78775 17.6518 1.85819 17.6306L5.40511 16.555C5.66029 16.4774 5.89251 16.3384 6.08141 16.1501L16.9568 5.27285Z"
                  stroke="#79797E"
                  stroke-width="1.01852"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.9243 3.79688L15.1836 7.05621"
                  stroke="#79797E"
                  stroke-width="1.01852"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <SaveIcon sx={{ fontSize: "18px" }} />
            )}
          </IconButton>
          <IconButton onClick={() => handleDeleteTask(item._id)} size="small">
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
      </>
    );
  }

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.data.name || "");

  function ActionButtons() {
    return <>
      <IconButton onClick={() => {
        setEditing(p => !p)
        onChange({  ...data, tasks, name:title })
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
    </>
  }
  return (
    <ElementWrapper   collapsed={data?.collapsed} setCollapsed={setCollapsed} handleTitleChange={(val) => setTitle(val)} ActionButtons={ActionButtons} editing={editing}  handleDelete={handleDelete}
      provided={provided}
      item={item}
    >
      <Box minHeight={"50px"} p={"10px"} width={"100%"}>
        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
          <Box
            flex={1}
            height={"30px"}
            bgcolor={"rgba(240,240,240)"}
            borderRadius={"30px"}
            position={"relative"}
          >
            <Typography
              style={{ mixBlendMode: "difference" }}
              width={"100%"}
              height={"100%"}
              position={"absolute"}
              color={"#65772a"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {completePercentage.toFixed(2)}%
            </Typography>
            <Box
              sx={{ transition: ".3s" }}
              overflow={"hidden"}
              height={"100%"}
              borderRadius={"30px"}
              width={`${completePercentage}%`}
              bgcolor={"#B4D33B"}
            ></Box>
          </Box>
        </Box>
        <Box mt={"20px"}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
                >
                  {tasks.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          maxWidth={"100%"}
                        >
                          <Box
                            width={"20%"}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <DragIndicatorOutlinedIcon
                              sx={{ width: "16px", height: "16px" }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => {
                                setTasks((prev) => {
                                  let temp = [...prev];
                                  for (let i = 0; i < temp.length; i++) {
                                    if (temp[i]._id === item._id) {
                                      temp[i].completed = !temp[i].completed;
                                      break;
                                    }
                                  }
                                  return temp.sort(
                                    (a, b) => a.completed - b.completed
                                  );
                                });
                              }}
                            >
                              {item.completed ? (
                                <svg
                                  width="17"
                                  height="18"
                                  viewBox="0 0 17 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="0.314453"
                                    y="0.827148"
                                    width="16.2963"
                                    height="16.2963"
                                    rx="3.05556"
                                    fill="#B4D33B"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="17"
                                  height="18"
                                  viewBox="0 0 17 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="0.823712"
                                    y="1.28074"
                                    width="15.2778"
                                    height="15.2778"
                                    rx="2.5463"
                                    stroke="#989696"
                                    strokeWidth="1.01852"
                                  />
                                </svg>
                              )}
                            </IconButton>
                          </Box>
                          <EditableNote
                            onChange={(newValue) => {
                              setTasks((prev) => {
                                let temp = [...prev];
                                for (let i = 0; i < temp.length; i++) {
                                  if (temp[i]._id === item._id) {
                                    temp[i].task = newValue;
                                    break;
                                  }
                                }
                                return temp;
                              });
                            }}
                            item={item}
                            completed={item.completed}
                            value={item.task}
                          />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
        <TextField
          size="small"
          placeholder="Add new Task"
          sx={{ width: "100%", mt: "10px" }}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAddTask} size="small">
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

export default Todo;
