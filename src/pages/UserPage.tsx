//@ts-nocheck
import React, {useLayoutEffect} from 'react';
import Userfront from "@userfront/toolkit/react";
import {useAppSelector} from "../store/redux";
import OrderCard from "../components/OrderCard";
import {Avatar, Stack} from "@mui/material";
import IconButton from "@mui/material/IconButton";


const UserPage = () => {
    const [orders, setOrders] = React.useState([]);
    let id = window.location.pathname.split('/').slice(-1)[0];
    if (!window.location.pathname.match(/profile\/\d*/)) id = Userfront.user.userId
    const user = useAppSelector(state => state.app.users[id] || {});
    console.log(id, user)
    useLayoutEffect(() => {
        window.api.apiOrderList({user: id}).then(d => setOrders(d.results));
    }, [])
    return (
        <div>
            <h2>Заказы пользователя {user.name} <IconButton sx={{p: "5px"}}>
                <Avatar src={user.image}></Avatar>
            </IconButton></h2>
            <div className="items-list">
                <Stack direction={'row'} flexWrap={'wrap'}>
                    {orders.map(ord =>
                        <OrderCard detailed={true} data={{...ord, media: JSON.parse(ord.media)}}></OrderCard>
                    )}
                </Stack>
            </div>
        </div>
    );
};

export default UserPage;