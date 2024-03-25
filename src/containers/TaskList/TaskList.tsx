import { MoreVert } from "@mui/icons-material";
import Add from '@mui/icons-material/Add';
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import TaskItem from "../../components/TaskItem/TaskItem";
import { Task } from "../../types/Task";
export interface TaskListInterface {
	list: {
		id: number,
		name: string,
		tasks: Task[],
	}
}
const TaskList: FC<TaskListInterface> = ({ list }) => {
	return (

		<Box sx={{ width: '100%', mb: 1, }}>
			<Stack spacing={2}>
				<Box sx={{ borderBottom: '1px solid #ccc', borderTop: '1px solid #ccc', display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
					<Typography variant="h6">{list.name}</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="body2" sx={{ mr: 1 }}>12</Typography>
						<IconButton><MoreVert /></IconButton>
					</Box>
				</Box>
				<Button variant={"outlined"} sx={{ width: '100%' }}><Add /> Add new card</Button>

				{list.tasks.map((task, index) => (
					<TaskItem key={index} task={task}></TaskItem>
				))}
			</Stack>
		</Box>
	)
}
export default TaskList