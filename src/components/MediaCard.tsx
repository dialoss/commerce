// @ts-nocheck
import React from 'react';
import BaseCard from "./BaseCard";
import Likes from "../ui/Likes/Likes";
import {MediaItem} from "./MediaItems";
import Typography from "@mui/joy/Typography";
import store from "../store";
import {scaleImage} from "./CardImage";

export function openImages(current, images) {
    return () => {
        const cur = scaleImage(current, 2);
        const formattedImages = images.map(im => scaleImage(im, 2));
        window.app.images.open({
            images: formattedImages,
            start: formattedImages.findIndex(im => im.url === cur.url)
        })
    }
}

const MediaCard = ({data}: { data }) => {
    const media = data.media[0];
    return (
        <BaseCard data={data}>
            <div style={{display: 'flex', flexDirection: 'column', position: 'relative', height: '100%'}}>
                {media && <MediaItem ratio={true} data={media} callback={openImages(media,
                    store.getState().app.items.map(it => JSON.parse(it.media)[0]))}></MediaItem>}
                {media.mediaTitle &&
                    <Typography textAlign={'center'} level="title-lg">{media.mediaTitle}</Typography>}
                {media.mediaText && <Typography sx={{
                    flexGrow: 1,
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                                                level={'body-md'}>{media.mediaText}</Typography>}
                <Likes likes={data.likes || 0}></Likes>
            </div>
        </BaseCard>
    );
};

export default MediaCard;