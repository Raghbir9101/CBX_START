// // import { Box, TextField, InputAdornment, IconButton, Checkbox, Typography } from '@mui/material';
// // import React, { useEffect, useLayoutEffect, useState } from 'react';
// // import AddIcon from '@mui/icons-material/Add';
// // import { v4 as uid } from "uuid"

// // function Todo() {
// //     const [tasks, setTasks] = useState([]);
// //     const [newTask, setNewTask] = useState("");
// //     const [completePercentage, setCompletePercentage] = useState(0);

// //     const handleAddTask = (e) => {
// //         setTasks((p) => [...p, {
// //             _id: uid(),
// //             task: newTask,
// //             completed: false
// //         }])
// //         setNewTask("")
// //     }

// //     useEffect(() => {
// //         let completedTasks = tasks.filter(item => item.completed);
// //         let completedTasksPercentage = (completedTasks.length / tasks.length) * 100;
// //         setCompletePercentage(isNaN(completedTasksPercentage) ? 0 : completedTasksPercentage)
// //     }, [tasks])

// //     return (
// //         <Box minHeight={"50px"} p={"10px"}>
// //             <Box display={"flex"} gap={"10px"} alignItems={"center"}>
// //                 <Typography width={"40px"}>
// //                     {completePercentage.toFixed(2)}
// //                 </Typography>
// //                 <Box flex={1} height={"5px"} bgcolor={"#b1b1b1"}>
// //                     <Box sx={{transition:".3s"}} height={"100%"} width={`${completePercentage}%`} bgcolor={"#70fe70"}>

// //                     </Box>
// //                 </Box>
// //             </Box>
// //             {
// //                 tasks.map((item, index) => {
// //                     return <Box key={item._id} display={"flex"} gap={"5px"} alignItems={"center"}>
// //                         <Checkbox checked={item.completed} onChange={(e) => {
// //                             setTasks(p => {
// //                                 let temp = [...p];
// //                                 for (let i = 0; i < temp.length; i++) {
// //                                     if (temp[i]._id == item._id) {
// //                                         temp[i].completed = !temp[i].completed;
// //                                         break
// //                                     }
// //                                 }
// //                                 return temp.sort((a, b) => {
// //                                     return a.completed - b.completed
// //                                 });
// //                             })
// //                         }} />
// //                         <Typography>{item.task || ""}</Typography>
// //                     </Box>
// //                 })
// //             }
// //             <TextField
// //                 size='small'
// //                 placeholder='Add new Task'
// //                 sx={{ width: "100%" }}
// //                 value={newTask}
// //                 onChange={((e) => {
// //                     setNewTask(e.target.value)
// //                 })}
// //                 InputProps={{
// //                     endAdornment: (
// //                         <InputAdornment position="end">
// //                             <IconButton onClick={handleAddTask} size='small'>
// //                                 <AddIcon />
// //                             </IconButton>
// //                         </InputAdornment>
// //                     ),
// //                 }}
// //             />
// //         </Box>
// //     );
// // }

// // export default Todo;


import { Box, TextField, InputAdornment, IconButton, Checkbox, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uid } from "uuid";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function Todo({ data, onChange }) {
    const [tasks, setTasks] = useState(data.tasks || []);
    const [newTask, setNewTask] = useState("");
    const [completePercentage, setCompletePercentage] = useState(0);

    const handleAddTask = () => {
        setTasks((p) => [...p, {
            _id: uid(),
            task: newTask,
            completed: false
        }]);
        setNewTask("");
    };

    const handleDeleteTask = (id) => {
        setTasks((p) => p.filter(task => task._id !== id));
    };

    useEffect(() => {
        const completedTasks = tasks.filter(item => item.completed);
        const completedTasksPercentage = (completedTasks.length / tasks.length) * 100;
        setCompletePercentage(isNaN(completedTasksPercentage) ? 0 : completedTasksPercentage);

        onChange({ ...data, tasks })
    }, [tasks]);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedTasks = Array.from(tasks);
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);
        setTasks(reorderedTasks);
    };

    return (
        <Box minHeight={"50px"} p={"10px"} width={"100%"} >
            <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                <Typography width={"40px"}>
                    {completePercentage.toFixed(2)}
                </Typography>
                <Box flex={1} height={"5px"} bgcolor={"#b1b1b1"}>
                    <Box sx={{ transition: ".3s" }} height={"100%"} width={`${completePercentage}%`} bgcolor={"#70fe70"}>
                    </Box>
                </Box>
            </Box>
            <Box>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                {tasks.map((item, index) => (
                                    <Draggable key={item._id} draggableId={item._id} index={index}>
                                        {(provided) => (
                                            <Box
                                                sx={{ bgcolor: "#f0f0f0" }}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                display={"flex"}
                                                // gap={"5px"}
                                                alignItems={"center"}
                                                justifyContent={"space-between"}
                                                maxWidth={"100%"}
                                            // mb={1}
                                            >
                                                <Box width={"15%"}>
                                                    <Checkbox
                                                        size='small'
                                                        checked={item.completed}
                                                        onChange={() => {
                                                            setTasks(p => {
                                                                let temp = [...p];
                                                                for (let i = 0; i < temp.length; i++) {
                                                                    if (temp[i]._id === item._id) {
                                                                        temp[i].completed = !temp[i].completed;
                                                                        break;
                                                                    }
                                                                }
                                                                return temp.sort((a, b) => a.completed - b.completed);
                                                            });
                                                        }}
                                                    />
                                                </Box>
                                                <Typography whiteSpace={"wrap"} maxWidth={"70%"} sx={{ textWrap: "wrap", overflowWrap: "break-word" }} flex={1}>{item.task || ""}</Typography>
                                                <Box width={"15%"}>
                                                    <IconButton onClick={() => handleDeleteTask(item._id)} size='small'>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
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
                size='small'
                placeholder='Add new Task'
                sx={{ width: "100%", mt: "10px" }}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleAddTask} size='small'>
                                <AddIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

export default Todo;

