import React, {useLayoutEffect, useState} from 'react';
import {Product} from "../api";
import ProductCard from "../components/ProductCard";
import {Stack} from "@mui/material";
import {api} from "../index";
import ItemsList from "../components/ItemsList";


const Products = () => {
    return (
        <Stack direction={'row'} flexWrap={'wrap'}>
            <ItemsList component={ProductCard} getItems={() => api.apiProductList()}></ItemsList>
        </Stack>
    );
};

export default Products;