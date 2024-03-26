import { Delete, Edit, MoreVert } from "@mui/icons-material";
import Add from '@mui/icons-material/Add';
import { Box, Button, ButtonGroup, ClickAwayListener, IconButton, Popper, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import TaskItem from "../../components/TaskItem/TaskItem";
import { TaskEntry } from "../../types/TaskEntry";
import { blue } from "@mui/material/colors";

export interface TaskListInterface {
	list: {
		id: number,
		name: string,
		tasks: TaskEntry[],
	}
}
const TaskList: FC<TaskListInterface> = ({ list }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [open, setOpen] = useState(false);
	const showSettings = (event) => {
		event.stopPropagation()
		setAnchorEl(event.currentTarget);
		setOpen(!open)
	}
	const handleAdd = () => {

	}
	const handleEdit = () => {

	}
	const handleDelete = () => {

	}
	return (

		<Box sx={{ width: '100%', mb: 1, }}>
			<Stack spacing={2}>
				<Box sx={{ borderBottom: '1px solid #ccc', borderTop: '1px solid #ccc', display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
					<Typography variant="h6">{list.name}</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="body2" sx={{ mr: 1 }}>12</Typography>
						<IconButton onClick={showSettings}><MoreVert /></IconButton>
						<ClickAwayListener onClickAway={(event) => { showSettings(event) }}>
							<Popper open={open} anchorEl={anchorEl} placement='right-start'>
								<ButtonGroup orientation="vertical" variant='contained' >
									<Button onClick={handleAdd} sx={{ backgroundColor: 'white', color: blue[500] }}><Add /> Add new card</Button>
									<Button onClick={handleEdit} sx={{ backgroundColor: 'white', color: blue[500] }}><Edit /> Edit</Button>
									<Button onClick={handleDelete} sx={{ backgroundColor: 'white', color: blue[500] }}><Delete /> Delete</Button>
								</ButtonGroup>
							</Popper>
						</ClickAwayListener>
					</Box>
				</Box>
				<Button variant={"outlined"} sx={{ width: '100%' }} onClick={handleAdd}><Add /> Add new card</Button>

				{list.tasks.map((task, index) => (
					<TaskItem key={index} task={task}></TaskItem>
				))}
			</Stack>
		</Box>
	)
}
export default TaskList