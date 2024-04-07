//@ts-nocheck
import React from 'react';
import "./AuthButton.scss";
import {ReactComponent as Icon} from "./icon.svg";
import Button from "@mui/material/Button";

const GoogleButton = ({callback, children}) => {
    return (
        <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            onClick={callback}
            startIcon={<Icon className={'w-7'}/>}
        >
            {children}
        </Button>
    );
};

export default GoogleButton;