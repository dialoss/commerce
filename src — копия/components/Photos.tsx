//@ts-nocheck
import React, {useState} from 'react';
import {useTransitionStateManager} from '@mui/base/useTransition';

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Lightbox, {createModule, useLightboxState} from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {Button, Fade} from "@mui/material";
import './Photos.scss'

let itemID = null;


function prepareImages(images) {
    console.log(images)
    return images.map((im, i) => {
        return {
            src: im.url,
            title: im.mediaTitle,
            text: im.mediaText,
            index: i,
        }
    });
}

function InfoModule({children, ...props}) {
    const state = useLightboxState();
    console.log(state)
    return <>
        {children}

        <div className="image-info"></div>
    </>;
}

const module = createModule("MyModule", InfoModule);

function InfoPlugin({addModule}) {
    addModule(module);
}

const Images = () => {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [images, setImages] = useState([]);

    window.app.images = {
        open: ({images, start, id}) => {
            itemID = id;
            setImages(prepareImages(images));
            setOpen(true);
            setCurrent(start);
        }
    }

    function onClose() {
        setOpen(false);
    }

    return (
        <Lightbox
            className={'images-viewer'}
            index={current}
            setCurrent={setCurrent}
            open={open}
            plugins={[Zoom, Counter, InfoPlugin]}
            counter={{container: {style: {top: 0, bottom: "unset"}}}}
            animation={{fade: 100, swipe: 200}}
            carousel={{
                padding: 0,
                spacing: 0,
                preload: 50,
                finite: images.length < 2
            }}
            controller={{closeOnPullDown: true, closeOnPullUp: true}}
            close={onClose}
            slides={images}
        />
    );
};

export default Images;