//@ts-nocheck
import React from 'react';

import ItemsList from "../components/ItemsList";
import OrderCard from "../components/OrderCard";

const Orders = () => {
    function filter(tab, item) {
        if (tab === 0) return item.status.id === 11;
        return item.status.id !== 11;
    }

    return (
        <ItemsList customPagination={{productType: "Монтировка"}}
                   tabs={{
                       queryField: "status",
                       pagination: ["11", "!11"], names: ['Выполненные', "В работе / новые"], filter
                   }}
                   key={'orders'}
                   endpoint={'order'} cacheKey={'order'}
                   component={OrderCard}></ItemsList>
    );
};

export default Orders;