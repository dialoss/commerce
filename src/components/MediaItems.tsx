//@ts-nocheck
import {scaleImage} from "./CardImage";
import Viewer from "./Model/Viewer";
import React from "react";
import Typography from "@mui/joy/Typography";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Button from "@mui/material/Button"
import prettyBytes from 'pretty-bytes';


const mediaStyle = {
    maxWidth: '100%',
    width: "100%",
    height: '100%',
    maxHeight: '60vh'
}

export const mediaItems = {
    image: ({data}) =>
        <img style={mediaStyle}
             src={scaleImage(data, 1).url}
             alt=""/>,
    video: ({data}) => <video controls={true}
                              src={"https://res.cloudinary.com/drlljn0sj/video/upload/v1712582052/" + data.url}
                              style={mediaStyle}/>,
    model: ({data}) => <div className={'h-[400px] w-100'}>
        <Viewer data={{
            show_ui: false,
            urn: data.url,
            id: data.id,
            rotation: data.rotation
        }}></Viewer>
    </div>,
    file: ({data}) => <Button variant={'contained'} onClick={() => {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.target = "_blank"
        a.href = "https://res.cloudinary.com/drlljn0sj/raw/upload/fl_attachment/v1712835330/" + data.url;
        a.download = data.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }} startIcon={<InsertDriveFileIcon/>}>{data.filename} {prettyBytes(data.size || 0)}</Button>
}

export function MediaItem({
                              data, ratio = false, callback = () => {
    }
                          }) {
    if (!data) return <></>
    console.log(data)
    if (!ratio) return <div>
        <div style={{
            maxWidth: !ratio ? ((data.customWidth || 100) + "%") : "auto",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            height: '100%',
            // maxHeight: '60vh',
            overflow: 'hidden',
            borderRadius: 5,
            margin: '0 auto',
            // margin: '0 4px',
            boxShadow: data.border ? '0 0 2px 0 grey' : '',
        }}>
            <div className={"media-item"} onClick={callback} style={{
                maxWidth: '100%',
                // height: '100%',
                // width: `max(100%, ,
                aspectRatio: data.width / data.height,
            }}>
                {React.createElement(mediaItems[data.type], {data})}
            </div>
            {data.mediaTitle &&
                <div><Typography sx={{
                    marginBottom: !data.mediaText ? 1 : 0,
                }} textAlign={'center'} level="title-lg">{data.mediaTitle}</Typography></div>}
            {data.mediaText && <div><Typography sx={{
                flexGrow: 1,
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 1,
            }} level={'body-md'}>{data.mediaText}</Typography></div>}</div>
    </div>

    const item =
        <div style={{
            maxWidth: !ratio ? ((data.customWidth || 100) + "%") : "auto",
            margin: "0 auto",
            borderRadius: 5,
            height: '100%',
        }}>
            <div className={"media-item"} onClick={callback} style={{
                maxWidth: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: 5,
                maxHeight: '60vh',
                margin: '0 auto',
                aspectRatio: data.width / data.height,
            }}>
                {React.createElement(mediaItems[data.type], {data})}
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


    return <div className={'mb-1 w-100'}>
        {ratio ?
            <div className="aspectratio-root">
                <div className="aspectratio-child">
                    <div className="media-wrapper" style={{
                        margin: '0 auto',
                        borderRadius: 5,
                        padding: ratio ? 0 : 4,
                    }}>
                        {item}
                    </div>
                </div>
            </div>
            : item}
    </div>
}