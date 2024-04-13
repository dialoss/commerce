//@ts-nocheck
import React, {useRef, useState} from 'react';
import "./Avatar.scss";
import Jdenticon from "react-jdenticon";

const Avatar = ({user={}, extraInfo=false, symbol='', children, ...props}) => {
    let src = props.src;
    return (
        <div className={`avatar__wrapper `} style={props.style || {}}>
            <div className={"avatar"}>
                {!!src ?
                    <img src={src} alt=""/> :
                    <div className={'placeholder'}>
                        <Jdenticon size="100%" value={user.email || 'guest'} />
                    </div>
                }
            </div>
            {extraInfo && <div className={'info'}>
                {children}
            </div>}
        </div>
    );
};

export default Avatar;