//@ts-nocheck
import React, {useRef} from 'react';
import "./ItemFile.scss";

const ItemFile = ({data}) => {
    const ref = useRef();
    const hasFilename = data.filename;
    return (
        <div className="item__file">
            <a className="file__download-link" href={data.url} ref={ref}
               download
               target="_blank">
                <div className="file__download">
                <span className={`file__download-image fiv-cla fiv-icon-${
                    !!hasFilename ? data.filename.split('.').slice(-1)[0].toLowerCase() : 'blank'}
                    `}></span>
                    {!!hasFilename && <span className="file__title">{data.filename}</span>}
                </div>
            </a>
        </div>
    );
};

export default ItemFile;