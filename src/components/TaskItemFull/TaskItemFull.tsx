import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material"
import { TaskEntry } from "../../types/TaskEntry"
import { LogEntry } from "../../types/LogEntry"
import { FC } from "react"
import { Adjust, CalendarToday, Close, Edit, LocalOffer } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
interface FullTaskItem {
	open: boolean;
	onClose: () => void;
	task: TaskEntry;
	logs: LogEntry[];
}
const TaskItemFull: FC<FullTaskItem> = ({ open, onClose, task, logs }) => {
	const handleEdit = () => {

	}
	const formatTimestamp = (timestamp: Date) => {
		const formatter = new Intl.DateTimeFormat('en-US', {
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		});
		return formatter.format(timestamp);
	}
	const formatDate = (getDate: Date) => {
		const formatter = new Intl.DateTimeFormat('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
		});
		return formatter.format(getDate);
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
									<ListItemText primary={log.message} secondary={formatTimestamp(log.timestamp)} />
								</ListItem>
							))}
						</List>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				{/* You can add custom actions here, if needed */}
			</DialogActions>
		</Dialog>
	)
}
export default TaskItemFull