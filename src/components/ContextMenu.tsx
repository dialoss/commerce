//@ts-nocheck
import * as React from 'react';
import {useLayoutEffect} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import store from "../store";

const actions = [
    {
        name: "Создать",
        callback: () => {
            window.app.dataForm(true);
        }
    },
    {
        name: "Удалить",
        callback: () => {
            window.app.remove(store.getState().app.selected);
        }
    },
    {
        name: "Редактировать",
        callback: () => {
            window.app.dataForm(false);
        }
    },
]

export default function ContextMenu() {
    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                :
                null,
        );
    };

    window.app.contextMenu = handleContextMenu;
    useLayoutEffect(() => {
        // @ts-ignore
        window.addEventListener("contextmenu", handleContextMenu);
    }, [])

    const handleClose = () => {
        setContextMenu(null);
    };

    return (
        <div style={{cursor: 'context-menu'}}>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? {top: contextMenu.mouseY, left: contextMenu.mouseX}
                        : undefined
                }
            >
                {
                    actions.map(action => <MenuItem onClick={e => {
                        handleClose();
                        action.callback();
                    }}>{action.name}</MenuItem>)
                }
            </Menu>
        </div>
    );
}