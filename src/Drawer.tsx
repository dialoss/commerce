import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function Drawer({
                                   tab,
                                   callback,
                                   open,
                                   setOpen,
                                   tabs
                               }: { callback: (i: number) => any; tab: number; tabs: string[], open: boolean, setOpen: any }) {
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const list = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {tabs.map((text, index) => (
                    <ListItem className={index === tab ? 'active' : ''} key={text} disablePadding onClick={() => callback(index)}>
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