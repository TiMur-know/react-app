import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskList } from "../../store/slices/taskListSlice";
import { TaskListEntry } from "../../types/TaskListsEntry";
import { addLog } from "../../store/slices/logSlice";
import { useCreateTaskListMutation } from "../../store/apiSlices/taskListsApi";
import { LogEntry } from "../../types/LogEntry";
import { useCreateLogMutation } from "../../store/apiSlices/logsApi";


interface TaskListViewAddProps {
  onClose: () => void;
}

const TaskListViewAdd: FC<TaskListViewAddProps> = ({ onClose }) => {
  const [addList, {isLoading, error} ] = useCreateTaskListMutation();
  const [addLogS]  = useCreateLogMutation();
  const [listName, setListName] = useState("");
  const dispatch = useDispatch();

  const handleSave = () => {
    const newList: TaskListEntry = {
      name: listName,
      tasks: []
    };
    /*
    dispatch(addTaskList(newList));
    dispatch(addLog({ message: `Added new task list: ${listName}`,timestamp:new Date(),primaryWords:[`${listName}`] }));*/

    addList(newList).then(() => addTaskList(newList))
    const logMessage:LogEntry = { message: `Added new task list: ${listName}`, timestamp: new Date(), primaryWords: [`${listName}`] }
    addLogS(logMessage).then(()=>addLog(logMessage));
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
          error={error}
        />
        {isLoading && <p>Adding list...</p>}
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
