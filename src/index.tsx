// @ts-nocheck

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store/index';
import {Provider} from "react-redux";
import {ApiApi, Configuration} from "./api";
import {ClerkProvider} from "@clerk/clerk-react";

export const api = new ApiApi(new Configuration({
    basePath: "http://127.0.0.1:8000"
    // basePath: "https://dialoss75.pythonanywhere.com"
}));

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const PUBLISHABLE_KEY = "pk_test_ZW5qb3llZC1wcmF3bi0zNi5jbGVyay5hY2NvdW50cy5kZXYk"

root.render(
    <Provider store={store}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App/>
        </ClerkProvider>
    </Provider>
);

