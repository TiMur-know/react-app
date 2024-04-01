import React, { FC, useState } from "react";
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
} from "@mui/material";
import { TaskListEntry } from "../../types/TaskListsEntry";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectTaskLists, updateTaskList } from "../../store/slices/taskListSlice";
import TransferList from "./../../components/TransferList/TransferList";
import { useUpdateTaskListMutation } from "../../store/apiSlices/taskListsApi";
import { LogEntry } from "../../types/LogEntry";
import { useCreateLogMutation } from "../../store/apiSlices/logsApi";
import { addLog } from "../../store/slices/logSlice";

interface TaskListEditProps {
  taskList: TaskListEntry;
  onClose: () => void;
}

const TaskListEdit: FC<TaskListEditProps> = ({ taskList, onClose }) => {
  const dispatch = useDispatch();
  const allLists = useSelector((state: RootState) => selectTaskLists(state));
  const [selectedListName, setSelectedListName] = useState(taskList.name);
  const [editedList, setEditedList] = useState<TaskListEntry>({ ...taskList });
  const [selectedTasks, setSelectedTasks] = useState<string[]>(taskList.tasks?.map(item => item.name) || []);
  const [unselectedTasks, setUnselectedTasks] = useState<string[]>(allLists.find(list => list.name === selectedListName)?.tasks?.map(task => task.name) || []);
  
  const [updateTaskListApi] = useUpdateTaskListMutation();
  const [addLogS]  = useCreateLogMutation();


  const handleSave = () => {
    const updatedList: TaskListEntry = { ...editedList, name: selectedListName };
    updateTaskListApi(updatedList).then(() => updateTaskList(updatedList))
    const logMessage:LogEntry = { message: `Changed list name to: ${selectedListName}`, timestamp: new Date(), primaryWords: [`${selectedListName}`] }
    addLogS(logMessage).then(()=>addLog(logMessage));
    onClose();
  };

  const handleListChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newListName = e.target.value as string;
    setSelectedListName(newListName);
    const newList = allLists.find(list => list.name === newListName);
    setSelectedTasks(newList?.tasks?.map(item => item.name) || []);
    setUnselectedTasks(allLists.find(list => list.name === newListName)?.tasks?.map(task => task.name) || []);
  };

  const handleTaskListChange = (newRightItems: string[]) => {
    const newLeftItems = unselectedTasks.filter(task => !newRightItems.includes(task));
    setSelectedTasks(newRightItems);
    setUnselectedTasks(newLeftItems);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Task List</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit the tasks in the task list below.
        </DialogContentText>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Select
            value={selectedListName}
            onChange={handleListChange}
            displayEmpty
            fullWidth
          >
            {allLists.map((list) => (
              <MenuItem key={list.id} value={list.name}>{list.name}</MenuItem>
            ))}
          </Select>
          <TransferList
            leftTitle="From Other List Tasks"
            rightTitle="Contains Tasks"
            leftItems={unselectedTasks}
            rightItems={selectedTasks}
            onChange={handleTaskListChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskListEdit;
