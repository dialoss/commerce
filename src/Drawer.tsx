import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function Drawer({open, setOpen, tabs}: {tabs:string[], open: boolean, setOpen: any }) {
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const list = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {tabs.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </Box>
    );

    return (
        <SwipeableDrawer
            onOpen={toggleDrawer(true)}
            open={open} onClose={toggleDrawer(false)}
        >
            {list}
        </SwipeableDrawer>
    );
}