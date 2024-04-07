//@ts-nocheck
import React from 'react';

import ItemsList from "../components/ItemsList";
import OrderCard from "../components/OrderCard";

const Orders = () => {
    function filter(tab, item) {
        if (tab === 0) return item.status.id === 2;
        return item.status.id === 1;
    }

    return (
        <>
            <ItemsList tabs={{names: ['Выполненные', "В работе / новые"], filter}} key={'orders'} key_={'order'}
                       component={OrderCard}></ItemsList>
        </>

    );
};

export default Orders;