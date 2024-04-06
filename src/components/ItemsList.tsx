//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import {Pagination, Stack} from "@mui/material";
import store from "../store";
import {actions} from "../store/app";

const limit = 30;

const ItemsList = ({
                       component,
                       getItems
                   }: { component: React.JSXElementConstructor<any>; getItems: () => Promise<any> }) => {
    const [items, setItems] = useState([]);

    function set(newItems) {
        setItems(newItems);
        store.dispatch(actions.setItems(newItems));
    }

    const [page, setPage] = React.useState(1);
    const [all, setAll] = React.useState(1);

    useLayoutEffect(() => {
        getItems({limit, offset: limit * (page - 1)}).then(d => {
            console.log(d)
            set(d.results);
            setAll(Math.ceil(d.count / limit));
        })
    }, [page]);

    window.app.update = (data) => {
        console.log(data)
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
                        color="primary" sx={{'ul': {justifyContent: 'center'}, padding: '10px 0', position:'sticky',bottom:0}}/>}
        </>
    );
};

export default ItemsList;