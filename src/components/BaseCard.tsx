//@ts-nocheck
import React from 'react';
import Card from "@mui/joy/Card";
import store from "../store";
import {actions} from "../store/app";

const BaseCard = ({data, onClick, children, style}: {data: object; onClick?: (e: any) => any; style?:string; children: React.ReactElement }) => {
    const ref = React.useRef();
    return (
        <div
            className={"p-1 item-card md:w-1/2 lg:w-1/3 hover:cursor-pointer " + style} ref={ref}
            onMouseOver={e => ref.current.classList.add('hovered')}
            onMouseOut={e => ref.current.classList.remove('hovered')}
            onMouseDown={e => {
                onClick && onClick(e);
                store.dispatch(actions.setSelected(data))
            }}>
            <Card
                color="neutral"
                invertedColors={false}
                orientation="vertical"
                size="sm"
                sx={{gap: 0, height: '100%', padding: 1}}
                variant="outlined">
                {children}
            </Card>
        </div>
    );
};

export default BaseCard;