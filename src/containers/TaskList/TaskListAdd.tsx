import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskList } from "../../store/slices/taskListSlice";
import { TaskListEntry } from "../../types/TaskListsEntry";
import { addLog } from "../../store/slices/logSlice";


interface TaskListViewAddProps {
  onClose: () => void;
}

const TaskListViewAdd: FC<TaskListViewAddProps> = ({ onClose }) => {
  const [listName, setListName] = useState("");
  const dispatch = useDispatch();

  const handleSave = async() => {
    const newList: TaskListEntry = {
      name: listName,
      tasks: []
    };
    dispatch(addTaskList(newList));
    dispatch(addLog({ message: `Added new task list: ${listName}`,timestamp:new Date(),primaryWords:[`${listName}`] }));
    
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add New List</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the name for the new task list below.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          fullWidth
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Add List
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskListViewAdd;
