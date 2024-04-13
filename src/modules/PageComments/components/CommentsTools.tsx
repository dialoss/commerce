//@ts-nocheck
import React from 'react';
import "./CommentsTools.scss";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const items = [
    {
        name: "Старые",
        value: 'oldest'
    },
    {
        name: "Новые",
        value: 'newest'
    },
]

const CommentsTools = ({callback}) => {
    return (
        <div style={{display:'flex',paddingTop:5}}>
        <div style={{transform: 'scale(0.8)'}}>
            <TextField
                label={"Сортировка"}
                select
                style={{width:180}}
                size={'small'}
                defaultValue={'newest'}
                onChange={e => {
                    callback(e.target.value)
                }}
            >
                {
                    items.map(t =>
                        <MenuItem key={t.value} value={t.value}>{t.name}</MenuItem>
                    )
                }
            </TextField>
        </div>
        </div>
    )
        ;
};

export default CommentsTools;