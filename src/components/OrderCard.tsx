//@ts-nocheck
import React from 'react';
import {Order} from "../api";
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import {rub} from "../ui/tools";
import BaseCard from "./BaseCard";
import CardImage from "./CardImage";
import {useAppSelector} from "../store/redux";
import { Link } from "react-router-dom";
import {Avatar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {MediaItem} from "./MediaItems";
import store from "../store";
import {actions} from "../store/app";
export function OrderStatus({status}) {
    return <p className={'font-medium'}>Статус заказа: {status.step} {status.substep.length > 1 ? `- ${status.substep}`: ''}</p>
}

const OrderCard = ({data, detailed}: { detailed: boolean; data: Order }) => {
    const user = useAppSelector(state => state.app.users[data.user || 0]);
    console.log(data)
    let product = data.product;
    if (!data.product) product = {};
    return (
        <BaseCard data={data}
                  onClick={e => {
                      if (e.button === 2) return;
                      let slug = data.slug || `orders/${data.id}-${user.name.replaceAll(' ', '').toLowerCase()}`;
                      store.dispatch(actions.setSelected(data));
                      window.navigate(slug);
                  }}>
            <>
                <MediaItem ratio={true} data={data.media[0]}></MediaItem>
                <CardContent orientation="horizontal">
                    <div>
                        <Typography level="title-lg">{data.title}</Typography>
                        <Typography level="lg">{data.description}</Typography>

                        <Typography fontSize="lg" fontWeight="lg">
                            {rub.format(product.price || 0)}
                        </Typography>
                        <OrderStatus status={data.status}></OrderStatus>
                        <p>Дата заказа: {window.formatDate(data.dateCreated)}</p>
                        <Link to={`/models/${product.id}-${product.name}`}>Продукт</Link>

                        {user && user.userId && <p>Заказчик {user.name}</p>}
                    </div>
                </CardContent>
            </>
        </BaseCard>
    );
};

export default OrderCard;