//@ts-nocheck
import React from 'react';
import "./CommentsTools.scss";
import Typography from "@mui/joy/Typography";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const items = [
    {
        name: "По умолчанию",
        value: 'default'
    },
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
        <TextField
            label={"Сортировка"}
            select
            size={'small'}
            defaultValue={'default'}
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
    );
};

export default CommentsTools;