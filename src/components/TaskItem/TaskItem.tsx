import { CalendarToday, Delete, Edit, Lens, MoreVert } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, Chip, ClickAwayListener, IconButton, MenuItem, Popper, Select, Typography } from "@mui/material";
import { blue, green, red, yellow } from "@mui/material/colors";
import { FC, useState } from "react";
import { TaskEntry } from "../../types/TaskEntry";
import TaskItemFull from "../TaskItemFull/TaskItemFull";
import { LogEntry } from "../../types/LogEntry";

import { useSelector } from "react-redux";
import { selectTaskLists } from "../../store/slices/taskListSlice";
import { RootState } from "../../store/store";
import TaskItemEdit from "./TaskItemEdit";
import { useDeleteTaskMutation } from "../../store/apiSlices/tasksApi";
import { useCreateLogMutation } from "../../store/apiSlices/logsApi";
import { deleteTask } from "../../store/slices/taskSlice";
import { addLog } from "../../store/slices/logSlice";

interface TaskItem {
	task: TaskEntry,
	selectList?: string;
}

const TaskItem: FC<TaskItem> = ({ task,selectList }) => {
	const allLists = useSelector((state: RootState) => selectTaskLists(state));
	const listnames= allLists.map(item=>item.name)
	const [openFullTask, setShowFullTask] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	console.log(task)
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [open, setOpen] = useState(false);
	const [deleteTaskApi] = useDeleteTaskMutation();
  const [addLogS]  = useCreateLogMutation();
	const [selectedList, setSelectedList] = useState(selectList || "");

	const formatDate = (getDate: Date | string) => {
    const dateObject = typeof getDate === 'string' ? new Date(getDate) : getDate;
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
    return formatter.format(dateObject);
};
	const showFullTask = () => {
		//use modal and TaskItemFull
		setShowFullTask(!openFullTask)
		console.log('it work 1')
	}
	const showSettings = (event) => {
		event.stopPropagation()
		setAnchorEl(event.currentTarget);
		setOpen(!open)
	}
	const priorityColor = {
		Low: green[500],
		Medium: yellow[500],
		High: red[500],
	}
	const handleEdit = () => {
		setOpenEdit(!openEdit)
	}
	const handleDelete = (task:TaskEntry) => {
    deleteTaskApi(task.id).then(()=>deleteTask(task.id));
    const logMessage:LogEntry = { message: `Delete task: ${task.name}`, timestamp: new Date(), primaryWords: [`${task.listName}`] }
    addLogS(logMessage).then(()=>addLog(logMessage));
  };
	return (
		<Card>
			<CardActionArea sx={{ position: 'relative' }} onClick={() => { showFullTask() }}>
				<CardContent>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }} >
						<Typography variant={"h6"}>{task.name}</Typography>
						<IconButton aria-label="More options" onClick={(event) => showSettings(event)} onMouseDown={event => event.stopPropagation()}><MoreVert /></IconButton>
						<ClickAwayListener onClickAway={(event) => { showSettings(event) }}>
							<Popper open={open} anchorEl={anchorEl} placement='right-start'>
								<ButtonGroup orientation="vertical" variant='contained' >
									<Button onClick={handleEdit} sx={{ backgroundColor: 'white', color: blue[300] }}><Edit /> Edit</Button>
									<Button onClick={handleDelete} sx={{ backgroundColor: 'white', color: blue[300] }}><Delete /> Delete</Button>
								</ButtonGroup>
							</Popper>
						</ClickAwayListener>
					</Box>

					<Typography variant={"body2"} paragraph>{task.description}</Typography>
					<Typography variant={"body2"} paragraph><CalendarToday /> {formatDate(task.date)}</Typography>
					<Chip label={task.priority} variant="outlined" size="small" icon={<Lens color="c" sx={{ color: priorityColor[task.priority] }} />} />
					<Select
						onMouseDown={event => event.stopPropagation()}
						onClick={event => {
							event.stopPropagation();
							event.preventDefault();
						}}
						value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
						labelId="move-to-list"
						id="demo-simple-select"
						sx={{ width: '100%', mt: 1 }}
						size="small"
						label="Move to"
					>
						{listnames.map((item)=><MenuItem >{item}</MenuItem>
						)}
					</Select>
				</CardContent>
			</CardActionArea>
			<TaskItemFull open={openFullTask} onClose={() => setShowFullTask(false)} task={task} />
			{openEdit?(<TaskItemEdit task={task} onClose={()=>setOpenEdit(false)}/>):(<></>)}
			
		</Card >

	)
}
export default TaskItem