import { Box, Button, ButtonGroup, ClickAwayListener, IconButton, Popper, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { blue } from "@mui/material/colors";
import { TaskListEntry } from "../../types/TaskListsEntry";
import { TaskEntry } from "../../types/TaskEntry";
import TaskItem from "../../components/TaskItem/TaskItem";
import TaskItemAdd from "../../components/TaskItem/TaskItemAdd";
import TaskListEdit from "./TaskListEdit";
import { MoreVert } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deleteTaskList } from "../../store/slices/taskListSlice";

import { deleteTask, selectTasks } from "../../store/slices/taskSlice";
import { addLog } from "../../store/slices/logSlice";
import { LogEntry } from "../../types/LogEntry";
import { useCreateLogMutation } from "../../store/apiSlices/logsApi";
import { useDeleteTaskListMutation } from "../../store/apiSlices/taskListsApi";

interface TaskListProps {
  list: TaskListEntry;
}

const TaskList: FC<TaskListProps> = ({ list }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const [deleteTaskListApi] = useDeleteTaskListMutation();
  const [addLogS]  = useCreateLogMutation();

  const showSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleAddTask = () => {
    setAddOpen(true);
  };

  const handleEditList = () => {
    setEditOpen(!editOpen);
    setOpen(false);
  };

  const handleDeleteList = (list:TaskListEntry) => {
    deleteTaskListApi(list.id).then(()=>deleteTaskList(list.id));
    const logMessage:LogEntry = { message: `Delete task list: ${list.name}`, timestamp: new Date(), primaryWords: [`${list.name}`] }
    addLogS(logMessage).then(()=>addLog(logMessage));
  };

  return (
    <Box sx={{ width: '100%', mb: 1 }}>
      <Stack spacing={2}>
        <Box sx={{ borderBottom: '1px solid #ccc', borderTop: '1px solid #ccc', display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">{list.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 1 }}>12</Typography>
            <IconButton onClick={showSettings}><MoreVert /></IconButton>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Popper open={open} anchorEl={anchorEl} placement='right-start'>
                <ButtonGroup orientation="vertical" variant='contained' >
                  <Button onClick={handleAddTask} sx={{ backgroundColor: 'white', color: blue[500] }}>Add new Task</Button>
                  <Button onClick={handleEditList} sx={{ backgroundColor: 'white', color: blue[500] }}>Edit</Button>
                  <Button onClick={handleDeleteList} sx={{ backgroundColor: 'white', color: blue[500] }}>Delete</Button>
                </ButtonGroup>
              </Popper>
            </ClickAwayListener>
          </Box>
        </Box>
        <Button variant={"outlined"} sx={{ width: '100%' }} onClick={handleAddTask}>Add new task</Button>
        {list.tasks && list.tasks.length > 0 ? (
          list.tasks.map((task: TaskEntry, index) => (
            <TaskItem key={index} task={task} selectList={list.name}></TaskItem>
          ))
        ) : (
          <Box sx={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
            <Typography variant="body1">No tasks yet</Typography>
          </Box>
        )}
        {addOpen && (
          <TaskItemAdd
            onClose={() => setAddOpen(false)}
            selectList={list.name}
          />
        )}
        {editOpen && (
          <TaskListEdit
            taskList={list}
            onClose={() => setEditOpen(false)}
          />
        )}
      </Stack>
    </Box>
  );
};

export default TaskList;
