//@ts-nocheck
import React from 'react';

import ItemsList from "../components/ItemsList";
import ProductCard from "../components/ProductCard";

const schema = require("../api/schema.json");
const tabs = {
    pagination: [],
    names: [],
    queryField: "productType",
};
for (const f of schema.product.find(f => f.name === 'productType').choices) {
    tabs.pagination.push(f.name.toLowerCase());
    tabs.names.push(f.name.toLowerCase());
}

const Models = () => {
    return (
        <ItemsList tabs={tabs}
                   key={'products'}
                   cacheKey={'product'}
                   endpoint={'product'}
                   component={ProductCard}></ItemsList>
    );
};

export default Models;