// @ts-nocheck

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store/index';
import {Provider} from "react-redux";
import {ApiApi, Configuration} from "./api";

export const api = new ApiApi(new Configuration({
    basePath: process.env.REACT_APP_BASE_PATH
}));

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

