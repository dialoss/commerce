// @ts-nocheck

import React from "react";
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import {Avatar, Menu, Stack, Tab, Tabs, Tooltip} from "@mui/material";
import MenuIcon from '@material-ui/icons/Menu';
import ChatIcon from '@material-ui/icons/Chat';
import AppBar from '@mui/material/AppBar';
import Drawer from "./Drawer";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import {IUser} from "./store/app";
import {useAppSelector} from "./store/redux";
import Button from "@mui/material/Button";

function Bar({
                 tabs, onChange = () => {
    }
             }: { tabs: string[], onChange?: (tab: number) => void }) {
    // const tab = useSelector(state => state.storage.tab);
    const [open, setOpen] = React.useState(false);
    const [tab, setTab] = React.useState(0);

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Stack direction={'row'}>
                        <IconButton color="inherit" onClick={() => setOpen(o => !o)}>
                            <MenuIcon/>
                        </IconButton>
                        <Tabs value={tab}
                              variant={'scrollable'}
                              indicatorColor="secondary"
                              textColor="inherit"
                              onChange={(e, v) => {
                                  onChange(v);
                                  setTab(v)
                              }}
                        >
                            {
                                tabs.map(t => <Tab key={t} label={t}></Tab>)
                            }
                        </Tabs>
                        <IconButton color="inherit" sx={{marginLeft: 'auto'}} onClick={() => {
                            const chat: HTMLElement | null = document.querySelector(`a[data-b24-crm-button-widget="openline_livechat"]`);
                            if (!chat) return;
                            chat.click();
                        }}>
                            <ChatIcon/>
                        </IconButton>
                        <UserInfo></UserInfo>
                    </Stack>
                </Container>
            </AppBar>
            <Drawer tabs={tabs} open={open} setOpen={setOpen}></Drawer>
        </>
    );
}

export default Bar;

const settings = ['Профиль', 'Выход'];


function UserInfo() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event: Event) => {
        // @ts-ignore
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (s: any) => {
        setAnchorElUser(null);
        console.log(s)

    };

    const user: IUser = useAppSelector(state => state.app.user);


    return (
        <>
            {user.auth ? <Box>
                <Box>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: "5px"}}>
                            <Avatar {...stringAvatar(user.login)}></Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Typography mx={1} sx={{display: 'flex', alignItems: 'center'}}>{user.login}</Typography>
            </Box> :
                <Button variant={'outlined'} sx={{color:'#fff'}} mx={1} onClick={() => window.app.auth?.open()}>Вход</Button>
            }
        </>
    )
}

export function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        }, children: `${name.split(' ')[0][0].toUpperCase()}`,
    };
}

function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}
