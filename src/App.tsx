import { Add, History as HistoryIcon } from '@mui/icons-material';
import { Box, Button, CircularProgress, SwipeableDrawer, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Board from './containers/Board/Board';
import History from './containers/History/History';
import TaskListViewAdd from './containers/TaskList/TaskListAdd';
import { useGetLogsQuery } from './store/apiSlices/logsApi';
import { useGetTasksQuery } from './store/apiSlices/tasksApi';
import { useGetTaskListsQuery } from './store/apiSlices/taskListsApi';
import { addAllLogs } from './store/slices/logSlice';
import { addAllTaskLists } from './store/slices/taskListSlice';
import { addAllTasks } from './store/slices/taskSlice';



function App() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [addListView, setAddListView] = useState(false);
  const { data: logs, error: errorLogs, isLoading: isLoadingLogs } = useGetLogsQuery();
  const { data: tasks, error: errorTasks, isLoading: isLoadingTasks } = useGetTasksQuery();
  const { data: taskLists, error: errorLists, isLoading: isLoadingLists } = useGetTaskListsQuery();

  useEffect(() => {
    if (!isLoadingLogs && !isLoadingTasks && !isLoadingLists) {
      dispatch(addAllLogs(logs));
      dispatch(addAllTasks(tasks));
      dispatch(addAllTaskLists(taskLists));
    }
  }, [dispatch, logs, tasks, taskLists, isLoadingLogs, isLoadingTasks, isLoadingLists]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  
  const handleAddListClose = () => {
    setAddListView(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} py={2}>
          <Typography variant={'h4'}>My Task Board</Typography>
          <Box>
            <Button variant='outlined' onClick={handleDrawerToggle}>
              <HistoryIcon /> History
            </Button>
            <Button variant='contained' sx={{ background: grey[500] }} onClick={() => setAddListView(!addListView)}>
              <Add /> Create new list
            </Button>
          </Box>
        </Box>
        {(isLoadingLists || isLoadingLogs || isLoadingTasks) ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
        ) : (
          <>
            <Board />
            <SwipeableDrawer anchor='right' open={open} onClose={handleDrawerToggle} onOpen={handleDrawerToggle}>
              <History logs={logs} onClose={handleDrawerToggle} />
            </SwipeableDrawer>
            {addListView && <TaskListViewAdd onClose={handleAddListClose} />}
          </>
        )}
      </Box>
    </>
  );
}

export default App;
