import { Box, Grid, Typography } from "@mui/material"
import { FC } from "react"
import TaskList from "../TaskList/TaskList"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

interface BoardProps {
	
}
const Board: FC<BoardProps> = () => {
	const taskLists = useSelector((state: RootState) => state.taskLists.taskLists);
	console.log(taskLists) 

	return (
		<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
			<Grid container spacing={2}>
			{taskLists ? (
          taskLists.map((taskList, index) => (
            <Grid item key={index} xs={12} md={4}>
              <TaskList list={taskList} />
            </Grid>
          ))
        ) : (
					<Grid item xs={12}>
            <Typography variant="body1">No lists yet</Typography>
          </Grid>
        )}
				
			</Grid>
		</Box>
		
	)
}
export default Board