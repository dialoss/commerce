//@ts-nocheck
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Pagination, Stack, Tab} from "@mui/material";
import store from "../store";
import {actions} from "../store/app";
import Tabs from '@mui/material/Tabs';
import PageEditor, {ItemsEditor} from "../pages/PageEditor";
import {useAppSelector} from "../store/redux";
import AspectRatio from '@mui/joy/AspectRatio';


const limit = 30;

const cache = {}
const useCache = false;

interface TabsProps {
    filter: (tab: number, item: object) => boolean;
    names: string[];
}

const ItemsList = ({
                       component,
                       endpoint = "",
                       cacheKey = "",
                       tabs = {names: [], filter: () => true},
                       customPagination = {}
                   }: { tabs?: TabsProps; customPagination?: object; cacheKey: string; endpoint: string; component: React.JSXElementConstructor<any>; }) => {
    const [items, setItems] = useState([]);

    function set(newItems) {
        setItems(newItems);
        store.dispatch(actions.setItems(newItems));
    }

    const [page, setPage] = React.useState(() => +(new URL(window.location.href).searchParams.get('page')) || 1);
    const [all, setAll] = React.useState(1);
    const path = `/api/${endpoint}/`

    useLayoutEffect(() => {
        store.dispatch(actions.setPage(endpoint));
    }, [])

    useLayoutEffect(() => {
        const pagination = {limit, offset: limit * (page - 1)};
        const cachePage = cache[cacheKey];
        if (useCache && cachePage) {
            const cacheItems = cachePage[pagination.offset];
            if (cacheItems) {
                set(cacheItems);
                setAll(Math.ceil(cachePage.count / limit))
                return;
            }
        }

        window.request(window.api.request({
            path,
            method: 'GET',
            query: {...pagination, ...customPagination},
        }).then(r => r.json()).then(d => {
            set(d.results);
            setAll(Math.ceil(d.count / limit));
            if (!cache[cacheKey]) cache[cacheKey] = {count: d.count}
            cache[cacheKey][pagination.offset] = d.results;
        }))
    }, [page]);

    window.app.remove = data => {
        window.request(window.api.request({
            path: path + data.id,
            method: 'DELETE',
        }))
        set(items.filter(it => it.id != data.id));
    }

    window.app.create = (data) => {
        window.request(window.api.request({
            path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }))
        set([...items, data])
    }

    window.app.update = (data) => {
        window.request(window.api.request({
            path: path + data.id + '/',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data,
        }))

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
    let filteredItems = items.filter(it => tabs.filter(tab, it)).sort((a, b) => a.viewId - b.viewId);
    const editor = useAppSelector(state => state.app.editor);
    return (
        <div style={{minHeight: '100vh', marginBottom: 20}} className={'items-list ' + (editor ? 'editor' : '')} >
            {tabs.names.length > 0 && <Tabs
                value={tab}
                centered
                sx={{marginBottom: 2, justifyContent:'center'}}
                onChange={setTab}
                textColor="secondary"
                indicatorColor="secondary"
            >
                {
                    tabs.names.map((t, i) => <Tab onClick={() => setTab(i)} label={t}/>)
                }
            </Tabs>}
            {editor ? <ItemsEditor endpoint={endpoint} items={filteredItems}></ItemsEditor> :
            <Stack direction={'row'} flexWrap={'wrap'}>
                {
                    filteredItems.map(it => React.createElement(component, {data: {...it, media: JSON.parse(it.media)}}))
                }
            </Stack>}

            {all > 1 && <Pagination count={all}
                                    page={page}
                                    onChange={(e, a) => {
                                        setPage(a);
                                        let url = new URL(window.location.href);
                                        url.searchParams.set("page", a);
                                        window.history.pushState({},"", url.toString());
                                    }}
                                    color="primary" sx={{
                'ul':
                    {justifyContent: 'center'},
                padding: '10px 0',
                backgroundColor: '#fff',
                width: 'initial',
                position: 'sticky',
                bottom: 0,
                zIndex: 3,
            }}/>}
        </div>
    );
};

export default ItemsList;
