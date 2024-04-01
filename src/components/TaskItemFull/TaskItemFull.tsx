import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemIcon,ListItemText, Typography } from "@mui/material"
import { TaskEntry } from "../../types/TaskEntry"
import { LogEntry } from "../../types/LogEntry"
import { FC, useState } from "react"
import { Adjust, CalendarToday, Close, Edit, LocalOffer } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { selectLogs } from "../../store/slices/logSlice";
import TaskItemEdit from "../TaskItem/TaskItemEdit";
interface FullTaskItem {
	open: boolean;
	onClose: () => void;
	task: TaskEntry;
}
const TaskItemFull: FC<FullTaskItem> = ({ open, onClose, task }) => {
	const [openEdit,setOpenEdit]=useState(false)
	const logs = useSelector(selectLogs).filter(item => item.task_ids.includes(task.id))
	const handleEdit = () => {
		setOpenEdit(!openEdit)
	}
	const formatTimestamp = (timestamp: Date) => {
		const dateObject = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
		const formatter = new Intl.DateTimeFormat('en-US', {
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric'
		});
		return formatter.format(dateObject);
}
	const formatDate = (getDate: Date | string) => {
    const dateObject = typeof getDate === 'string' ? new Date(getDate) : getDate;
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
    return formatter.format(dateObject);
};
	const formatMessage = (log: LogEntry) => {
		let message = log.message;

		if (log.primaryWords) {
			log.primaryWords.forEach((word, index) => {
				message = message.replace(`{primary[${index}]}`, `<span style=" font-weight: 800;">${word}</span>`);
			});
		}
		if (log.secondaryWords) {
			log.secondaryWords.forEach((word, index) => {
				message = message.replace(`{secondary[${index}]}`, `<span  font-weight: 700;">${word}</span>`);
			});
		}

		return <span dangerouslySetInnerHTML={{ __html: message }} />;
	}
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle sx={{ display: 'flex', justifyContent: 'end', background: blue[400] }} >
				<IconButton onClick={onClose}>
					<Close sx={{ color: "white" }} />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={8}>
						<Box display={'flex'}>
							<Typography variant="h6">{task.name}</Typography>
							<Button onClick={handleEdit} variant="outlined" sx={{ m: 1, display: 'flex' }} size="small"><Edit />Edit task</Button>
						</Box>
						<List dense={true}>
							<ListItem>
								<ListItemIcon>
									<Adjust />
								</ListItemIcon>
								<ListItemText primary="List Name" secondary={task.taskListName} />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CalendarToday />
								</ListItemIcon>
								<ListItemText primary="Due Date" secondary={formatDate(task.date)} />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<LocalOffer />
								</ListItemIcon>
								<ListItemText primary="Priority" secondary={task.priority} />
							</ListItem>
						</List>
						<Typography variant="h6">Description</Typography>
						<Typography variant="body2">{task.description}</Typography>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Typography variant="subtitle1">Activity Logs</Typography>
						<List dense={true}>
							{logs.map((log) => (
								<ListItem >
									<ListItemText primary={formatMessage(log)} secondary={formatTimestamp(log.timestamp)} />
								</ListItem>
							))}
						</List>
					</Grid>
				</Grid>
			</DialogContent>
			{openEdit?(<TaskItemEdit task={task} onClose={()=>setOpenEdit(false)}/>):(<></>)}					
		</Dialog>
	)
}
export default TaskItemFull