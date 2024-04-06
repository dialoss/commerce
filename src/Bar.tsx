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
import Userfront from "@userfront/toolkit/react";

function Bar({
                 tabs, onChange = () => {
    }
             }: { tabs: string[], onChange?: (tab: number) => void }) {
    const [open, setOpen] = React.useState(false);
    const [tab, setTab] = React.useState(0);

    return (
        <>
            <AppBar position="fixed" sx={{zIndex: 10}}>
                <Container maxWidth="xl">
                    <Stack direction={'row'}>
                        <IconButton color="inherit" onClick={() => setOpen(o => !o)}>
                            <MenuIcon/>
                        </IconButton>
                        <Tabs value={tab}
                              variant={'scrollable'}
                              indicatorColor="secondary"
                              textColor="inherit"
                        >
                            {
                                tabs.map((t, i) => <Tab onClick={() => {
                                    onChange(i);
                                    setTab(i);
                                }} key={t} label={t}></Tab>)
                            }
                        </Tabs>
                        <MyTooltip sx={{marginLeft: 'auto'}}
                                   element={({onClick}) => <IconButton onClick={onClick} sx={{height:'100%'}} color="inherit">
                                       <ChatIcon/>
                                   </IconButton>}
                                   title={'Связаться со мной'} fields={[
                            {
                                name: "Чат на сайте",
                                callback: () => {
                                    const chat: HTMLElement | null = document.querySelector(`a[data-b24-crm-button-widget="openline_livechat"]`);
                                    if (!chat) return;
                                    chat.click();
                                }
                            },
                            {
                                name: <p>Телеграм</p>,
                                callback: () => {
                                    window.open("https://t.me/mymount_bot")
                                }
                            }
                        ]}></MyTooltip>
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

interface TooltipField {
    name: string;
    callback: () => any;
}

function MyTooltip({
                       title,
                       fields,
                       element,
                       ...props
                   }: { element: React.ReactElement; title: string; fields: TooltipField[] }) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event: Event) => {
        // @ts-ignore
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (field: TooltipField) => {
        setAnchorElUser(null);
        field.callback && field.callback();
    };
    return (
        <Box {...props}>
            <Tooltip title={title}>
                {React.createElement(element, {onClick: handleOpenUserMenu})}
            </Tooltip>
            <Menu
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
                {fields.map((f) =>
                    <MenuItem key={f.name} onClick={() => handleCloseUserMenu(f)}>
                        <Typography textAlign="center">{f.name}</Typography>
                    </MenuItem>
                )}
            </Menu>
        </Box>

    );
}

function UserInfo() {
    const user = Userfront.user;
    return (
        <>
            {user.userId ? <Stack direction={'row'}>
                    <MyTooltip element={({onClick}) => <IconButton onClick={onClick} sx={{p: "5px"}}>
                        <Avatar src={user.image}></Avatar>
                    </IconButton>} title={'Пользователь'} fields={[
                        {
                            name: "Настройки",
                            callback: () => {

                            }
                        },
                        {
                            name: "Мои заказы",
                            callback: () => {
                                window.navigate("orders")
                            }
                        },
                        {
                            name: "Выход",
                            callback: () => {
                                Userfront.logout({redirect: "/main/"});
                            }
                        }
                    ]}></MyTooltip>
                    <Typography mx={1} sx={{color: '#fff', display: 'flex', alignItems: 'center'}}>{user.name}</Typography>
                </Stack> :
                <Button variant={'outlined'} sx={{color: '#fff'}} mx={1}
                        onClick={() => window.app.auth?.open()}>Вход</Button>
            }
        </>
    )
}