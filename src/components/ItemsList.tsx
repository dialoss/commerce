//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import {Pagination, Stack, Tab} from "@mui/material";
import store from "../store";
import {actions} from "../store/app";
import Tabs from '@mui/material/Tabs';


const limit = 30;

const cache = {}

interface TabsProps {
    filter: (tab: number, item: object) => boolean;
    names: string[];
}

const ItemsList = ({
                       component,
                       key_ = "",
                       tabs = {names: [], filter: () => true},
                       customPagination = {}
                   }: { tabs: TabsProps; customPagination: object; key_: string; component: React.JSXElementConstructor<any>; }) => {
    const [items, setItems] = useState([]);

    function set(newItems) {
        setItems(newItems);
        store.dispatch(actions.setItems(newItems));
    }

    const [page, setPage] = React.useState(1);
    const [all, setAll] = React.useState(1);
    const path = `/api/${key_}/`

    useLayoutEffect(() => {
        store.dispatch(actions.setPage(key_));
    }, [])

    useLayoutEffect(() => {
        const pagination = {limit, offset: limit * (page - 1)};
        const cachePage = cache[key_];
        if (cachePage) {
            const cacheItems = cachePage[pagination.offset];
            if (cacheItems) {
                set(cacheItems);
                setAll(Math.ceil(cachePage.count / limit))
                return;
            }
        }
        window.api.request({
            path,
            method: 'GET',
            query: {...pagination, ...customPagination},
        }).then(r => r.json()).then(d => {
            set(d.results);
            setAll(Math.ceil(d.count / limit));
            if (!cache[key_]) cache[key_] = {count: d.count}
            cache[key_][pagination.offset] = d.results;
        })
    }, [page]);

    window.app.remove = data => {
        window.api.request({
            path: path + data.id,
            method: 'DELETE',
        })
        set(items.filter(it => it.id != data.id));
    }

    window.app.create = (data) => {
        window.api.request({
            path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        set([...items, data])
    }

    window.app.update = (data) => {
        window.api.request({
            path: path + data.id + '/',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data,
        })

        let newItems = [...items];
        let i = 0;
        while (true) {
            let it = newItems[i];
            if (it.id === data.id) {
                newItems[i] = data;
                break
            }
            i++;
        }
        set(newItems)
    }

    const [tab, setTab] = useState(0);
    let filteredItems = items.filter(it => tabs.filter(tab, it));
    console.log(tab)
    return (
        <>
            {tabs.names.length > 0 && <Tabs
                value={tab}
                centered
                sx={{marginBottom: 2}}
                onChange={setTab}
                textColor="secondary"
                indicatorColor="secondary"
            >
                {
                    tabs.names.map((t, i) => <Tab onClick={() => setTab(i)} label={t}/>)
                }
            </Tabs>}
            <Stack direction={'row'} flexWrap={'wrap'}>
                {
                    filteredItems.map(it => React.createElement(component, {data: it}))
                }
            </Stack>
            {all > 1 && <Pagination count={all}
                                    onChange={(e, a) => setPage(a)}
                                    color="primary" sx={{
                'ul':
                    {justifyContent: 'center'},
                padding: '10px 0',
                backgroundColor: '#fff',
                width: 'initial',
                position: 'sticky',
                bottom: 0
            }}/>}
        </>
    );
};

export default ItemsList;