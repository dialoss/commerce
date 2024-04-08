//@ts-nocheck
import React from 'react';
import {Order} from "../api";
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import {rub} from "../ui/tools";
import BaseCard from "./BaseCard";
import CardImage from "./CardImage";
import {useAppSelector} from "../store/redux";

export function OrderStatus({status}) {
    return <p>Статус заказа: {status.step} {status.substep.length > 1 ? `- ${status.substep}`: ''}</p>
}

const OrderCard = ({data, detailed}: { detailed: boolean; data: Order }) => {
    const user = useAppSelector(state => state.app.users[data.user || 0]);
    return (
        <BaseCard data={data}
                  onClick={e => {
                      if (e.button === 2) return;
                      window.navigate(`orders/${data.id}-${user.name.replaceAll(' ', '').toLowerCase()}`);
                  }}>
            <>
                <div>
                    <Typography level="title-lg">{data.product.type + " " + data.product.model}</Typography>
                </div>
                <CardImage carousel={false} id={data.product.id}
                           url={data.mediaUrl || data.product.mediaUrl}></CardImage>
                <CardContent orientation="horizontal">
                    <div>
                        <Typography level={'body-md'}>{data.summary}</Typography>
                        <Typography fontSize="lg" fontWeight="lg">
                            {rub.format(data.product.price || 0)}
                        </Typography>
                        <OrderStatus status={data.status}></OrderStatus>
                        <p>Дата заказа: {window.formatDate(data.dateCreated)}</p>
                        <a href={`models/${data.product.id}-${data.product.model}`}>Продукт</a>
                    </div>
                </CardContent>
            </>
        </BaseCard>
    );
};

export default OrderCard;