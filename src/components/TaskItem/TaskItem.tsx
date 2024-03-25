import { Box, Card, Chip, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { FC } from "react"
import { Task } from "../../types/Task";
import { CalendarToday, Lens, MoreVert } from "@mui/icons-material";
import { green, red, yellow } from "@mui/material/colors";


interface TaskItem {
	task: Task
}
const formatDate = (getDate: Date) => {
	const formatter = new Intl.DateTimeFormat('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
	});
	return formatter.format(getDate);
};
const TaskItem: FC<TaskItem> = ({ task }) => {

	const priorityColor = {
		Low: green[500],
		Medium: yellow[500],
		High: red[500],
	}
	return (
		<Card sx={{ p: 2, position: 'relative' }} >
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }}>

				<Typography variant={"h6"}>{task.name}</Typography>
				<IconButton aria-label="More options" ><MoreVert /></IconButton>
			</Box>
			<Typography variant={"body2"} paragraph>{task.description}</Typography>

			<Typography variant={"body2"} paragraph><CalendarToday /> {formatDate(task.date)}</Typography>
			<Chip label={task.priority} variant="outlined" size="small" icon={<Lens color="c" sx={{ color: priorityColor[task.priority] }}/>} />
			<Select
				labelId="move-to-label"
				id="demo-simple-select"
				sx={{ width: '100%', mt: 1 }}
				size="small"
				label="Move to"
			>
				<MenuItem >List 1</MenuItem>
				<MenuItem >List 1</MenuItem>
				<MenuItem >List 1</MenuItem>
			</Select>
		</Card >
	)
}
export default TaskItem