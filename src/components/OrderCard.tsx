//@ts-nocheck
import React from 'react';
import {Order, Product} from "../api";
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import store from "../store";
import {actions} from "../store/app";
import {rub} from "../ui/tools";
import BaseCard from "./BaseCard";
import CardImage from "./CardImage";
import {useAppSelector} from "../store/redux";
import dayjs from "dayjs";

const OrderCard = ({data, detailed}: {detailed: boolean; data: Order }) => {
    const user = useAppSelector(state => state.app.users[data.user || 0]);
    return (
        <BaseCard data={data}
            onClick={() => {
                window.navigate(`orders/${data.id}-${user.name.replaceAll(' ', '').toLowerCase()}`);
            }}>
            <>
                <div>
                    <Typography level="title-lg">{data.product.name + " " + data.product.model}</Typography>
                </div>
                <CardImage carousel={false} id={data.product.id} url={data.cover || data.product.cover}></CardImage>
                <CardContent orientation="horizontal">
                    <div>
                        <Typography level={'body-md'}>{data.summary}</Typography>
                        <Typography fontSize="lg" fontWeight="lg">
                            {rub.format(data.product.price || 0)}
                        </Typography>
                        <p>Статус: {data.status.step}</p>
                        <p>Дата заказа: {}</p>
                        <a href={`models/${data.product.id}-${data.product.model}`}>Продукт</a>
                    </div>
                </CardContent>
            </>
        </BaseCard>
    );
};

export default OrderCard;