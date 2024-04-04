import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store/index';
import {Provider} from "react-redux";
import {ApiApi, Configuration} from "./api";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>

        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>
);

export const api = new ApiApi(new Configuration({
    basePath: "http://127.0.0.1:8000"
}));
