//@ts-nocheck
import React from 'react';
import AspectRatio from "@mui/joy/AspectRatio";
import store from "../store";

const sizes = {
    1: "600",
    2: '1200',
    3: '2000'
}

function scaleImage(url, size) {
    return `https://res.cloudinary.com/drlljn0sj/image/upload/w_${sizes[size]}/v1712248757/` + url + '.jpg'
}

const CardImage = ({carousel=false, id, url}) => {
    return (
        <AspectRatio minHeight="200px" maxHeight="300px">
            <img
                onClick={() => {
                    if (!carousel) return
                    const images = store.getState().app.items.map(it => scaleImage(it.url, 2));
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