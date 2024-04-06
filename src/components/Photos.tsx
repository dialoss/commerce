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
    return images.map((im, i) => {
        return {
            src: im,
            index: i,
        }
    });
}

export const SimpleViewer = () => {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [images, setImages] = useState([]);

    // useAddEvent('images:viewer', ({detail}) => {
    //     setImages(detail.images.map(im => ({src: im})));
    //     setOpen(true);
    // })

    function onClose() {
        setOpen(false);
    }

    return (
        <div className={'simple-viewer'}>
            <Lightbox
                noScroll
                index={current}
                setCurrent={setCurrent}
                open={open}
                plugins={[Zoom]}
                close={onClose}
                slides={images}
            />
        </div>
    );
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

    function set() {
        let cont = document.querySelector('.yarl__carousel');
        if (!cont) return;
        let preview = document.querySelector('.preview');
        cont.addEventListener('mousedown', e => {
            preview.style.zIndex = -1;
            const elements = document.elementsFromPoint(e.clientX, e.clientY);
            for (const el of elements) {
                if (el.classList.contains('preview')) {
                    preview.style.zIndex = 1;
                    return;
                }
            }
        })
    }

    return (
        <Lightbox
            className={'images-viewer'}
            index={current}
            on={{entered: set}}
            setCurrent={setCurrent}
            open={open}
            plugins={[Zoom, Counter]}
            counter={{container: {style: {top: 0, bottom: "unset"}}}}
            animation={{fade: 100, swipe: 200}}
            carousel={{
                padding: 0,
                spacing: 0,
                preload: 50,
            }}
            controller={{closeOnPullDown: true, closeOnPullUp: true}}
            close={onClose}
            slides={images}
        />
    );
};

export default Images;