//@ts-nocheck
import React, {useLayoutEffect} from 'react';

import {Order} from "../api";
import PageEditor from "./PageEditor";
import store from "../store";
import {actions} from "../store/app";

export const ContentPage = ({endpoint, extra}) => {
    const [data, setData] = React.useState<Order | null>(null);
    useLayoutEffect(() => {
        let p = window.location.pathname.split('/').slice(-1)[0].split('-')[0];
        window.request(window.api.request({
            path: `/api/${endpoint}/${p}/`,
            method: 'GET',
        }).then(r => r.json()).then(d => {
            setData(d);
            store.dispatch(actions.setPageData(d))
        }))
    }, []);
    return (
        <div style={{minHeight: '100vh'}}>
            {data && data.id && <>
                {extra && React.createElement(extra, {data})}
                <PageEditor endpoint={endpoint} id={data.id} data={JSON.parse(data.page || '{}')}></PageEditor>
            </>}
        </div>
    );
}