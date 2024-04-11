//@ts-nocheck
import React from 'react';

const sizes = {
    1: "800",
    2: '1500'
}

export function scaleImage(data, size, custom = null) {
    let sz = sizes[size];
    if (custom != null) sz = custom;
    return {...data, url: `https://res.cloudinary.com/drlljn0sj/image/upload/w_${sz}/v1712248757/` + data.url + '.jpg'}
}
