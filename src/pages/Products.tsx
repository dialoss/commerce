import React, {useLayoutEffect, useState} from 'react';
import {Product} from "../api";
import ProductCard from "../components/ProductCard";
import {Stack} from "@mui/material";
import {api} from "../index";

window.addEventListener("ondragstart", e => console.log(e))

const Products = () => {
    const [items, setItems] = useState<Product[]>([]);
    useLayoutEffect(() => {
        api.apiProductList().then(d => {
            setItems(d)
        })
    }, []);

    window.app.update = (data: Product) => {
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
                items.map(it => <ProductCard data={it}></ProductCard>)
            }
        </Stack>
    );
};

export default Products;