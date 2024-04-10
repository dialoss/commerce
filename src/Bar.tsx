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
import {actions} from "./store/app";
import Button from "@mui/material/Button";
import Userfront from "@userfront/toolkit/react";
import {checkUser} from "./modules/Auth/helpers";
import store from "./store";
import {useNavigate} from "react-router-dom";

function Bar({
                 tabs, current, onChange = () => {
    }
             }: { tabs: object, onChange?: (tab: number) => void }) {
    const [open, setOpen] = React.useState(false);
    const [tab, setTab] = React.useState(current);
    let tabsNames = Object.values(tabs);
    const drawer = tabsNames.concat(['Редактор', "Файлы"])
    const location = useNavigate();
    React.useLayoutEffect(() => {
        const page = window.location.pathname.split('/')[1];
        if (!tabs[page]) setTab(-1);
        else setTab(Object.keys(tabs).indexOf(page));
        window.scrollTo(0, 0)
    }, [location])
    return (
        <>
            <AppBar position="fixed" sx={{zIndex: 3, paddingRight:"0 !important"}}>
                <Container maxWidth="xl" sx={{paddingRight: '5px !important'}}>
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
                                tabsNames.map((t, i) => <Tab onClick={() => {
                                    onChange(i);
                                    setTab(i);
                                }} key={t} label={t}></Tab>)
                            }
                        </Tabs>
                        <MyTooltip sx={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}
                                   element={({onClick}) => <Button startIcon={<ChatIcon/>} onClick={onClick}
                                                                   color="inherit">
                                       чат
                                   </Button>}
                                   title={'Связаться со мной'} fields={[
                            {
                                name: "На сайте",
                                callback: () => {
                                    if (!checkUser()) return;
                                    const chat: HTMLElement | null = document.querySelector(`a[data-b24-crm-button-widget="openline_livechat"]`);
                                    if (!chat) return;
                                    chat.click();
                                }
                            },
                            {
                                name: <p>Telegram</p>,
                                callback: () => {
                                    window.open("https://t.me/mymount_bot")
                                }
                            }
                        ]}></MyTooltip>
                        <UserInfo></UserInfo>
                    </Stack>
                </Container>
            </AppBar>
            <Drawer tab={tab} callback={i => {
                if (drawer[i] === "Редактор") store.dispatch(actions.setEditor());
                else if (drawer[i] === "Файлы") window.app.filemanager?.open();
                else {
                    onChange(i);
                    setTab(i);
                }
            }} tabs={drawer} open={open} setOpen={setOpen}></Drawer>
        </>
    );
}

export default Bar;

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
            {user.userId ?
                <MyTooltip
                    element={({onClick}) => <Stack direction={'row'} onClick={onClick}>
                        <IconButton sx={{p: "5px"}}>
                            <Avatar src={user.image}></Avatar>
                        </IconButton>
                        <Typography mx={1} className={"hover:cursor-pointer text-decoration-underline"} sx={{
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center'
                        }}>{user.name}</Typography>
                        </Stack>} title={'Пользователь'} fields={[
                    {
                        name: "Настройки",
                        callback: () => {
                            window.navigate("settings")
                        }
                    },
                    {
                        name: "Мои заказы",
                        callback: () => {
                            window.navigate("profile")
                        }
                    },
                    {
                        name: "Выход",
                        callback: () => {
                            Userfront.logout({redirect: "/main/"});
                        }
                    }
                ]}></MyTooltip> :
                <Button variant={'outlined'} sx={{color: '#fff'}} mx={1}
                        onClick={() => window.app.auth?.open()}>Вход</Button>
            }
        </>
    )
}