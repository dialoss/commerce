//@ts-nocheck
import {scaleImage} from "./CardImage";
import Viewer from "./Model/Viewer";
import React from "react";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";

const mediaStyle = {
    maxWidth: '100%',
    width: "100%",
    height:'100%',
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

export function MediaItem({data, ratio = false, callback=() => {}}) {
    if (!data.media || !data.media[0]) return <></>
    const item = <div className="media-wrapper" style={{
        margin: '0 auto',
        borderRadius: 5,
        padding: ratio ? 0 : 4,
    }}>
        <div style={{
            maxWidth: !ratio ? ((data.width || 100) + "%") : "auto",
            margin: "0 auto",
            // boxShadow: data.border ? '0 0 2px 0 grey' : '',
            borderRadius: 5,
            height: '100%',
        }}>
            <div className={"media-item"} onClick={callback} style={{
                maxWidth: '100%',
                height:'100%',
                overflow: 'hidden',
                borderRadius: 5,
                maxHeight: '70vh',
                margin: '0 auto',
                aspectRatio: data.media[0].width / data.media[0].height,
            }}>
                {React.createElement(mediaItems[data.media[0].type], {data})}
            </div>
            {data.mediaTitle &&
                <Typography textAlign={'center'} level="title-lg">{data.mediaTitle}</Typography>}
            {data.mediaText && <Typography sx={{
                flexGrow: 1,
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center'
            }}
                                           level={'body-md'}>{data.mediaText}</Typography>}
        </div>
    </div>

    return <div className={'mb-1 w-100'}>
        {ratio ?
            <div className="aspectratio-root">
            <div className="aspectratio-child">
             {/*<AspectRatio minHeight={200} maxHeight={500}>*/}
                {item}
            {/*</AspectRatio>*/}
            </div>
        </div>
            : item}
    </div>
}