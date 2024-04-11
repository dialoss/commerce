//@ts-nocheck
import React from 'react';
import store from "../store";

const sizes = {
    1: "800",
    2: '1500'
}

export function scaleImage(data, size, custom = null) {
    let sz = sizes[size];
    if (custom != null) sz = custom;
    return {...data, url: `https://res.cloudinary.com/drlljn0sj/image/upload/w_${sz}/v1712248757/` + data.url + '.jpg'}
}

const CardImage = ({one = false, carousel = false, data}) => {
    const img = data.media[0]
    return (
        <img
            onClick={() => {
                if (!carousel) return
                let images = store.getState().app.items.map(it => scaleImage(JSON.parse(it.media)[0], 2));
                if (one) images = [scaleImage(img, 2)];
                window.app.images.open({
                    images,
                    start: images.indexOf(scaleImage(img, 2)),
                })
            }}
            style={{objectFit: 'contain'}}
            src={scaleImage(img, 1).url}
            loading="lazy"
            referrerPolicy="no-referrer"
            alt=""
        />
    );
};

export default CardImage;