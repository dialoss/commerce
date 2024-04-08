import React from 'react';
import {IconButton, Stack} from "@mui/material";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "./Likes.scss"

function Likes({likes}: {likes: number}) {
    return (
        <div className={'likes'}>
            <Stack direction={'row'}>
                {likes}
                {/*<IconButton size={'small'}>*/}
                <FavoriteBorderIcon></FavoriteBorderIcon>
                {/*</IconButton>*/}
            </Stack>
        </div>
    )
}

export default Likes;