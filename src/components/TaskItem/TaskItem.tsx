import { CalendarToday, Delete, Edit, Lens, MoreVert } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, Chip, ClickAwayListener, IconButton, MenuItem, Popper, Select, Typography } from "@mui/material";
import { blue, green, red, yellow } from "@mui/material/colors";
import { FC, useState } from "react";
import { TaskEntry } from "../../types/TaskEntry";
import TaskItemFull from "../TaskItemFull/TaskItemFull";
import { LogEntry } from "../../types/LogEntry";

interface TaskItem {
	task: TaskEntry
}


const TaskItem: FC<TaskItem> = ({ task }) => {
	const [openFullTask, setShowFullTask] = useState(false)
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [open, setOpen] = useState(false);
	const formatDate = (getDate: Date) => {
		const formatter = new Intl.DateTimeFormat('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
		});
		return formatter.format(getDate);
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

	}
	const handleDelete = () => {

	}
	const logs: LogEntry[] = []
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
						labelId="move-to-list"
						id="demo-simple-select"
						sx={{ width: '100%', mt: 1 }}
						size="small"
						label="Move to"
					// Replace  with actual list data and potentially a loading indicator
					>
						<MenuItem >List 1</MenuItem>
						<MenuItem >List 1</MenuItem>
						<MenuItem >List 1</MenuItem>
					</Select>
				</CardContent>
			</CardActionArea>
			<TaskItemFull open={openFullTask} onClose={() => setShowFullTask(false)} task={task} logs={logs} />
		</Card >

	)
}
export default TaskItem