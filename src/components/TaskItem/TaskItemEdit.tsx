import {
  Save,
  Close,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { TaskEntry } from "../../types/TaskEntry";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../store/slices/taskSlice";
import { RootState } from "../../store/store";
import { selectTaskLists } from "../../store/slices/taskListSlice";

import { LogEntry } from "../../types/LogEntry";
import { addLog } from "../../store/slices/logSlice";
import { useCreateLogMutation } from "../../store/apiSlices/logsApi";
import { useUpdateTaskMutation } from "../../store/apiSlices/tasksApi";

interface TaskItemEditProps {
  task: TaskEntry;
  onClose: () => void;
}

const TaskItemEdit: FC<TaskItemEditProps> = ({ task,  onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(task.date);
  const [priority, setPriority] = useState(task.priority);
  
	const listnames=useSelector((state:RootState)=>selectTaskLists(state))
	const selectedListInitialValue = listnames.find(list => list.tasks?.includes(task))?.name || '';
	const [selectedList, setSelectedList] = useState(selectedListInitialValue);

  const [editTask] = useUpdateTaskMutation();
  const [addLogS]  = useCreateLogMutation();
  useEffect(() => {
    setName(task.name);
    setDescription(task.description);
    setDate(task.date);
    setPriority(task.priority);
    const selectedListName = listnames.find(list => list.tasks?.includes(task))?.name;
    setSelectedList(selectedListName || '');
  }, [task, listnames]);
	const handleSave = () => {
    const updatedTask: TaskEntry = {
      ...task,
      name,
      description,
      date: new Date(date),
      priority,
      taskListName: selectedList, 
    };
    const logMessage:LogEntry = { message: `Task : ${name} changed`, timestamp: new Date(), primaryWords: [`${name}`] }

    editTask(updatedTask).then(() => updateTask(updatedTask))
    addLogS(logMessage).then(()=>addLog(logMessage));
    onClose(); 
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit the task details below and click "Save" to update.
        </DialogContentText>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            fullWidth
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
          <Select
            label="Add to List"
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
            fullWidth
          >
            {listnames.map((list) => (
              <MenuItem key={list.id} value={list.name}>
                {list.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          <Close /> Close
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained" disabled={!name}>
          <Save /> Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskItemEdit;
