//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import {Pagination, Stack} from "@mui/material";
import store from "../store";
import {actions} from "../store/app";

const limit = 30;

const cache = {}

const ItemsList = ({
                       component,
                       getItems,
                        cacheKey="",
                   }: { cacheKey:string; component: React.JSXElementConstructor<any>; getItems: () => Promise<any> }) => {
    const [items, setItems] = useState([]);

    function set(newItems) {
        setItems(newItems);
        store.dispatch(actions.setItems(newItems));
    }

    const [page, setPage] = React.useState(1);
    const [all, setAll] = React.useState(1);

    useLayoutEffect(() => {
        const pagination = {limit, offset: limit * (page - 1)};
        const cachePage = cache[cacheKey];
        if (cachePage) {
            const cacheItems = cachePage[pagination.offset];
            if (cacheItems) {
                set(cacheItems);
                setAll(Math.ceil(cachePage.count / limit))
                return;
            }
        }
        getItems(pagination).then(d => {
            set(d.results);
            setAll(Math.ceil(d.count / limit));
            if (!cache[cacheKey]) cache[cacheKey] = {count: d.count}
            cache[cacheKey][pagination.offset] = d.results;
        })
    }, [page]);

    window.app.update = (data) => {
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

    return (
        <>
            <Stack direction={'row'} flexWrap={'wrap'}>
                {
                    items.map(it => React.createElement(component, {data: it}))
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