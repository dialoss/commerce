//@ts-nocheck
import React, {useLayoutEffect} from 'react';
import Userfront from "@userfront/toolkit/react";
import {api} from "../index";

const UserPage = () => {
    const [orders, setOrders] = React.useState([]);
    useLayoutEffect(() => {
        api.apiOrderList({user: Userfront.user.userId});
    }, [])
    return (
        <div>
            {orders.map(ord => <div>
                {ord.product.price}
                {ord.product.name}
            </div>)}
            <h1>Привет {Userfront.user.email}</h1>
        </div>
    );
};

export default UserPage;