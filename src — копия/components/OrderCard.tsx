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
export function OrderStatus({status}) {
    return <p>Статус заказа: {status.step} {status.substep.length > 1 ? `- ${status.substep}`: ''}</p>
}

const OrderCard = ({data, detailed}: { detailed: boolean; data: Order }) => {
    const user = useAppSelector(state => state.app.users[data.user || 0]);
    if (!data.product) return <div>
        Нет продукта
        <p>{data.status}</p>
    </div>
    console.log(data)
    return (
        <BaseCard data={data}
                  onClick={e => {
                      if (e.button === 2) return;
                      window.navigate(`orders/${data.id}-${user.name.replaceAll(' ', '').toLowerCase()}`);
                  }}>
            <>
                <div>
                    <Typography level="title-lg">{data.title}</Typography>
                </div>
                <MediaItem ratio={true} data={data}></MediaItem>
                <CardContent orientation="horizontal">
                    <div>
                        <Typography fontSize="lg" fontWeight="lg">
                            {rub.format(data.product.price || 0)}
                        </Typography>
                        <OrderStatus status={data.status}></OrderStatus>
                        <p>Дата заказа: {window.formatDate(data.dateCreated)}</p>
                        <Link to={`/models/${data.product.id}-${data.product.name}`}>Продукт</Link>

                        {user && <p>Заказчик {user.name}</p>}
                    </div>
                </CardContent>
            </>
        </BaseCard>
    );
};

export default OrderCard;