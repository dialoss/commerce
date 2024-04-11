import React from 'react';
import {IconButton, Stack} from "@mui/material";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "./Likes.scss"

function Likes({likes}: {likes: number}) {
    return (
        <div className={'likes bg-slate-100 p-1 rounded-[5px]'}>
            <Stack direction={'row'}>
                {likes}
                <FavoriteBorderIcon></FavoriteBorderIcon>
            </Stack>
        </div>
    )
}

export default Likes;