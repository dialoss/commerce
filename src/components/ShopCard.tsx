import React from 'react';
import {Product} from "../api";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import store from "../store";
import {actions} from "../store/app";
import {rub} from '../ui/tools';
import {Button} from "@mui/material";
import CardImage from "./CardImage";
import BaseCard from "./BaseCard";
import Pay from "./Pay";

const ShopCard = ({data}: { data: Product }) => {
    return (
        <BaseCard data={data} style={"md:w-100 lg:w-1/2"}>
            <>
            {!!data.type && <div>
                <Typography level="title-lg">{data.type}</Typography>
            </div>}
            <CardImage id={data.id} url={data.mediaUrl}></CardImage>
                <div>
                    <Typography level={'body-md'}>{data.summary}</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        {rub.format(data.price || 0)}
                    </Typography>
                </div>
                <Pay text={"Купить"} product={data}></Pay>
            </>
        </BaseCard>
    );
};

export default ShopCard;