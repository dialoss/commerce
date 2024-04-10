//@ts-nocheck
import React, {useRef, useState} from 'react';
import Viewer from './Viewer';
import './App.scss';
import {ReactComponent as Fullscreen} from "./fullscreen.svg";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = null;
        this.state = {
            camera: null,
            selectedIds: [],
            ...props,
        };
    }

    render() {
        const { token, urn } = this.props;
        const ref = React.createRef();
        return (
            <div className={"app " + (this.state.ui ? 'default' : 'hidden')} ref={ref}>
                <IconButton onClick={() => ref.current.querySelector("#toolbar-fullscreenTool").click()} className={'fs'}>
                    <FullscreenIcon></FullscreenIcon>
                </IconButton>
                <Button variant={'outlined'} onClick={() => this.setState({ui: !this.state.ui})}>Управление</Button>
                <div style={{ position: 'relative'}}>
                    <Viewer
                        runtime={{ accessToken: token }}
                        urn={urn}
                        {...this.state}
                        ref={ref => this.wrapper = ref}
                    />
                </div>
            </div>
        );
    }
}

export default App;
