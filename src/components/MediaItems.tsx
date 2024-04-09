//@ts-nocheck
import {scaleImage} from "./CardImage";
import Viewer from "./Model/Viewer";
import React from "react";
import Typography from "@mui/joy/Typography";

const mediaStyle = {
    maxWidth: '100%',
    height: '100%',
}

export const mediaItems = {
    image: ({data}) =>
        <img onClick={() => {
            window.app.images.open({
                images: [scaleImage(data.media[0], 2)],
                start: 0,
            })
        }}
             style={mediaStyle}
             src={scaleImage(data.media[0], 1).url}
             alt=""/>,
    video: ({data}) => <video controls={true}
                              src={"https://res.cloudinary.com/drlljn0sj/video/upload/v1712582052/" + data.media[0].url}
                              style={mediaStyle}/>,
    model: ({data}) => <div className={'h-[400px] w-100'}>
        <Viewer data={{
            show_ui: true,
            urn: data.media[0].url,
            id: data.id,
            rotation: true
        }}></Viewer>
    </div>,
    file: ({data}) => <div>file {data.media[0].url}</div>
}

export function MediaItem({data}) {
    if (!data.media || !data.media[0]) return <></>
    const media = data.media[0];
    return <div className={''}><div className="media-wrapper" style={{
        boxShadow: data.border ? '0 0 2px 0 grey' : '',
        margin:'0 auto',
        aspectRatio: 4 / 3,
        width: (data.width || 100) + "%",
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }}>
        <div className={"media-item"} style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            maxHeight: '100%',
            overflow: 'hidden',
            borderRadius: 5,
            aspectRatio: data.media[0].width / data.media[0].height,
        }}>
            {React.createElement(mediaItems[data.media[0].type], {data})}
        </div>
        {/*{!!data.title && <Typography textAlign={'center'} level="title-lg">{data.title}</Typography>}*/}
        {/*<Typography sx={{*/}
        {/*    flexGrow: 1,*/}
        {/*    display: 'flex',*/}
        {/*    textAlign: 'center',*/}
        {/*    alignItems: 'center',*/}
        {/*    justifyContent: 'center'*/}
        {/*}}*/}
        {/*            level={'body-md'}>{data.text}</Typography>*/}
    </div></div>
}