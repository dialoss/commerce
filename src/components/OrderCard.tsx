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
                    <Typography level="title-lg">{data.product.productType + " " + data.product.name}</Typography>
                </div>
                <CardImage carousel={false}
                           data={data.product.media}></CardImage>
                <CardContent orientation="horizontal">
                    <div>
                        {/*<Typography level={'body-md'}>{data.summary}</Typography>*/}
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