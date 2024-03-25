import { Box, Grid } from "@mui/material"
import TaskList, { TaskListInterface } from "../TaskList/TaskList"
import { FC } from "react"
interface BoardProps {
	taskLists: TaskListInterface[]
}
const Board: FC<BoardProps> = ({ taskLists }) => {
	return (
		<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
			<Grid container spacing={2}>
				{taskLists.map((taskList, index) => (
					<Grid item key={index} xs={12} md={4} >
						<TaskList list={taskList} />
					</Grid>
				))}
			</Grid>
		</Box>
		
	)
}
export default Board