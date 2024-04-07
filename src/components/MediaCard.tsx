// @ts-nocheck
import React from 'react';
import {Media} from "../api";
import Typography from '@mui/joy/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BaseCard from "./BaseCard";
import CardImage from "./CardImage";
import {Stack} from "@mui/material";

function Likes({likes}) {
    return (
        <>
            {likes > 0 && <Stack direction={'row'} sx={{position:'absolute', right:1, top:1, zIndex:2}}>
                {likes}
                <FavoriteIcon></FavoriteIcon>
            </Stack>}
        </>
    )
}

const MediaCard = ({data}: { data: Media }) => {
    return (
        <BaseCard>
            <>
            {!!data.title && <div>
                <Typography level="title-lg">{data.title}</Typography>
            </div>}
            <Likes likes={data.likes || 0}></Likes>
            <CardImage carousel={true} id={data.id} url={data.url}></CardImage>
            <Typography sx={{
                flexGrow: 1,
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center'
            }}
                        level={'body-md'}>{data.text}</Typography>
            </>
        </BaseCard>
    );
};

export default MediaCard;