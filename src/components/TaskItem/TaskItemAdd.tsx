import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField
} from "@mui/material";
import { FC, useState } from "react";
import { TaskEntry } from "../../types/TaskEntry";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../store";
import { AddCircleOutline } from "@mui/icons-material";
import { addTaskToTaskList, selectTaskLists } from "../../store/slices/taskListSlice";
import { addTask } from "../../store/slices/taskSlice";
import { LogEntry } from "../../types/LogEntry";
import { addLog } from "../../store/slices/logSlice";

interface TaskItemAddProps {
  onClose: () => void;
  selectList?: string;
}

const TaskItemAdd: FC<TaskItemAddProps> = ({ onClose, selectList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [priority, setPriority] = useState("Low");
  const [selectedList, setSelectedList] = useState(selectList || "");
  const allLists = useSelector((state: RootState) => selectTaskLists(state));
	const dispatch = useDispatch();
	console.log(date)
  const handleSave = () => {
    const newTask: TaskEntry = {
      name,
      description,
      date: new Date(date),
      priority,
      taskListName: selectedList,
    };
		const logEntry: LogEntry = {
			timestamp: new Date(),
			message: `Task "${newTask.name}" added.`,
			primaryWords: [newTask.name],
		};
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the details of the new task below.
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
          <TextField
            label="Priority"
            select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            fullWidth
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
          <TextField
            label="List"
            select
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
            fullWidth
          >
            {allLists.map((list) => (
              <MenuItem key={list.id} value={list.name}>
                {list.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          <AddCircleOutline /> Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskItemAdd;
