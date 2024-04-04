//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import {Stack} from "@mui/material";

const ItemsList = ({component, getItems}: { component: React.JSXElementConstructor<any>; getItems: () => Promise<any> }) => {
    const [items, setItems] = useState([]);
    useLayoutEffect(() => {
        getItems().then(d => {
            setItems(d)
        })
    }, []);

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
        setItems(newItems)
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