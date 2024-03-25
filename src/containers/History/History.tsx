import { Box, IconButton, List, ListItem, ListItemText, SwipeableDrawer, Typography } from "@mui/material"
import React, { FC } from "react"

import { grey, pink,  } from "@mui/material/colors";
import { Close } from "@mui/icons-material";
interface HistoryLogEntry {
	message: string;
	timestamp: Date;
	primaryWords?: string[]; 
	secondaryWords?: string[];
}
interface HistoryProps {
	logs: HistoryLogEntry[]; 

}
const History: FC<HistoryProps> = ({ logs }) => {
	const formatTimestamp = (timestamp: Date) => {
		const formatter = new Intl.DateTimeFormat('en-US', {
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		});
		return formatter.format(timestamp);
	}
	const formatMessage = (log: HistoryLogEntry) => {
		let message = log.message;

    if (log.primaryWords) {
      log.primaryWords.forEach((word, index) => {
        message = message.replace(`{primary[${index}]}`, `<span style=" font-weight: 800; color: black ">${word}</span>`);
      });
    }

    if (log.secondaryWords) {
      log.secondaryWords.forEach((word, index) => {
        message = message.replace(`{secondary[${index}]}`, `<span style="color: #b38ff7; font-weight: 700;">${word}</span>`);
      });
    }

    return <span dangerouslySetInnerHTML={{ __html: message }} />;
	};
	const onClose=()=>{
		
	}
	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{display:'flex', justifyContent:'space-between',color:"white", background:grey[600]}}>
				<Typography variant="h6" p={2}>Activity Log</Typography>
				<IconButton aria-label="Close" sx={{color:"white"}} onClick={onClose}><Close /></IconButton>
			</Box>
			<List dense={true}>
				{logs.map((log, index) => (
					<ListItem key={index}>
						<ListItemText
							primary={<Typography variant="body2" sx={{color:pink[200]}}>
							{formatMessage(log)}
						</Typography>}
							secondary={
								<Typography variant="caption" sx={{color:pink[300],fontStyle:'italic'}}>
									{formatTimestamp(log.timestamp)}
								</Typography>
							}
						/>
					</ListItem>
				))}
			</List>
		</Box>
	)
}
export default History