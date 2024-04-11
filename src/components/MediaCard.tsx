// @ts-nocheck
import React from 'react';
import BaseCard from "./BaseCard";
import Likes from "../ui/Likes/Likes";
import {MediaItem} from "./MediaItems";
import Typography from "@mui/joy/Typography";
import store from "../store";
import {scaleImage} from "./CardImage";


const MediaCard = ({data}: { data }) => {
    const media = data.media[0];

    return (
        <BaseCard data={data}>
            <div style={{display: 'flex', flexDirection: 'column', position: 'relative', height: '100%'}}>
                <MediaItem ratio={true} data={data} callback={() => {
                    let images = store.getState().app.items.map(it => scaleImage(JSON.parse(it.media)[0], 2));
                    // if (one) images = [scaleImage(img, 2)];
                    const cur = scaleImage(data.media[0], 2);
                    console.log(images, cur)

                    window.app.images.open({
                        images,
                        start: images.findIndex(im => im.url === cur.url)
                    })
                }}></MediaItem>
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