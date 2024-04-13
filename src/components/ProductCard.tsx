//@ts-nocheck
import React from 'react';
import {Product} from "../api";
import Typography from '@mui/joy/Typography';
import BaseCard from "./BaseCard";
import {MediaItem} from "./MediaItems";
import {actions} from "../store/app"
import store from "../store";

const ProductCard = ({data}: {data: Product }) => {
    console.log(data)
    return (
        <BaseCard data={data}
            onClick={e => {
                if (e.button === 2) return;
                let slug = data.slug || `models/${data.id}-${data.name}`;
                store.dispatch(actions.setSelected(data));
                window.navigate(slug);
            }}>
            <>
                <MediaItem ratio={true} data={data.media[0]}></MediaItem>
                <Typography level="title-lg">{data.name}</Typography>
                <Typography level={'body-md'}>{data.summary}</Typography>
            </>
        </BaseCard>
    );
};

export default ProductCard;