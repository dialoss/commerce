//@ts-nocheck
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
            {!!data.productType && <div>
                <Typography level="title-lg">{data.productType} {data.name}</Typography>
            </div>}
            <CardImage data={data}></CardImage>
                <div style={{fontSize:16, flexGrow: 1, marginTop: 5}}>
                    <div  dangerouslySetInnerHTML={{__html: data.shop}}></div>
                </div>
                <Typography fontSize="lg" fontWeight="lg">
                    {rub.format(data.price || 0)}
                </Typography>
                <Pay text={"Купить"} product={data}></Pay>
            </>
        </BaseCard>
    );
};

export default ShopCard;