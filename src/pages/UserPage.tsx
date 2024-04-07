//@ts-nocheck
import React, {useLayoutEffect} from 'react';
import Userfront from "@userfront/toolkit/react";
import {useAppSelector} from "../store/redux";
import ProductCard from "../components/ProductCard";
import dayjs from "dayjs";
import OrderCard from "../components/OrderCard";


const UserPage = () => {
    const [orders, setOrders] = React.useState([]);
    let id = window.location.pathname.split('/').slice(-1)[0];
    if (!window.location.pathname.match(/profile\/\d*/)) id = Userfront.user.userId
    const user = useAppSelector(state => state.app.users[id] || {});
    useLayoutEffect(() => {
        window.api.apiOrderList({user: id}).then(d => setOrders(d.results));
    }, [])

    return (
        <div>
            <h2>Профиль пользователя {user.name}</h2>
            <h4>Заказы</h4>
            {orders.map(ord =>
                <OrderCard detailed={true} data={ord}></OrderCard>

            )}
        </div>
    );
};

export default UserPage;