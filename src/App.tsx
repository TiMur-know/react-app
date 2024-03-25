
import { Add, History as HistoryIcon } from '@mui/icons-material'
import { Box, Button, SwipeableDrawer, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import './App.css'
import TaskList from './containers/TaskList/TaskList'
import { useEffect, useState } from 'react'
import Board from './containers/Board/Board'
import History from './containers/History/History'


function App() {
  const data =
  [
    {
      id: 1,
      name: "To Do",
      tasks: [
        {
          id: "task-1",
          name: "Implement drag-and-drop functionality",
          description: "Allow users to reorder tasks within lists",
          date: new Date("2024-03-27"),
          priority: "High",
        },
        {
          id: "task-2",
          name: "Implement drag-and-drop functionality",
          description: "Allow users to reorder tasks within lists",
          date: new Date("2024-03-27"),
          priority: "Medium",
        },
        {
          id: "task-3",
          name: "Implement drag-and-drop functionality",
          description: "Allow users to reorder tasks within lists",
          date: new Date("2024-03-27"),
          priority: "Low",
        },
      ],
    },
    {
      id: 2,
      name: "In Progress",
      tasks: [
        {
          id: "task-1",
          name: "Implement drag-and-drop functionality",
          description: "Allow users to reorder tasks within lists",
          date: new Date("2024-03-27"),
          priority: "High",
        },
        {
          id: "task-2",
          name: "Implement drag-and-drop functionality",
          description: "Allow users to reorder tasks within lists",
          date: new Date("2024-03-27"),
          priority: "Medium",
        },
        {
          id: "task-3",
          name: "Implement drag-and-drop functionality",
          description: "Allow users to reorder tasks within lists",
          date: new Date("2024-03-27"),
          priority: "Low",
        },
      ],
    },
    {
      id: 2,
      name: "In Progress",
      tasks: [
        {
          id: "task-1",
          name: "Implement drag-and-drop functionality",
          description: "Allow users to reorder tasks within lists",
          date: new Date("2024-03-27"),
          priority: "High",
        },
        {
          id: "task-2",
          name: "Implement drag-and-drop functionality",
          description: "Allow users to reorder tasks within lists",
          date: new Date("2024-03-27"),
          priority: "Medium",
        },
        {
          id: "task-3",
          name: "Implement drag-and-drop functionality",
          description: "Allow users to reorder tasks within lists",
          date: new Date("2024-03-27"),
          priority: "Low",
        },
      ],
    },
    {
      id: 2,
      name: "In Progress",
      tasks: [
        {
          id: "task-1",
          name: "Implement drag-and-drop functionality",
          description: "Allow users to reorder tasks within lists",
          date: new Date("2024-03-27"),
          priority: "High",
        },
        {
          id: "task-2",
          name: "Implement drag-and-drop functionality",
          description: "Allow users to reorder tasks within lists",
          date: new Date("2024-03-27"),
          priority: "Medium",
        },
        {
          id: "task-3",
          name: "Implement drag-and-drop functionality",
          description: "Allow users to reorder tasks within lists",
          date: new Date("2024-03-27"),
          priority: "Low",
        },
      ],
    },
  ]
  const logsData = [
    {
      message: "Task {primary[0]} created",
      timestamp: new Date("2024-03-23T10:00:00"),
      primaryWords: ["Task 1"],
    },
    {
      message: "Task {primary[0]} renamed to {primary[1]}",
      timestamp: new Date("2024-03-23T10:15:00"),
      primaryWords: ["Task 1","Task 2"],
    },
    {
      message: "Task {primary[0]} description updated",
      timestamp: new Date("2024-03-23T10:30:00"),
      primaryWords: ["Task 1"],
    },
    {
      message: "Task {primary[0]} moved to list {secondary[0]}",
      timestamp: new Date("2024-03-23T11:00:00"),
      primaryWords: ["Task 1"],
      secondaryWords: ["In Progress"],
    },
  ];
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const handleOpenHistory = () => {
    isHistoryOpen?setIsHistoryOpen(false):setIsHistoryOpen(true)
  }
  useEffect(()=>{
    
  },[])

  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} py={2}>
          <Typography variant={'h4'}>My Task Board</Typography>
          <Box>
            <Button variant='outlined' onClick={handleOpenHistory}>
              <HistoryIcon /> History
            </Button>
            <Button variant='contained' sx={{ background: grey[500] }}>
              <Add /> Create new list
            </Button>
          </Box>
        </Box>
        <Board taskLists={data} />

        {isHistoryOpen && (
          <SwipeableDrawer anchor='right' open={isHistoryOpen} onClose={handleOpenHistory}>
            <History logs={logsData}/>
          </SwipeableDrawer>
        )}
      </Box>
    </>
  )
}

export default App
