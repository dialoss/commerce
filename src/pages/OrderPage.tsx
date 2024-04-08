//@ts-nocheck
import React, {useLayoutEffect} from 'react';

import {Order, Product} from "../api";
import PageEditor from "./PageEditor";
import store from "../store";
import {actions} from "../store/app";
import Typography from "@mui/material/Typography";
import {OrderStatus} from "../components/OrderCard";

const OrderPage = () => {
    const [data, setData] = React.useState<Order | null>(null);
    useLayoutEffect(() => {
        let p = window.location.pathname.split('/').slice(-1)[0].split('-')[0];
        window.api.apiOrderRetrieve({id: +p}).then(d => {
            setData(d);
            store.dispatch(actions.setPageData(d))
        })
    }, [])

    return (
        <div>
            {data && <>
                <Typography variant={'h6'} textAlign={'center'}>Дата начала изготовления: {window.formatDate(data.dateCreated)}</Typography>
                <OrderStatus status={data.status}></OrderStatus>
                <PageEditor endpoint={'order'} id={data.id} data={JSON.parse(data.page || '{}')}></PageEditor>
            </>}
        </div>
    );
};

export default OrderPage;