//@ts-nocheck
import React from 'react';
import AspectRatio from "@mui/joy/AspectRatio";
import store from "../store";

const sizes = {
    1: "400",
    2: '1500'
}

export function scaleImage(url, size, custom=null) {
    let sz = sizes[size];
    if (custom != null) sz = custom;
    return `https://res.cloudinary.com/drlljn0sj/image/upload/w_${sz}/v1712248757/` + url + '.jpg'
}

const CardImage = ({one = false, carousel = false, id=1, url}) => {
    return (
        <AspectRatio minHeight="200px" maxHeight="300px">
            <img
                onClick={() => {
                    if (!carousel) return
                    let images = store.getState().app.items.map(it => scaleImage(it.url, 2));
                    if (one) images = [scaleImage(url, 2)];
                    window.app.images.open({
                        images,
                        start: images.indexOf(scaleImage(url, 2)),
                        id
                    })
                }}
                style={{objectFit: 'contain'}}
                src={scaleImage(url, 1)}
                loading="lazy"
                referrerPolicy="no-referrer"
                alt=""
            />
        </AspectRatio>
    );
};

export default CardImage;