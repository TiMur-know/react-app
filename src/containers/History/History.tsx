import { Box, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material"
import React, { FC } from "react"

import { blue, grey, } from "@mui/material/colors";
import { Close } from "@mui/icons-material";
import { LogEntry } from "../../types/LogEntry";

interface HistoryProps {
	logs: LogEntry[]; 
	onClose?: () => void;
}
const History: FC<HistoryProps> = ({ logs,onClose }) => {
	const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
    return formatter.format(date);
}
	const formatMessage = (log: LogEntry) => {
		let message = log.message;

    if (log.primaryWords) {
      log.primaryWords.forEach((word, index) => {
        message = message.replace(`{primary[${index}]}`, `<span style=" font-weight: 800; color: black ">${word}</span>`);
      });
    }

    if (log.secondaryWords) {
      log.secondaryWords.forEach((word, index) => {
        message = message.replace(`{secondary[${index}]}`, `<span style="color: #62c2fa; font-weight: 700;">${word}</span>`);
      });
    }

    return <span dangerouslySetInnerHTML={{ __html: message }} />;
	};
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
							primary={<Typography variant="body2" sx={{color:blue[200]}}>
							{formatMessage(log)}
						</Typography>}
							secondary={
								<Typography variant="caption" sx={{color:blue[300],fontStyle:'italic'}}>
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