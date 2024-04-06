// @ts-nocheck
import React from 'react';
import {Media} from "../api";
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import store from "../store";
import FavoriteIcon from '@material-ui/icons/Favorite';
import BaseCard from "./BaseCard";
import CardImage from "./CardImage";



const MediaCard = ({data}: { data: Media }) => {
    return (
        <BaseCard>
            {!!data.title && <div>
                <Typography level="title-lg">{data.title}</Typography>
            </div>}
            <CardImage carousel={true} id={data.id} url={data.url}></CardImage>
            <Typography sx={{
                flexGrow: 1,
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center'
            }}
                        level={'body-md'}>{data.text}</Typography>
            {data.likes > 0 && <>{data.likes}<FavoriteIcon></FavoriteIcon></>}
        </BaseCard>
    );
};

export default MediaCard;