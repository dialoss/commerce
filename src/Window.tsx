//@ts-nocheck
import React, {useEffect} from 'react';
import 'winbox/dist/css/winbox.min.css';
import 'winbox/dist/css/themes/modern.min.css';
import 'winbox/dist/css/themes/white.min.css';
import WinBox from 'react-winbox';

const windows = {};
const windowW = window.screen.width;
let index = 10;

window.openWindow = (id) => {
    windowW < 600 ? windows[id].maximize() : windows[id].restore();
    index = Math.max(index, windows[id].index)
    document.querySelector(".custom-" + id).style.zIndex = index++;
}
window.closeWindow = (id) => windows[id].minimize();

const Windows = ({title, key_, width = 800, children}: {
    title: string;
    key_: string;
    width?: number;
    children: React.ReactElement
}) => {
    const ref = React.useRef(null);

    useEffect(() => {
        const w = ref.current.winBoxObj;
        document.querySelector(".windows").appendChild(w.dom);
        windows[key_] = w;
    }, [])

    return (
        <WinBox
            className={'custom-' + key_}
            ref={ref}
            min
            noAnimation
            background={"#1976D2"}
            noClose
            {...{width: Math.min(width, windowW)}}
            {...(windowW > 1000 ? {height: 800} : {})}
            y='bottom'
            onMinimize={() => window.dispatchEvent(new CustomEvent(key_ + ":close"))}
            title={title}
        >
            {children}
        </WinBox>
    );
};

export default Windows;