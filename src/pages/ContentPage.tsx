//@ts-nocheck
import React, {useLayoutEffect} from 'react';

import {Order} from "../api";
import store from "../store";
import {actions} from "../store/app";
import Editor from "@react-page/editor";
import {Typography} from "@mui/material";
import {myCellPlugins} from "./PageEditor";

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
    const value = data && JSON.parse(data.page || '{}');
    return (
        <div style={{minHeight: '100vh'}}>
            {data && data.id && <>
                {extra && React.createElement(extra, {data})}
                <Editor
                    readOnly={true}
                    cellPlugins={myCellPlugins}
                    value={value}/>
                {(!value.rows || !value.rows.length) && <Typography textAlign={'center'}>Нет записей</Typography>}
            </>}
        </div>
    );
}