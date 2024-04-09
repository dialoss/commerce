// @ts-nocheck

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import store from './store/index';
import {Provider} from "react-redux";
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
