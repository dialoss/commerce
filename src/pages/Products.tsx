//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import {Product} from "../api";
import ProductCard from "../components/ProductCard";
import {Stack} from "@mui/material";
import {api} from "../index";
import ItemsList from "../components/ItemsList";

const Products = () => {
    return (
        <ItemsList component={ProductCard} getItems={(page) => api.apiProductList(page)}></ItemsList>
    );
};

export default Products;