//@ts-nocheck
import React, {useLayoutEffect} from 'react';

import {Order} from "../api";
import store from "../store";
import {actions} from "../store/app";
import Editor from "@react-page/editor";
import {Typography} from "@mui/material";
import {myCellPlugins, PageEditor} from "./PageEditor";

export const ContentPage = ({endpoint, extra}) => {
    const [data, setData] = React.useState<Order | null>(null);
    useLayoutEffect(() => {
        let p = window.location.pathname.split('/').slice(-1)[0].split('-')[0];
        let slug = store.getState().app?.selected.slug || window.location.pathname.slice(1);
        let query = {slug};
        window.request(window.api.request({
            path: `/api/${endpoint}/${p}/`,
            method: 'GET',
            query
        }).then(r => r.json()).then(d => {
            setData(d);
            store.dispatch(actions.setPageData(d))
        }))
    }, []);
    return (
        <div style={{minHeight: '100vh'}} className={'content-page'}>
            {data && data.id && <>
                {extra && React.createElement(extra, {data})}
                <PageEditor endpoint={endpoint} id={data.id} data={JSON.parse(data.page || '{}')}></PageEditor>
            </>}
        </div>
    );
}