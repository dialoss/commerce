//@ts-nocheck
import React, {useRef, useState} from 'react';
import Viewer from './Viewer';
import './App.scss';
import {ReactComponent as Fullscreen} from "./fullscreen.svg";

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
