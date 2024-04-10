//@ts-nocheck
import React from 'react';
import {Product} from "../api";
import Typography from '@mui/joy/Typography';
import {rub} from '../ui/tools';
import BaseCard from "./BaseCard";
import Pay from "./Pay";
import {MediaItem} from "./MediaItems";

const ShopCard = ({data}: { data: Product }) => {
    return (
        <BaseCard data={data} style={"md:w-100 lg:w-1/2"}>
            <>
                <MediaItem ratio={true} data={data}></MediaItem>
                {!!data.productType && <div>
                    <Typography level="title-lg">{data.productType} {data.name}</Typography>
                </div>}
                <div style={{fontSize: 16, flexGrow: 1, marginTop: 5}}>
                    <div dangerouslySetInnerHTML={{__html: data.shop}}></div>
                </div>
                <Typography fontSize="lg" fontWeight="lg">
                    {rub.format(data.price || 0)}
                </Typography>
                <Pay product={data}></Pay>
            </>
        </BaseCard>
    );
};

export default ShopCard;