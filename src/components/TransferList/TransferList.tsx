import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { FC } from "react";

interface TransferListProps {
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[]; 
  onChange: (newTasks: string[]) => void;
}

const TransferList: FC<TransferListProps> = ({
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
  onChange,
}) => {
  const handleMoveRight = (index: number) => {
    const updatedLeftItems = [...leftItems];
    const updatedRightItems = [...rightItems];
    const itemToMove = updatedLeftItems.splice(index, 1)[0];
    updatedRightItems.push(itemToMove);
    onChange(updatedRightItems);
  };

  const handleMoveLeft = (index: number) => {
    const updatedLeftItems = [...leftItems];
    const updatedRightItems = [...rightItems];
    const itemToMove = updatedRightItems.splice(index, 1)[0];
    updatedLeftItems.push(itemToMove);
    onChange(updatedRightItems);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
			
      <Box sx={{ width: "50%" }}>
        <Typography variant="subtitle1">{leftTitle}</Typography>
        <List dense component="div" role="list">
          {leftItems.map((item, index) => (
            <ListItem key={index}>
              {item}
              <Button onClick={() => handleMoveRight(index)}>Add</Button>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ width: "50%" }}>
        <Typography variant="subtitle1">{rightTitle}</Typography>
        <List dense component="div" role="list">
          {rightItems.map((item, index) => (
            <ListItem key={index}>
              {item}
              <Button onClick={() => handleMoveLeft(index)}>Remove</Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default TransferList;
