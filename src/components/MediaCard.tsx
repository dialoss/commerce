// @ts-nocheck
import React from 'react';
import {Media} from "../api";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import store from "../store";
import {actions} from "../store/app";


const MediaCard = ({data}: { data: Media }) => {
    if (!data.url.match(/cloudinary/)) {
        data.url = "https://res.cloudinary.com/drlljn0sj/image/upload/w_600/v1712248757/" + data.url + '.jpg'
    }
    return (
        <div style={{padding: 5, width: '33.33%'}} onClick={() => store.dispatch(actions.setSelected(data))}>
            <Card
                color="neutral"
                invertedColors={false}
                orientation="vertical"
                size="sm"
                sx={{gap: 0, height: '100%', padding: 1}}
                variant="outlined">
                {!!data.title && <div>
                    <Typography level="title-lg">{data.title}</Typography>
                </div>}
                <AspectRatio minHeight="200px" maxHeight="300px">
                    <img
                        onClick={() => window.app.images.open({images: [data.url], start: 0, id: data.id})}
                        style={{objectFit: 'contain'}}
                        src={data.url}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        alt=""
                    />
                </AspectRatio>
                <Typography textAlign={'center'} level={'body-md'}>{data.text}</Typography>
            </Card>
        </div>
    );
};

export default MediaCard;