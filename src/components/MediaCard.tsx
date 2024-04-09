// @ts-nocheck
import React from 'react';
import {Media} from "../api";
import Typography from '@mui/joy/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BaseCard from "./BaseCard";
import CardImage from "./CardImage";
import {Stack} from "@mui/material";
import Likes from "../ui/Likes/Likes";


const MediaCard = ({data}: { data: Media }) => {
    return (
        <BaseCard data={data}>
            <>
                <CardImage carousel={true} data={data}></CardImage>
                {!!data.mediaTitle && <div>
                    <Typography textAlign={"center"} level="title-lg">{data.mediaTitle}</Typography>
                </div>}
                <Typography sx={{
                    flexGrow: 1,
                    minHeight: 20,
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                            level={'body-md'}>{data.mediaText}</Typography>
                <Likes likes={data.likes || 0}></Likes>
            </>
        </BaseCard>
    );
};

export default MediaCard;