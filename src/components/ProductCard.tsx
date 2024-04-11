//@ts-nocheck
import React from 'react';
import {Product} from "../api";
import Typography from '@mui/joy/Typography';
import BaseCard from "./BaseCard";
import {MediaItem} from "./MediaItems";

const ProductCard = ({data}: {data: Product }) => {
    console.log(data)
    return (
        <BaseCard data={data}
            onClick={e => {
                if (e.button === 2) return;
                window.navigate(`models/${data.id}-${data.name}`);
            }}>
            <>
                <MediaItem ratio={true} data={data.media[0]}></MediaItem>
                <Typography level="title-lg">{data.productType + " " + data.name}</Typography>
                <Typography level={'body-md'}>{data.summary}</Typography>
            </>
        </BaseCard>
    );
};

export default ProductCard;