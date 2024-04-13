//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import {Pagination, Stack, Tab} from "@mui/material";
import store from "../store";
import {actions} from "../store/app";
import Tabs from '@mui/material/Tabs';
import {ItemsEditor} from "../pages/PageEditor";
import {useAppSelector} from "../store/redux";
import Box from "@mui/material/Box";

const limit = 30;

const cache = {}

interface TabsProps {
    filter: (tab: number, item: object) => boolean;
    names: string[];
    pagination: string[];
}

const ItemsList = ({
                       component,
                       endpoint = "",
                       cacheKey = "",
                       tabs = {queryField: '', names: [], pagination: []},
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
    const [tab, setTab] = useState(() => getTab());

    function changeTab(t) {
        setTab(t);
        if (tabs.pagination.length > 0) {
            let url = new URL(window.location.href);
            url.searchParams.set(tabs.queryField, tabs.pagination[t]);
            window.history.pushState({}, "", url.toString());
        }
    }


    function getTab() {
        if (tabs.pagination.length > 0) {
            let url = new URL(window.location.href);
            let t = url.searchParams.get(tabs.queryField);
            t = tabs.pagination.indexOf(t);
            if (t !== -1) return t;
            else return 0
        } else return 0;
    }

    window.getTab = () => tabs.names[getTab()];

    function changeState() {
        setTab(getTab())
    }

    useLayoutEffect(() => {
        store.dispatch(actions.setPage(endpoint));
        changeTab(getTab());
        window.addEventListener("popstate", changeState);
        return () => window.removeEventListener("popstate", changeState)
    }, [])

    const useCache = useAppSelector(state => state.app.editor);

    useLayoutEffect(() => {
        window.scrollTop = 0;
        const pagination = {limit, offset: limit * (page - 1)};
        const cachePage = cache[cacheKey];
        if (useCache && cachePage) {
            const cacheItems = cachePage[pagination.offset + " " + tab];
            if (cacheItems) {
                set(cacheItems);
                setAll(Math.ceil(cachePage.count / limit))
                return;
            }
        }

        window.request(window.api.request({
            path,
            method: 'GET',
            query: {...pagination, ...customPagination, [tabs.queryField]: tabs.pagination[tab]},
        }).then(r => r.json()).then(d => {
            set(d.results);
            setAll(Math.ceil(d.count / limit));
            if (!cache[cacheKey]) cache[cacheKey] = {count: d.count}
            cache[cacheKey][pagination.offset + " " + tab] = d.results;
        }))
    }, [page, tab]);

    const editor = useAppSelector(state => state.app.editor);

    let filteredItems = [...items].sort((a, b) => a.viewId - b.viewId);
    console.log(filteredItems)
    return (
        <div style={{minHeight: '100vh', marginBottom: 20}} className={'items-list ' + (editor ? 'editor' : '')}>
            {tabs.names.length > 0 && <Box display="flex" justifyContent="center" width="100%">
                <Tabs
                    scrollButtons
                    allowScrollButtonsMobile
                    value={tab}
                    centered
                    variant={'scrollable'}
                    onChange={setTab}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    {
                        tabs.names.map((t, i) => <Tab onClick={() => changeTab(i)} label={t}/>)
                    }
                </Tabs> </Box>}
                <Stack direction={'row'} flexWrap={'wrap'}>
                    {
                        filteredItems.map(it => React.createElement(component, {
                            data: {
                                key: it.id, ...it,
                                ...(!!it.media ? {media: JSON.parse(it.media)} : {})
                            }
                        }))
                    }
                </Stack>

            {all > 1 && <Pagination count={all}
                                    page={page}
                                    onChange={(e, a) => {
                                        setPage(a);
                                        let url = new URL(window.location.href);
                                        url.searchParams.set("page", a);
                                        window.history.pushState({}, "", url.toString());
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
