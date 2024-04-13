//@ts-nocheck
import React from 'react';
import Card from "@mui/joy/Card";
import store from "../store";
import {actions} from "../store/app";
import EditIcon from '@material-ui/icons/Edit';

const BaseCard = ({data, onClick, children, style}: {data: object; onClick?: (e: any) => any; style?:string; children: React.ReactElement }) => {
    const ref = React.useRef();

    return (
        <div style={{padding:5, flexGrow:1, display:'flex',position:'relative'}}>
        <div
            className={"p-[5px] w-100 rounded-[5px] shadow-md item-card bg-slate-100 hover:cursor-pointer " + style} ref={ref}
            onMouseOver={e => ref.current.classList.add('hovered')}
            onMouseOut={e => ref.current.classList.remove('hovered')}
            onMouseDown={e => {
                onClick && onClick(e);
                store.dispatch(actions.setSelected(data))
            }}>
            {children}
        </div>
        </div>
    );
};

export default BaseCard;