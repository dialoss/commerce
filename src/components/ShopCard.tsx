//@ts-nocheck
import React from 'react';
import {Product, Shop} from "../api";
import Typography from '@mui/joy/Typography';
import {rub} from '../ui/tools';
import BaseCard from "./BaseCard";
import Pay from "./Pay";
import {MediaItem} from "./MediaItems";
import {Link} from "@mui/material";

const ShopCard = ({data}: { data: Shop }) => {
    let product = {...data.product};
    if (typeof product.media === "string")
        product.media = JSON.parse(product.media);
    return (
        <BaseCard data={data} style={"md:w-100 lg:w-1/2"}>
            <>
                {product.media && product.media[0] && <MediaItem ratio={true} data={product.media[0]}></MediaItem>}
                {!!data.title && <div>
                    <Typography level="title-lg">{data.product.productType} {data.title}</Typography>
                </div>}
                <div style={{fontSize: 16, flexGrow: 1, marginTop: 5}}>
                    <div dangerouslySetInnerHTML={{__html: data.description}}></div>
                </div>
                <Typography fontSize="lg" fontWeight="lg">
                    {rub.format(product.price || 0)}
                </Typography>
                <Link style={{display:'block', marginBottom:5}} onClick={() => window.navigate(`models/${product.id}-${product.name}`)}>Подробнее</Link>
                <Pay product={product}></Pay>
            </>
        </BaseCard>
    );
};

export default ShopCard;