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
    let media = data.media[0];

    function like() {
        window.api.apiGalleryUpdate({id: data.id, like: true});
    }

    return (
        <BaseCard data={data}>
            <div style={{display: 'flex', flexDirection: 'column', position: 'relative', height: '100%'}}>
                {media && <MediaItem ratio={true} data={media} callback={openImages(media,
                    store.getState().app.items.map(it => ({...JSON.parse(it.media)[0],...data})))}></MediaItem>}
                {data.mediaTitle &&
                    <Typography textAlign={'center'} level="title-lg">{data.mediaTitle}</Typography>}
                {data.mediaText && <Typography sx={{
                    flexGrow: 1,
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                                                level={'body-md'}>{data.mediaText}</Typography>}
                <Likes like={like} likes={data.likes || []}></Likes>
            </div>
        </BaseCard>
    );
};

export default MediaCard;