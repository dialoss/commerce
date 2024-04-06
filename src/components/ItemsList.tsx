//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import {Stack} from "@mui/material";
import store from "../store";
import {actions} from "../store/app";

const ItemsList = ({component, getItems}: { component: React.JSXElementConstructor<any>; getItems: () => Promise<any> }) => {
    const [items, setItems] = useState([]);

    function set(newItems) {
        setItems(newItems);
        store.dispatch(actions.setItems(newItems));
    }

    useLayoutEffect(() => {
        getItems().then(d => {
            set(d)
        })
    }, []);

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
        <Stack direction={'row'} flexWrap={'wrap'}>
            {
                items.map(it => React.createElement(component, {data: it}))
            }
        </Stack>
    );
};

export default ItemsList;